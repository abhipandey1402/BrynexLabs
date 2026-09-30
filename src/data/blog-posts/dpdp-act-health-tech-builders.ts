import type { BlogPost } from '../blog';

const post: BlogPost = {
    slug: 'dpdp-act-health-tech-builders',
    title: 'The DPDP Act for Health-Tech Builders: What We Built, What\'s Next',
    excerpt: 'For health-tech builders, the DPDP Act, 2023 and the DPDP Rules, 2025 turn privacy into a product spec: itemised notices, consent as easy to withdraw as to give, minimum security safeguards with logs kept for a year, a detailed breach report to the Board within 72 hours, and working access, correction and erasure requests. The core obligations commence in May 2027. In Clinizy Care we have built India hosting, tenant isolation, role-based access, two-factor sign-in, an append-only audit trail and clinic-level export and deletion; patient-level consent, individual rights requests, field-level encryption and read auditing are next.',
    author: 'Abhi Pandey',
    date: 'Sep 30, 2026',
    readTime: '11 min read',
    category: 'Engineering',
    seoDescription: 'What India\'s DPDP Act and DPDP Rules, 2025 ask of health-tech software, mapped to engineering controls, and what we have built into Clinizy Care so far.',
    relatedServices: ['ai-native-software-engineering'],
    techTags: ['DPDP Act', 'Health-tech', 'Data privacy', 'Access control', 'Audit logging'],
    publishedAt: '2026-09-30T07:30:00.000Z',
    updatedAt: '2026-09-30T07:30:00.000Z',
    status: 'published',
    content: `<p>India&rsquo;s Digital Personal Data Protection Act, 2023 has no special category for health data, but for anyone building clinic or hospital software it still reads as a product spec. The DPDP Rules, 2025 fill in the detail: itemised notices, consent as easy to withdraw as to give, minimum security safeguards with logs kept for a year, a detailed breach report to the Data Protection Board within 72 hours, and a working way for people to access, correct and erase their data. The core obligations commence in May 2027. Below, we map each obligation to an engineering control, and give an honest account of what we have built into Clinizy Care, our own hospital management software, and what comes next.</p>

<p><em>This is an engineering guide, not legal advice. We quote the official texts; how they apply to you is a question for your lawyer.</em></p>

<h2>Key takeaways</h2>
<ul>
<li><strong>The clock is running.</strong> The DPDP Rules were published in the Gazette on 13 November 2025; the core duties of Data Fiduciaries commence eighteen months later, in May 2027.</li>
<li><strong>Health data is not a separate legal category.</strong> One standard covers all digital personal data. The legal floor is uniform; the harm from a breach is not.</li>
<li><strong>A vendor cannot carry the clinic&rsquo;s liability.</strong> The clinic is usually the Data Fiduciary and stays responsible for processing done on its behalf.</li>
<li><strong>Rule 6 reads like an engineering checklist:</strong> encryption or masking, access control, logs, continuity, one-year retention and processor contracts. Failing to take reasonable security safeguards can attract a penalty of up to &#8377;250 crore.</li>
<li><strong>In Clinizy Care,</strong> India hosting, tenant isolation, role-based access, two-factor sign-in, an append-only audit trail and clinic-level export and deletion are built. Patient-level consent, individual rights requests, field-level encryption and read auditing are next.</li>
</ul>

<h2>When do the DPDP Act and Rules apply to health-tech?</h2>
<p>The Act is <a href="https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf">Act No. 22 of 2023</a>, enacted on 11 August 2023. Most of it sat dormant until MeitY published the <a href="https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf">Digital Personal Data Protection Rules, 2025</a> (G.S.R. 846(E)) and a <a href="https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf">commencement notification for the Act</a> (G.S.R. 843(E)), both in the Gazette of India dated 13 November 2025. They switch provisions on in three phases, counted from that date:</p>
<table>
<thead>
<tr><th>Phase</th><th>What comes into force</th><th>What it means for builders</th></tr>
</thead>
<tbody>
<tr><td>On publication (13 November 2025)</td><td>Definitions, the Data Protection Board and the penalty framework (Act sections 2, 18&ndash;26, 35, 38&ndash;43; Rules 1, 2, 17&ndash;21)</td><td>The Board exists; product duties do not bite yet</td></tr>
<tr><td>After one year (November 2026)</td><td>Registration of Consent Managers (Act section 6(9); Rule 4)</td><td>Consent platforms can register with the Board</td></tr>
<tr><td>After eighteen months (May 2027)</td><td>Notice, consent, security safeguards, breach intimation, erasure, children&rsquo;s data, rights and grievances (Act sections 3&ndash;17 except 6(9); Rules 3, 5&ndash;16, 22, 23)</td><td>Everything in this post</td></tr>
</tbody>
</table>
<p>That leaves a little over seven months from the date of this post; check MeitY for any amendment before you plan around these dates. Note for clinics moving off paper: under section 3, data collected on paper and digitised later is also in scope.</p>

<h2>Who is the Data Fiduciary when a clinic uses your software?</h2>
<p>The Act defines six roles. The <strong>Data Principal</strong> is the person the data is about (for a child, including the parent or lawful guardian). The <strong>Data Fiduciary</strong> decides the purpose and means of processing; a <strong>Data Processor</strong> processes on its behalf. A <strong>Significant Data Fiduciary</strong> is notified by the Central Government and must appoint a Data Protection Officer and an independent auditor. A <strong>Consent Manager</strong> is a Board-registered consent platform, which the Rules require to be a company incorporated in India. The <strong>Data Protection Board of India</strong> inquires into breaches and imposes penalties.</p>
<p>In most clinic software, the clinic is the Data Fiduciary for patient data and the vendor is its Data Processor. Under section 8(1), the fiduciary is responsible for compliance &ldquo;irrespective of any agreement to the contrary&rdquo;, including for processing its processor does. It may use a processor only under a valid contract (section 8(2)), and Rule 6 requires that contract to cover reasonable security safeguards.</p>
<p>So we choose our words carefully: Clinizy Care is <strong>built to be DPDP Act 2023 aligned</strong>, but no vendor can hand a clinic compliance, because the clinic remains the fiduciary. <a href="https://clinizy.in/privacy">Clinizy Care&rsquo;s privacy policy</a> sets out the split: Brynex Labs is a Data Processor for patient data, where the clinic is the Data Fiduciary, and a Data Fiduciary for its own account data. A vendor&rsquo;s job is to ship the controls, document them, and make evidence easy to produce. Our clinic-facing explainer on <a href="https://clinizy.in/blog/cloud-backup-data-security-clinics-dpdp">what DPDP alignment means for clinic data security</a> covers the same ground from the owner&rsquo;s side.</p>

<h2>Is health data a special category under the DPDP Act?</h2>
<p>No. The Act does not define a separate class of sensitive or health data. &ldquo;Personal data&rdquo; means any data about an individual who is identifiable by or in relation to it (section 2(t)), so a patient&rsquo;s diagnosis and a patient&rsquo;s phone number carry the same obligations.</p>
<p>Health appears in two places. Section 7&rsquo;s &ldquo;legitimate uses&rdquo;, which do not rest on consent, include responding to a medical emergency and providing treatment during an epidemic or other public health threat. And the &ldquo;sensitivity of personal data processed&rdquo; is one factor the government may weigh when notifying a Significant Data Fiduciary (section 10(1)). The legal floor is uniform, but health records are where a breach does the most harm, so they deserve your strongest controls.</p>
<h3>What about children&rsquo;s data in paediatric clinics?</h3>
<p>Section 9 requires verifiable parental consent before processing a child&rsquo;s data (a child is anyone under eighteen) and bars tracking, behavioural monitoring and targeted advertising directed at children. The Fourth Schedule to the Rules exempts clinical establishments, mental health establishments and healthcare professionals from those two provisions where processing is restricted to providing health services to the child, to the extent necessary to protect her health. Two details matter for design: the ban on processing likely to harm a child&rsquo;s well-being (section 9(2)) still applies, and the exemption is scoped to care, so promotional messages to parents would not obviously fall within it. Record the purpose alongside the data so the boundary stays visible.</p>

<h2>What does &ldquo;reasonable security safeguards&rdquo; mean in code?</h2>
<p>Rule 6 is the closest the law comes to an engineering spec. Safeguards must include, at the minimum:</p>
<ul>
<li><strong>Data security measures</strong> such as encryption, obfuscation, masking or virtual tokens.</li>
<li><strong>Access control</strong> over the computer resources used by the fiduciary or its processor.</li>
<li><strong>Visibility on access</strong> through logs, monitoring and review.</li>
<li><strong>Continuity</strong>: reasonable measures to keep processing if data is compromised, such as data backups.</li>
<li><strong>One-year retention</strong> of those logs and personal data, unless another law requires otherwise.</li>
<li><strong>Processor contracts</strong> that require safeguards, plus the technical and organisational measures that make it all work.</li>
</ul>
<p>The Schedule to the Act sets the stakes: up to &#8377;250 crore for failing to take reasonable security safeguards; up to &#8377;200 crore each for failing to notify the Board or affected people of a breach and for breaching the obligations on children&rsquo;s data; and up to &#8377;50 crore for any other breach. The <a href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf">PIB backgrounder on the Rules</a> summarises the same ceilings.</p>
<p>One point is easy to miss: Rule 6 wants logs, and Rule 8(3) separately requires personal data, traffic data and processing logs to be kept for at least a year. If your audit log copies whole records, you have built a second, less-guarded copy of every patient chart. In Clinizy Care the audit trail records every successful create, update and delete automatically, but a field allowlist decides what gets written, so patient health data stays out of the log itself.</p>
<pre><code>// Simplified illustration, not our production code
const AUDIT_SAFE_FIELDS = {
  appointment: ['status', 'doctorId', 'slotTime'],
  invoice: ['status', 'total', 'paymentMode'],
};

function auditFields(entity, changes) {
  const allowed = AUDIT_SAFE_FIELDS[entity] || [];
  return Object.fromEntries(
    Object.entries(changes).filter(([key]) =&gt; allowed.includes(key))
  );
}</code></pre>
<h3>How fast must a personal data breach be reported?</h3>
<p>Rule 7 sets two tracks. Each affected Data Principal must be told without delay, in plain language: what happened, the likely consequences, what is being done, how to protect themselves, and who to contact. The Board gets a description without delay, then a detailed report within seventy-two hours of the fiduciary becoming aware, or longer if the Board allows it on written request.</p>
<p>Seventy-two hours is short if answering &ldquo;whose data was affected?&rdquo; takes a day. The controls that answer it are the ones Rule 6 already asks for: strict tenant scoping, access tied to named users, and queryable logs.</p>

[CTA]

<h2>What must the product do for notice, consent and rights?</h2>
<p>Under Rule 3, a notice must stand on its own, in clear and plain language, with an itemised description of the data, the specific purposes, and a way to withdraw consent, exercise rights and complain to the Board. The Act adds that withdrawal must be as easy as giving consent (section 6(4)), that people must be able to read notices in English or any language in the Eighth Schedule to the Constitution, and that if consent is disputed, the fiduciary must prove a valid notice was given and consent obtained (section 6(10)).</p>
<p>The rights are access to a summary of the data and who it was shared with (section 11), correction and erasure (section 12), grievance redressal (section 13), and nominating someone to exercise them in case of death or incapacity (section 14). Under Rule 14, grievances must be answered within a published period of no more than ninety days. Section 8(7) requires erasure once consent is withdrawn or the purpose is no longer served, unless another law requires retention.</p>
<p>Translated into engineering:</p>
<ul>
<li><strong>Consent is a record, not a checkbox.</strong> The burden of proof sits with the fiduciary, so store which notice version was shown, which purposes were accepted, when, and when consent was withdrawn.</li>
<li><strong>Notices are versioned, multilingual content,</strong> not hard-coded strings.</li>
<li><strong>Rights requests are a workflow with a clock:</strong> an owner, a status and a deadline for each.</li>
<li><strong>Retention is a policy per data category.</strong> The &ldquo;unless another law requires retention&rdquo; carve-out matters in healthcare, so deletion logic must know what it may not delete.</li>
</ul>

<h2>How does Clinizy Care map to the DPDP obligations?</h2>
<p>&ldquo;Built&rdquo; means in the product today; &ldquo;In progress&rdquo; means what we are building next.</p>
<table>
<thead>
<tr><th>Obligation (source)</th><th>Engineering control</th><th>Status in Clinizy Care</th></tr>
</thead>
<tbody>
<tr><td>Encryption (Rule 6)</td><td>All traffic over TLS with HSTS; uploaded files in S3 encrypted at rest, public access blocked, TLS-only bucket policy; servers and file storage on AWS Mumbai (ap-south-1)</td><td>Built</td></tr>
<tr><td>Encryption of secrets (Rule 6)</td><td>A clinic&rsquo;s own credentials, such as its WhatsApp access token, encrypted at the application layer with AES-256-GCM</td><td>Built</td></tr>
<tr><td>Encryption of the most sensitive identifiers (Rule 6)</td><td>Field-level encryption for key patient identifiers; design done</td><td>In progress</td></tr>
<tr><td>Masking and minimisation (Rule 6)</td><td>Waiting-room OPD token display shows patient initials only</td><td>Built</td></tr>
<tr><td>Access control (Rule 6)</td><td>Fail-closed tenant guard on every database query, tested against a real database; seven staff roles, one permission matrix shared by API and interface, per-clinic overrides</td><td>Built</td></tr>
<tr><td>Authentication (Rule 6)</td><td>TOTP two-factor sign-in; short-lived in-memory access tokens; httpOnly rotating refresh cookie with reuse detection</td><td>Built</td></tr>
<tr><td>Logs and retention (Rules 6 and 8(3))</td><td>Append-only audit trail of every create, update and delete, with a field allowlist; retained for two years</td><td>Built</td></tr>
<tr><td>Visibility on access (Rule 6)</td><td>Audit trail extended to reads of patient records</td><td>In progress</td></tr>
<tr><td>Notice and consent (sections 5&ndash;6; Rule 3)</td><td>Patient-level consent at registration, with purpose-specific notices and easy withdrawal</td><td>In progress</td></tr>
<tr><td>Website consent (section 6)</td><td>Cookie and analytics consent through Google Consent Mode v2</td><td>Built</td></tr>
<tr><td>Access and erasure (sections 8(7), 11&ndash;12)</td><td>Owner exports all clinic data to spreadsheets; account deletion is an immediate soft delete, purged after 30 days, keeping records that must be retained (such as GST invoices and the audit log)</td><td>Built (clinic level)</td></tr>
<tr><td>Individual rights requests (sections 11&ndash;13; Rule 14)</td><td>Workflow for one patient&rsquo;s access, correction and erasure requests</td><td>In progress</td></tr>
</tbody>
</table>
<p>On clinizy.in, role-based access is part of the Care Plus plan and above. The tenant guard has its own write-up in <a href="/blog/how-we-built-multi-tenant-hms-indian-clinics">how we built a multi-tenant HMS for Indian clinics</a>, and messaging in <a href="/blog/whatsapp-business-api-clinic-scale">running the WhatsApp Business API at clinic scale</a>.</p>
<h3>What we&rsquo;re building next</h3>
<p>Each &ldquo;In progress&rdquo; row maps to an obligation that commences in May 2027:</p>
<ol>
<li><strong>Patient-level consent at registration,</strong> with purpose-specific notices and easy withdrawal. It happens at the front desk, so it has to be quick enough for a busy OPD counter.</li>
<li><strong>Individual rights requests.</strong> Export and deletion work at the clinic level today; next is a workflow for one patient&rsquo;s request to access, correct or erase their data.</li>
<li><strong>Field-level encryption for the most sensitive identifiers.</strong> The design is done; implementation is next.</li>
<li><strong>Auditing reads, not just changes.</strong> Rule 6 asks for visibility on the accessing of personal data; logging who viewed a record, not only who edited it, answers that directly.</li>
</ol>

[CTA]

<h2>The honest takeaway</h2>
<p>The DPDP Act does not ask health-tech builders to become lawyers. It asks for software where consent is a record, access is a deliberate decision, every change leaves a trace, and one person&rsquo;s data can be found, handed over, corrected and removed. We would rather publish an honest map, with the gaps labelled as the roadmap they are, than claim a compliance no vendor can give.</p>
<p>If you are building software that handles patient data, our <a href="/industries/healthcare">healthcare software engineering</a> practice builds these controls in from the first sprint, and <a href="/products/clinizy-care">how we built Clinizy Care</a> shows them in a live product. For the wider build, see our <a href="/services/ai-native-software-engineering">AI-native software engineering</a> service.</p>`,
};

export default post;
