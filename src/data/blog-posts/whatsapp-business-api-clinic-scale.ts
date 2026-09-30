import type { BlogPost } from '../blog';

const post: BlogPost = {
    slug: 'whatsapp-business-api-clinic-scale',
    title: 'WhatsApp Business API at Clinic Scale: What We Learned',
    excerpt: 'The API call is the easy part; the system around it is the work. Sending clinic messages over the WhatsApp Cloud API for many clinics from one SaaS comes down to a sender model with a safe fallback, utility-only templates in each language you support, a queue with dead-letter handling, platform-enforced guardrails and atomic quotas, and webhooks verified against the raw request.',
    author: 'Abhi Pandey',
    date: 'Sep 30, 2026',
    readTime: '11 min read',
    category: 'Engineering',
    seoDescription: 'Lessons from sending clinic reminders, bills and recalls over the WhatsApp Cloud API from one SaaS: sender models, templates, queues, guardrails and webhooks.',
    relatedServices: ['ai-agents-automation', 'ai-native-software-engineering'],
    techTags: ['WhatsApp Cloud API', 'AWS SQS', 'Webhooks', 'Node.js', 'Multi-tenant SaaS'],
    publishedAt: '2026-09-30T08:30:00.000Z',
    updatedAt: '2026-09-30T08:30:00.000Z',
    status: 'published',
    content: `<p>The API call is the easy part. Sending one appointment reminder through Meta&rsquo;s WhatsApp Cloud API is a single authenticated request; sending reminders, prescriptions, bills and recalls for many clinics from one SaaS is a systems problem. Building this into Clinizy Care taught us that five decisions carry the weight: which number messages come from, keeping every template in the utility category, putting a queue between the app and Meta, enforcing guardrails so no patient gets spammed, and verifying webhooks properly.</p>

<p>Clinizy Care is the hospital management software we build and run for clinics, nursing homes and small hospitals in India (the <a href="/products/clinizy-care">builder&rsquo;s story of Clinizy Care</a> covers the wider product). Its <a href="https://clinizy.in/whatsapp-for-clinics">WhatsApp for clinics</a> feature sends appointment reminders, prescriptions, bills, lab reports and recalls. We integrate the Meta WhatsApp Cloud API directly on Graph API v20.0, with no business solution provider in the middle of live sending.</p>

<h2>Key takeaways</h2>
<ul>
<li><strong>Support two sender models.</strong> A shared platform number by default, the clinic&rsquo;s own WhatsApp Business Account as an option, and a fallback when a clinic&rsquo;s sender is misconfigured.</li>
<li><strong>Keep templates utility.</strong> Meta treats mixed utility-and-promo templates as marketing, and category drives what you pay.</li>
<li><strong>Never send inline.</strong> Queue external channels with a dead-letter queue and idempotent workers, and log the provider&rsquo;s full error body.</li>
<li><strong>Guardrails belong to the platform.</strong> Quiet hours, opt-outs, daily caps and licence checks run before any send.</li>
<li><strong>Reserve quota before sending</strong>, and test webhooks through your real middleware stack.</li>
</ul>

<h2>Should a multi-clinic SaaS use one WhatsApp number or one per clinic?</h2>
<p>Support both, and make the shared number the default. In Clinizy Care, messages go out from one shared platform number unless a clinic connects its own WhatsApp Business Account, in which case its messages go out through its own sender. The shared number is the lowest-friction start; a clinic&rsquo;s own account gives it its own sender identity and its own standing with Meta.</p>
<p>The trade-off is mostly about shared limits. According to Meta&rsquo;s <a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits">messaging limits documentation</a>, limits are set at the business portfolio level and shared by every phone number in that portfolio, and Meta&rsquo;s <a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/throughput">throughput guide</a> sets a default of 80 messages per second per business phone number. On a shared sender, every clinic draws on the same pool and the same quality signal, so guardrails have to be enforced by the platform, not left to each clinic.</p>
<table>
<thead>
<tr><th>Aspect</th><th>Shared platform number (default)</th><th>Clinic&rsquo;s own WhatsApp Business Account</th></tr>
</thead>
<tbody>
<tr><td>Sender</td><td>One number operated by the platform</td><td>The clinic&rsquo;s own number</td></tr>
<tr><td>Credentials</td><td>Managed centrally</td><td>Clinic&rsquo;s access token, encrypted at rest with AES-256-GCM</td></tr>
<tr><td>Meta limits</td><td>Shared by every clinic on the number</td><td>The clinic&rsquo;s own portfolio limits</td></tr>
<tr><td>Failure mode</td><td>A problem affects every clinic on the number</td><td>Misconfiguration falls back to the platform number</td></tr>
</tbody>
</table>
<p>Two details matter more than they look. A clinic&rsquo;s access token can send messages in that clinic&rsquo;s name, so we encrypt it at rest with AES-256-GCM. And own-number setups can break: a token is rotated, a setting changes in Meta&rsquo;s dashboard. When a clinic&rsquo;s own sender is misconfigured, Clinizy Care falls back to the platform number rather than failing silently. A reminder from an unexpected number is a minor annoyance; a reminder that never arrives is a missed appointment nobody noticed.</p>

<h2>Which WhatsApp template category should clinic messages use?</h2>
<p>Utility. Every template must be categorised as authentication, marketing or utility, and templates are the only message type you can send outside a customer service window, according to Meta&rsquo;s <a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview">template documentation</a>. Meta&rsquo;s <a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization">template categorization guide</a> defines utility templates as non-promotional messages that are specific to the user or essential to them, which is where transactional clinic messages belong. All of Clinizy Care&rsquo;s templates are in the utility category.</p>
<p>The discipline is in keeping them there. The same guide treats templates with mixed content as marketing; one of its examples is an order update with a promo. For a clinic, that means no discount line tucked under a bill.</p>
<p>Language is the other design decision. Clinizy Care has 29 WhatsApp templates in total, covering 15 message types in English and Hindi, created and approved in Meta&rsquo;s WhatsApp Manager. Each clinic chooses its WhatsApp language, English by default, and printed documents also come in English and Hindi. Meta&rsquo;s template documentation says it does not translate template strings or variables, so each language version is a separate template to write, submit and keep in sync.</p>
<p>Category also drives cost. According to Meta&rsquo;s <a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing">WhatsApp Business Platform pricing page</a>, Meta has charged per message since July 1, 2025, replacing conversation-based pricing, with rates that vary by template category and the recipient&rsquo;s country calling code. Utility templates delivered within an open customer service window are free, and that window opens for 24 hours when the patient messages the business. A reminder sent the evening before an appointment will often land outside any open window, so budget for it as a paid utility message.</p>

<h2>How do you send WhatsApp messages reliably from a multi-tenant SaaS?</h2>
<p>Never call Meta from inside the request that triggered the message. When something happens in Clinizy Care, such as an appointment booked or a bill finalised, the dispatch layer writes the in-app notification directly and puts every external channel (WhatsApp, SMS, email) onto AWS SQS queues. A worker picks messages up and talks to Meta, so a slow provider becomes a queue-depth problem instead of an error on someone&rsquo;s screen.</p>
<ul>
<li><strong>Dead-letter queue after three attempts.</strong> SQS redrives a message to a dead-letter queue after 3 failed receives, so one broken message can&rsquo;t retry forever.</li>
<li><strong>Exponential backoff.</strong> If the worker hits poll errors, it backs off exponentially instead of hammering the queue.</li>
<li><strong>Idempotent processing.</strong> AWS&rsquo;s <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html">SQS at-least-once delivery documentation</a> warns that you might receive a message again and tells you to design for idempotency. Our worker processing is idempotent, with a backstop for poison messages.</li>
<li><strong>Bounded concurrency for campaigns.</strong> Campaign enqueueing runs 10 at a time, so a long recall list goes onto the queue at a controlled pace.</li>
</ul>
<p>The queue also absorbs Meta&rsquo;s back-pressure. Meta&rsquo;s throughput guide says the API returns error 130429 when you exceed your throughput level, and Meta&rsquo;s <a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/support/error-codes">error code reference</a> lists 131056 for too many messages to the same recipient in a short period. Both mean: slow down and retry later.</p>
<h3>The error message that hid the real error</h3>
<p>By default, axios, the HTTP client we use, rejects any non-2xx response, and, as its <a href="https://github.com/axios/axios">README</a> shows, the server&rsquo;s body sits on <code>error.response.data</code> rather than in the error message you&rsquo;d normally log. Meta puts the real explanation in that body, so we now fold Meta&rsquo;s error details into each message&rsquo;s failure reason. That is how we tracked down error 131008, which Meta&rsquo;s error code reference describes as &ldquo;The request is missing a required parameter.&rdquo; Ours came from a URL-button parameter in a template. Without Meta&rsquo;s details, a failed send just looks like a failed send.</p>

[CTA]

<h2>How do you stop a SaaS from spamming patients on WhatsApp?</h2>
<p>Put the rules in the platform, in front of every send. Meta&rsquo;s <a href="https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in">opt-in guidance</a> says businesses must obtain opt-in before messaging people and must honour opt-out requests, and notes that WhatsApp rate-limits businesses with sustained low quality ratings. In Clinizy Care, every WhatsApp message is checked against what we call the governance chain before it is sent:</p>
<ul>
<li><strong>Quiet hours.</strong> A routine reminder is never worth waking a patient for.</li>
<li><strong>Per-clinic opt-out list.</strong> Matching works across phone formats (+91&hellip;, 91&hellip; and bare 10-digit numbers), because Indian numbers turn up in all three, and an opt-out that only matches one spelling isn&rsquo;t an opt-out.</li>
<li><strong>Per-patient, per-message-type daily cap.</strong> For example, at most 2 appointment reminders per patient per day, while critical lab alerts get a much higher ceiling. A guardrail should never block the message that matters most.</li>
<li><strong>Licence and kill-switch eligibility.</strong> Only licensed clinics can send on paid channels like WhatsApp and SMS.</li>
</ul>
<p>The chain applies whether the message is a one-off prescription, an automated recall or a bulk campaign, and much of the sending is automated. Many of Clinizy Care&rsquo;s <a href="https://clinizy.in/automations">24 built-in clinic automations</a> deliver over WhatsApp: follow-up recalls, no-show win-back, refill reminders, vaccine reminders, feedback requests, dues recovery and instant lab report delivery. A logic bug in an automation can message the same patient again and again; a cap enforced at the platform layer catches that whichever automation misbehaved. Consent is also a data-protection question, which we cover in <a href="/blog/dpdp-act-health-tech-builders">the DPDP Act for health-tech builders</a>.</p>

<h2>How do Meta&rsquo;s limits and your own SaaS quotas fit together?</h2>
<p>Treat them as separate layers. Meta limits how many people, and how fast, a portfolio or number can message; your product decides how much each tenant may use.</p>
<table>
<thead>
<tr><th>Limit</th><th>Set by</th><th>Scope</th><th>What it caps</th></tr>
</thead>
<tbody>
<tr><td>Messaging limit</td><td>Meta</td><td>Business portfolio</td><td>Unique users messaged outside a customer service window in a moving 24 hours: 250 for new portfolios, scaling through 2,000, 10,000 and 100,000 to unlimited</td></tr>
<tr><td>Throughput</td><td>Meta</td><td>Business phone number</td><td>80 messages per second by default, up to 1,000 by automatic upgrade (error 130429)</td></tr>
<tr><td>Pair rate limit</td><td>Meta</td><td>One sender to one recipient</td><td>Too many messages to the same user in a short period (error 131056)</td></tr>
<tr><td>Plan quota</td><td>Clinizy Care</td><td>Clinic</td><td>Monthly messages on the clinic&rsquo;s plan, alerts at 90% and 100%</td></tr>
<tr><td>Daily cap</td><td>Clinizy Care</td><td>Patient and message type</td><td>For example, 2 appointment reminders per day</td></tr>
</tbody>
</table>
<p>Meta&rsquo;s figures come from its messaging limits and throughput pages; the 1,000-per-second upgrade has conditions, including an unlimited messaging limit.</p>
<p>On our side, the detail that matters is that quota is reserved atomically before sending, not counted after. Otherwise a campaign and the day&rsquo;s reminders running at the same time could each read &ldquo;quota remaining&rdquo; and together overspend it. Reserving first turns the race into a simple rule: if the reservation fails, the send doesn&rsquo;t happen. Paid top-ups go through an idempotent payment ledger, so a retried payment callback can&rsquo;t credit the same top-up twice. Clinizy Care plans start at &#8377;1,999/month excluding GST, with the WhatsApp Business API listed as an add-on. Ledgers got their own post: <a href="/blog/gst-billing-engine-lessons-clinics">what we learned building a GST billing engine for clinics</a>.</p>

[CTA]

<h2>How do you verify WhatsApp Cloud API webhooks?</h2>
<p>Two kinds of request hit the same endpoint, and each has a trap. According to Meta&rsquo;s <a href="https://developers.facebook.com/docs/graph-api/webhooks/getting-started">webhooks getting-started guide</a>, setup starts with a GET request carrying <code>hub.mode</code> (always &ldquo;subscribe&rdquo;), <code>hub.verify_token</code> (the string you set in the App Dashboard) and <code>hub.challenge</code>; your endpoint checks the token and responds with the challenge. Event notifications arrive as POSTs signed with a SHA256 signature in the <code>X-Hub-Signature-256</code> header, which you recompute from the payload and your App Secret.</p>
<p>Our GET handshake failed with a 403. The cause was express-mongo-sanitize, a request-sanitising middleware that, according to its <a href="https://github.com/fiznool/express-mongo-sanitize">README</a>, targets keys that begin with <code>$</code> or contain a <code>.</code>, because MongoDB reserves them for operators. <code>hub.mode</code> and <code>hub.verify_token</code> contain dots, so they were stripped before our handler saw them and Meta&rsquo;s verification was rejected. The fix was to read the handshake from the raw URL. The lesson: middleware that rewrites input will eventually rewrite something a third party depends on, so test provider handshakes through your full stack.</p>
<p>The POST side follows four rules: compute the HMAC over the raw body, not re-serialised JSON; compare with a timing-safe function; fail closed on a missing or wrong signature; and acknowledge with 200 immediately, then process. In Clinizy Care, delivery statuses (sent, delivered, read, failed) then update the message log. Meta&rsquo;s guide says failed deliveries are retried over the following 36 hours, so make status updates safe to apply twice.</p>
<pre><code>// Simplified sketch, not production code
app.post('/webhooks/whatsapp', express.raw({ type: 'application/json' }), (req, res) =&gt; {
  const received = Buffer.from(req.get('X-Hub-Signature-256') || '');
  const expected = Buffer.from('sha256=' + crypto
    .createHmac('sha256', process.env.META_APP_SECRET)
    .update(req.body)            // the raw bytes Meta signed
    .digest('hex'));

  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
    return res.sendStatus(401);  // fail closed
  }
  res.sendStatus(200);           // acknowledge first
  setImmediate(() =&gt; applyStatusUpdates(JSON.parse(req.body))); // then process
});</code></pre>

<h2>What would we build next?</h2>
<p>Automatic handling of STOP-style replies. Today, opt-outs are managed per clinic and enforced on every send, but a patient&rsquo;s reply doesn&rsquo;t yet update the list by itself. Closing that loop means recognising opt-out replies in English and Hindi, working out which clinic a reply belongs to when the original went out from the shared number, and reusing the phone-format matching the governance chain already has.</p>

<h2>The honest takeaway</h2>
<p>WhatsApp at clinic scale is less an API integration than a small messaging platform: a sender model with a safe fallback, strictly transactional templates, a queue that absorbs failure, guardrails that protect patients from your own automations, quotas that can&rsquo;t be overspent, and webhooks you can trust. None of it is exotic; it just has to exist before the first busy Monday. The same foundations run through the rest of the product, covered in <a href="/blog/how-we-built-multi-tenant-hms-indian-clinics">how we built a multi-tenant HMS for Indian clinics</a> and the <a href="/case-studies/clinizy-care">Clinizy Care case study</a>.</p>
<p>We build this kind of messaging automation for clients too, through our <a href="/services/ai-agents-automation">AI agents and automation</a> practice, with the surrounding product built by our <a href="/services/ai-native-software-engineering">AI-native software engineering</a> team. Building for clinics or hospitals? See our <a href="/industries/healthcare">healthcare software engineering</a> page.</p>`,
};

export default post;
