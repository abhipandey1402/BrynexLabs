import type { BlogPost } from '../blog';

const post: BlogPost = {
    slug: 'how-we-built-multi-tenant-hms-indian-clinics',
    title: 'How We Built a Multi-Tenant HMS for Indian Clinics',
    excerpt: 'We run Clinizy Care on one shared MongoDB database with shared collections: every tenant-owned document carries a tenantId, and a Mongoose plugin injects that filter into every read, write, count and aggregation, failing closed when no tenant is in context. At ₹1,999 a month for a solo clinic, a database per tenant would cost and operate out of proportion; a strict, tested guard with tenant-first indexes fits the economics.',
    author: 'Abhi Pandey',
    date: 'Sep 30, 2026',
    readTime: '11 min read',
    category: 'Engineering',
    seoDescription: 'How we built a multi-tenant HMS for Indian clinics: shared MongoDB collections, a fail-closed Mongoose tenant guard, tenant-first indexes, and what broke.',
    relatedServices: ['ai-native-software-engineering'],
    techTags: ['Multi-tenancy', 'MongoDB', 'Mongoose', 'Node.js', 'AsyncLocalStorage', 'AWS'],
    publishedAt: '2026-09-30T09:30:00.000Z',
    updatedAt: '2026-09-30T09:30:00.000Z',
    status: 'published',
    content: `<p>We built Clinizy Care &mdash; hospital management software for clinics, nursing homes and small hospitals in India &mdash; on one shared MongoDB database with shared collections. Every tenant-owned document carries a <code>tenantId</code>, every request runs inside its clinic's tenant context, and a Mongoose plugin injects the tenant filter into every query, update, delete, count and aggregation, failing closed when no tenant is present. Build-breaking tests keep the guard and its indexes honest. Here's why we chose shared collections over a database per clinic, how the guard works, and what broke along the way.</p>

<h2>Key takeaways</h2>
<ul>
<li><strong>Match the tenancy model to the price point.</strong> At &#8377;1,999 a month for a solo clinic, a database or schema per tenant would cost and operate out of proportion.</li>
<li><strong>Make scoping the default, not a habit.</strong> A base plugin applied through a schema factory scopes 70 of our 98 data models automatically; cross-tenant work has to opt out with an explicit flag.</li>
<li><strong>Fail closed.</strong> With no tenant in context, the injected filter only matches documents that have no <code>tenantId</code>, so tenant-owned data can't come back by accident.</li>
<li><strong>Cover every operation, not just reads.</strong> Our first guard only scoped find queries, until an internal audit flagged that updates and deletes weren't covered.</li>
<li><strong>Prove isolation against a real database.</strong> Mocked models can't show that tenant A can't see tenant B. A 23-case integration suite on an in-memory MongoDB replica set can.</li>
<li><strong>The blast radius is shared too.</strong> One crashed process or one wrong time zone hits every clinic at once.</li>
</ul>

<h2>What does multi-tenancy mean for a clinic HMS?</h2>
<p>In a multi-tenant HMS, every clinic is a tenant. It runs on the same application and infrastructure as every other clinic, but it must only ever see its own patients, visits, bills and prescriptions. That boundary has a lot of surface area to hold across. <a href="https://clinizy.in/features">The 11 modules of Clinizy Care</a> &mdash; OPD queue management, GST billing, pharmacy and inventory, IPD and bed management, digital prescriptions, lab and diagnostics, appointment scheduling, patient records, reports and analytics, AI clinical documentation (in early access) and WhatsApp for clinics &mdash; all read and write <a href="https://clinizy.in/patient-records-software">a single shared patient record</a>. Reception, the doctor, the pharmacy, the lab and the IPD ward all work on the same data, inside the same tenant line.</p>
<p>The customers shape the architecture as much as the data does. Clinizy Care is built for practices up to roughly 50 beds, with plans starting at &#8377;1,999 a month (excluding GST). It runs in the browser with nothing to install, the owner's dashboard works on a phone, and the interface is available in English, Hindi and Hinglish. Many small tenants, a low price and zero installation decided the tenancy model. The wider product story is in <a href="/products/clinizy-care">how we built Clinizy Care</a>; this post stays on the data layer.</p>

<h2>Why did we choose shared collections over a database per tenant?</h2>
<p>Because at our price point, isolation has to come from code and tests rather than from infrastructure. The <a href="https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/silo-pool-and-bridge-models.html">AWS Well-Architected SaaS Lens</a> describes three broad patterns: a <strong>silo</strong> model, where tenants get dedicated resources such as a separate database; a <strong>pool</strong> model, where tenants share infrastructure to achieve economies of scale; and a <strong>bridge</strong> model that mixes the two.</p>
<p>For a solo clinic paying &#8377;1,999 a month, a database or schema per tenant would cost and operate out of proportion: every signup becomes a provisioning job, and every migration and index build runs once per tenant. So we chose the pool model: one database, shared collections, a <code>tenantId</code> on every tenant-owned document, and indexes that lead with <code>tenantId</code>.</p>
<table>
<thead>
<tr><th>Model</th><th>How tenants are separated</th><th>Where isolation lives</th><th>Cost and operations per tenant</th><th>Fit for a &#8377;1,999/month clinic</th></tr>
</thead>
<tbody>
<tr><td>Database per tenant (silo)</td><td>A separate database for each clinic</td><td>Infrastructure</td><td>Highest: provisioning, migrations and monitoring per database</td><td>Out of proportion</td></tr>
<tr><td>Schema or collections per tenant (bridge)</td><td>Shared server, separate schemas or collections per clinic</td><td>Naming and access rules</td><td>High: migrations and indexes repeated per tenant</td><td>Still heavy for a solo practice</td></tr>
<tr><td>Shared collections (pool)</td><td>One set of collections, a tenantId on every document</td><td>The application's tenant guard</td><td>Lowest: a new tenant is new data, not new infrastructure</td><td>Fits, if the guard is strict and tested</td></tr>
</tbody>
</table>
<p>The trade-off is explicit. In a pooled design, a single query that forgets its tenant filter can return another clinic's data. The architecture is only as safe as that guard, so we treat it as load-bearing infrastructure with its own tests, not as a convention developers must remember.</p>

[CTA]

<h2>How does each request know which clinic it belongs to?</h2>
<p>Through a tenant context that the auth middleware sets once and every layer below reads implicitly. The middleware verifies the signed JWT (RS256), then validates its payload &mdash; including the tenant id &mdash; with a Zod schema from a shared package that both the API and the web app import. That package also holds the role-permission matrix. Only after both checks pass does the middleware call <code>runWithTenant(tid, next)</code>, which runs the rest of the request inside Node's <code>AsyncLocalStorage</code>.</p>
<p>According to the <a href="https://nodejs.org/api/async_context.html">Node.js documentation</a>, AsyncLocalStorage allows "storing data throughout the lifetime of a web request", and the store is accessible to asynchronous operations created inside the callback but not outside it. A service six calls deep, or a Mongoose hook, can ask which tenant it's serving without a <code>tenantId</code> argument threaded through every signature &mdash; and a parameter nobody has to pass is one nobody can forget.</p>
<h3>Public routes resolve the tenant differently</h3>
<p>Not every request has a signed-in user. Public appointment booking resolves the tenant from the clinic's slug, and the OPD TV display in the waiting room resolves it from a display token. The data layer's rule doesn't change with the entry point: no resolved tenant, no tenant data.</p>
<h3>Multi-branch clinics are multiple tenants</h3>
<p>A clinic with three branches is three linked tenants. Staff get linked-clinic sign-in and a clinic switcher, but underneath, each branch is its own tenant and each request carries one tenant at a time. The guard never has to reason about hierarchies.</p>

<h2>How does the Mongoose tenant guard work?</h2>
<p>Every tenant-owned model is built with a schema factory, <code>createTenantScopedSchema</code>, which applies a base plugin. 70 of our 98 data models go through it. The other 28 are deliberately platform-global: tenants, plans, configuration, the marketing blog and similar. For any new tenant-owned model, being scoped is the path of least resistance.</p>
<p>Mongoose has four kinds of middleware &mdash; document, model, aggregate and query &mdash; according to its <a href="https://mongoosejs.com/docs/middleware.html">middleware documentation</a>, and hooks are registered per operation. A complete guard needs hooks across all of them:</p>
<table>
<thead>
<tr><th>Operation family</th><th>What the guard does</th></tr>
</thead>
<tbody>
<tr><td>find, findOne and the findOneAnd* variants</td><td>Adds the tenant filter before the query runs</td></tr>
<tr><td>update, delete and replace operations</td><td>Scopes the write to the current tenant</td></tr>
<tr><td>count, countDocuments, distinct</td><td>Scopes the count or the distinct values</td></tr>
<tr><td>aggregate</td><td>Prepends a <code>$match</code> stage on <code>tenantId</code></td></tr>
<tr><td>insertMany</td><td>Throws if no tenant is available</td></tr>
<tr><td>save</td><td>Applies the tenant scope to document saves</td></tr>
</tbody>
</table>
<p>The aggregate hook relies on a documented feature: the Mongoose docs describe <code>Aggregate#pipeline()</code> as "useful for adding stages to the beginning of the pipeline from middleware." With the tenant <code>$match</code> first, every later stage only sees one clinic's documents.</p>
<p>The plugin also injects a default <code>maxTimeMS</code> of 30 seconds on queries. The <a href="https://www.mongodb.com/docs/manual/reference/method/cursor.maxTimeMS/">MongoDB manual</a> describes this as a cumulative time limit beyond which MongoDB terminates the operation &mdash; a cheap ceiling in a database every clinic shares.</p>
<h3>Failing closed</h3>
<p>What matters most is what happens when there is no tenant. This is the heart of the filter injection, simplified from the real code:</p>
<pre><code>// Simplified from the Clinizy Care tenant plugin
const injectTenantFilter = (query) =&gt; {
  if (query.getFilter().tenantId) return;
  const tenantId = resolveScopeTenantId(query);
  query.where(tenantId ? { tenantId } : { tenantId: { $exists: false } });
};</code></pre>
<p>If a tenant is in context, the query is scoped to it. If not &mdash; a missing context, a background job, a plain bug &mdash; the filter becomes <code>{ tenantId: { $exists: false } }</code>, which only matches documents that have no <code>tenantId</code> at all. Tenant-owned documents always have one, so the query returns nothing instead of everything. An empty result is a bug report; a full result is a data leak.</p>
<p>Cross-tenant work is still possible, but never accidental. Scheduled jobs and the platform admin console have to opt out of scoping with an explicit flag, so every unscoped query is visible in the code as a deliberate choice. Scoped is the default.</p>

<h2>How do you prove tenant isolation in tests?</h2>
<p>With two lanes: a structural check that fails the build, and an integration suite that runs against a real database. We added the second because mocked-model unit tests couldn't prove isolation: a mock returns whatever you tell it to, so it can't show whether the filter that reaches MongoDB excludes another tenant's documents.</p>
<p><strong>The structural lane.</strong> A unit test fails the build if any tenant-scoped model lacks an index whose first key is <code>tenantId</code>. The first key is the point: according to the <a href="https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/">MongoDB manual on compound indexes</a>, a compound index supports queries on its index prefix, and a query that skips the leading field can't use it that way. Since every scoped query filters on <code>tenantId</code>, tenant-first indexes keep the guard's filter servable by an index.</p>
<p><strong>The real-database lane.</strong> A 23-case integration suite runs against a real in-memory MongoDB replica set. It proves that tenant A can't read, update, delete, count or aggregate tenant B's data, that queries fail closed when no tenant is in context, and that transaction rollback behaves. It has to be a replica set because MongoDB supports multi-document transactions on replica sets and sharded clusters, per the <a href="https://www.mongodb.com/docs/manual/core/transactions/">MongoDB transactions documentation</a>.</p>
<p>Both lanes sit inside a larger suite: thousands of automated tests across the API (Jest) and the web app (Vitest), with coverage gates enforced in CI.</p>

<h2>What broke along the way?</h2>
<h3>The first guard only covered reads</h3>
<p>The first version of the plugin scoped find queries and nothing else. An internal audit flagged that updates and deletes weren't covered. Because Mongoose registers middleware per operation, "the plugin handles tenancy" quietly meant "the plugin handles reads". We extended the guard to updates and deletes, then to count, distinct and insertMany, and moved the remaining tenant-owned models onto the plugin. Lesson: list every operation your ODM exposes and decide what the guard does with each. The table above is that list.</p>
<h3>A setting silently removed a filter</h3>
<p>A background job was meant to process active tenants only. Its filter used a field that wasn't in the schema, and a Mongoose <code>strictQuery</code> setting stripped it. According to the <a href="https://mongoosejs.com/docs/guide.html">Mongoose guide</a>, when <code>strictQuery</code> is true Mongoose filters out query properties that aren't in the schema (in Mongoose 7 the default is false). For us it happened silently: the filter became empty, and the job walked every tenant ever created. The tenant guard couldn't catch it, because a job that iterates over tenants is cross-tenant work by definition. Lesson: test the query that actually reaches the database, not the one you wrote.</p>
<h3>One crashed job is every clinic's outage</h3>
<p>An unhandled promise rejection inside a scheduled job could crash the API process. Since Node.js 15, the default mode for unhandled rejections is <code>throw</code>: without an <code>unhandledRejection</code> hook, the rejection is raised as an uncaught exception, per the <a href="https://nodejs.org/en/blog/release/v15.0.0">Node.js 15 release notes</a>. By default, Node then prints the stack trace and exits with code 1, according to the <a href="https://nodejs.org/api/process.html">Node.js process documentation</a>. In a single-tenant app that's one customer's bad afternoon. In a multi-tenant system it's every clinic at once. Every scheduled job now runs inside a guard, with a MongoDB-based lock so only one instance runs it.</p>
<h3>Midnight in Mumbai isn't midnight in UTC</h3>
<p>Our financial-year and day-bucket calculations initially used UTC. Indian clinics live in IST, which is UTC+5:30, so anything between midnight and 5:30 a.m. IST falls on the previous UTC date &mdash; and late-night bills could land on the wrong day. The financial year makes the edge sharper: under the <a href="https://www.indiacode.nic.in/bitstream/123456789/15374/1/the_general_clauses_act,_1897.pdf">General Clauses Act, 1897</a>, a financial year "shall mean the year commencing on the first day of April", so a bill raised at 1:00 a.m. IST on 1 April is still 31 March in UTC and would be bucketed into the previous financial year. Business dates are now computed explicitly in IST. More billing edge cases are in our <a href="/blog/gst-billing-engine-lessons-clinics">GST billing engine lessons</a>. (This is an engineering note, not tax advice.)</p>

[CTA]

<h2>The honest takeaway</h2>
<p>Shared-collection multi-tenancy moves isolation out of infrastructure and into code, which means the code has to be treated like infrastructure. For Clinizy Care, that meant a scoped-by-default schema factory, a guard that covers every operation and fails closed, tenant-first indexes enforced by a test, and an integration suite that proves isolation against a real database. The failures we hit were ordinary ones &mdash; a missing hook, a stripped filter, an unhandled rejection, a time zone &mdash; and each left behind a lesson we now design around.</p>
<p>Some things we keep simple on purpose. The whole system runs on AWS in the Mumbai region (ap-south-1). Side effects &mdash; WhatsApp, SMS, email, PDFs and reports &mdash; go onto AWS SQS queues, each with a dead-letter queue, drained by a separate worker so the request path stays fast (more in <a href="/blog/whatsapp-business-api-clinic-scale">running the WhatsApp Business API at clinic scale</a>). The live OPD queue streams to waiting-room screens over server-sent events from a single process; scaling it horizontally would need a pub/sub layer, and that's a deliberate trade-off.</p>
<p>The same tenant model &mdash; scoped by default, fail-closed, tested against a real database &mdash; is what we bring to client SaaS builds through our <a href="/services/ai-native-software-engineering">AI-native software engineering</a> practice. If you're building for hospitals and clinics, our <a href="/industries/healthcare">healthcare software engineering</a> team is the one that builds and runs Clinizy Care, and the <a href="/case-studies/clinizy-care">Clinizy Care case study</a> has the wider picture.</p>`,
};

export default post;
