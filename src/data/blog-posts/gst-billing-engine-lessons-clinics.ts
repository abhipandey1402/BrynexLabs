import type { BlogPost } from '../blog';

const post: BlogPost = {
    slug: 'gst-billing-engine-lessons-clinics',
    title: 'Lessons From Building a GST Billing Engine for Clinics',
    excerpt: 'Most GST billing bugs are data bugs that surface as tax errors. Store money as integer paise, attach tax rates to the product and service master, decide CGST/SGST versus IGST in one place, back-calculate GST from MRP, apply discounts before tax, compute dates in IST, and make finalized bills immutable.',
    author: 'Abhi Pandey',
    date: 'Sep 30, 2026',
    readTime: '11 min read',
    category: 'Engineering',
    seoDescription: 'Engineering lessons from building GST billing for Indian clinics: integer paise, CGST/SGST vs IGST, exempt consults, MRP-inclusive pricing and IST dates.',
    relatedServices: ['ai-native-software-engineering'],
    techTags: ['GST', 'Invoicing', 'MongoDB', 'Healthcare', 'Billing engine'],
    publishedAt: '2026-09-30T06:30:00.000Z',
    updatedAt: '2026-09-30T06:30:00.000Z',
    status: 'published',
    content: `<p>The biggest lesson from building the GST billing engine in Clinizy Care is that most invoicing bugs aren&rsquo;t tax-law bugs &mdash; they&rsquo;re data bugs that show up as tax errors. Store money as integer paise, keep tax rates on the product and service master, decide CGST/SGST versus IGST in one place, back-calculate GST from MRP, apply discounts before tax, compute dates in IST, and make finalized bills impossible to edit. Get those right and the tax maths mostly takes care of itself.</p>

<p><em>This is an engineering write-up, not tax or legal advice. GST treatment depends on your facts and the rules change; have a chartered accountant review your tax logic.</em></p>

<h2>Key takeaways</h2>
<ul>
<li><strong>Money is integers.</strong> Store and compute every amount as integer paise; format to rupees only at the display or PDF edge.</li>
<li><strong>Rates are data, not code.</strong> With the rate on the product or service master, a rate change becomes a master-data edit, not a deploy &mdash; and September 2025 proved rates do change.</li>
<li><strong>Tax identity drives everything.</strong> The clinic&rsquo;s GSTIN decides whether GST applies and how it splits &mdash; read it from the source of truth, never a cached session.</li>
<li><strong>Taxable value comes first.</strong> Back-calculate it from MRP, and allocate bill-level discounts before tax. An internal audit once caught us getting the second part wrong.</li>
<li><strong>India runs on IST.</strong> UTC puts post-midnight bills on the wrong day and, on 31 March, in the wrong financial year.</li>
</ul>

<h2>What does a clinic GST billing engine have to get right?</h2>
<p>One clinic bill can mix an exempt consultation, medicines at different rates whose printed price already includes tax, and a procedure. The clinic may or may not be GST-registered, the patient is almost always an unregistered individual, and the front desk is busy. Building billing for <a href="/products/clinizy-care">Clinizy Care</a>, our hospital management software for Indian clinics, nursing homes and small hospitals, we encoded the rules below. Each prevents a specific, boring, expensive bug.</p>

<table>
<thead>
<tr><th>Billing rule</th><th>How we implemented it</th><th>Bug it prevents</th></tr>
</thead>
<tbody>
<tr><td>Money is exact to the paisa</td><td>Integer paise everywhere</td><td>Floating-point drift</td></tr>
<tr><td>Intra-state: CGST + SGST; inter-state: IGST</td><td>GSTIN state code vs patient state; SGST = tax &minus; CGST</td><td>Halves that don&rsquo;t add up to the tax</td></tr>
<tr><td>Clinic healthcare services are exempt, with exclusions</td><td>Consultations at 0%; rates on the master (HSN/SAC)</td><td>Staff typing the wrong rate</td></tr>
<tr><td>Unregistered clinics can&rsquo;t collect GST</td><td>No GSTIN: every line 0%, GST entry locked</td><td>Collecting tax illegally</td></tr>
<tr><td>MRP includes all taxes</td><td>GST = MRP &minus; round(MRP / (1 + rate))</td><td>A sale a paisa above MRP</td></tr>
<tr><td>Line and slab totals must agree</td><td>Per-line tax, reconciled per slab one paisa at a time</td><td>An invoice that contradicts itself</td></tr>
<tr><td>Discounts reduce taxable value</td><td>Pro-rata allocation before tax</td><td>Tax on the pre-discount value</td></tr>
<tr><td>Invoice numbers unique per financial year</td><td>Atomic counter in the bill&rsquo;s transaction</td><td>Duplicate numbers under concurrency</td></tr>
<tr><td>Indian dates are IST dates</td><td>Days, months and financial year computed in IST</td><td>Bills on the wrong day or financial year</td></tr>
<tr><td>Issued bills are records</td><td>Finalized bills immutable; day-close lock</td><td>Edits after cash is reconciled</td></tr>
</tbody>
</table>

<p>For the product story rather than the engineering one, see the <a href="/case-studies/clinizy-care">Clinizy Care case study</a>.</p>

<h2>How should you store money and round tax on an invoice?</h2>
<p>As integers in paise, never as floating-point rupees. Binary floating point can&rsquo;t represent most decimal fractions exactly: in JavaScript, 0.1 + 0.2 evaluates to 0.30000000000000004. Invisible on one bill; a paisa somebody has to chase across a month of exports.</p>
<p>In Clinizy Care, every amount is stored and computed as integer paise. Conversion happens once on the way in (toPaise = Math.round(rupees &times; 100)), and formatting back to rupees happens only at the display and PDF edge.</p>
<p>Integers don&rsquo;t remove rounding; they make it explicit. The subtle case is the invoice summary. Take three lines at 5% with a taxable value of &#8377;10.10 each: each line&rsquo;s tax is 50.5 paise, rounding to 51, so the lines total 153 paise &mdash; but 5% of the slab&rsquo;s combined &#8377;30.30 is 151.5, rounding to 152. So we compute tax per line, then reconcile each GST slab one paisa at a time until line totals and slab totals agree. Nobody notices a paisa; everybody notices an invoice that doesn&rsquo;t add up.</p>

<h2>How do you decide between CGST + SGST and IGST?</h2>
<p>An intra-state supply is taxed as central plus state tax (<a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter3/section9_v1.00.html">section 9 of the CGST Act</a>); an inter-state supply attracts integrated tax (<a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_IGST_Act/active/chapteriii/section5_v1.00.html">section 5 of the IGST Act</a>). <a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_IGST_Act/active/chapteriv/section7_v1.00.html">Sections 7</a> and <a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_IGST_Act/active/chapteriv/section8_v1.00.html">8 of the IGST Act</a> classify a supply by comparing the supplier&rsquo;s location with the place of supply. And according to the <a href="https://gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/Registration_under_GST_Law_new.pdf">GST Council&rsquo;s guide to registration</a>, a GSTIN&rsquo;s first two digits are the state code.</p>
<p>Our rule compares the clinic&rsquo;s GSTIN state code with the patient&rsquo;s address state. Different states means IGST. Same state means a split, which is where naive code goes wrong: rounding tax / 2 for each half turns a 2,701-paisa tax into 1,351 + 1,351. We compute CGST = round(tax / 2) and SGST = tax &minus; CGST, giving 1,351 + 1,350, so the halves always add back to the exact tax.</p>
<p>If the patient&rsquo;s state is missing, we default to intra-state &mdash; a deliberate, documented choice that matches the statutory fallback for goods. Under <a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_IGST_Act/active/chapterv/section10_v1.00.html">section 10(1)(ca) of the IGST Act</a>, in force since 1 October 2023 according to <a href="https://gstcouncil.gov.in/sites/default/files/2024-09/circular-no-209-03-2024.pdf">CBIC Circular No. 209/3/2024-GST</a>, goods supplied to an unregistered person are placed at the address recorded on the invoice, or the supplier&rsquo;s location if none is recorded. Services follow <a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_IGST_Act/active/chapterv/section12_v1.00.html">section 12 of the IGST Act</a>, where some, including health services, turn on where the service is performed. If you build this, keep place of supply in one tested function with an explicit branch per supply type, and have your CA sign off on each.</p>
<pre><code>// Simplified for illustration; not production code
function splitTax(taxPaise: number, clinicGstin: string, patientState?: string) {
  const clinicState = clinicGstin.slice(0, 2);
  if (patientState &amp;&amp; patientState !== clinicState) {
    return { igst: taxPaise, cgst: 0, sgst: 0 };
  }
  const cgst = Math.round(taxPaise / 2); // missing state: intra-state
  return { igst: 0, cgst, sgst: taxPaise - cgst };
}</code></pre>

[CTA]

<h2>Why should GST rates be data, not code?</h2>
<p>Because rates change, and one bill can carry several. Under entry 74 of <a href="https://cbic-gst.gov.in/hindi/pdf/central-tax-rate/Notification12-CGST.pdf">Notification No. 12/2017-Central Tax (Rate)</a>, &ldquo;health care services by a clinical establishment, an authorised medical practitioner or para-medics&rdquo; are taxed at nil &mdash; but the notification&rsquo;s definition of health care services excludes hair transplant and cosmetic or plastic surgery, unless done to restore or reconstruct anatomy or functions affected by congenital defects, developmental abnormalities, injury or trauma. &ldquo;Services are exempt&rdquo; isn&rsquo;t a rule you can hard-code; it&rsquo;s a property of each service.</p>
<p>In Clinizy Care, consultations are billed at 0%, and the tax rate is attached to the product or service master: inventory items carry HSN codes, services carry SAC codes, and front-desk staff never type a rate by hand. That principle sits at the centre of Clinizy Care&rsquo;s <a href="https://clinizy.in/gst-billing-software-for-clinics">GST billing software for clinics</a>, because manual GST entry on a busy counter is where errors creep in.</p>
<p>Then the rates move. At its 56th meeting, the GST Council recommended replacing the four-tier structure with a standard rate of 18% and a merit rate of 5%, plus a 40% de-merit rate for a select few goods and services, effective 22 September 2025 for services and most goods, according to <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555">PIB&rsquo;s release on the Council&rsquo;s recommendations</a>. PIB&rsquo;s <a href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/sep/doc202594628401.pdf">backgrounder on the reforms</a> describes this as removing the earlier 12% and 28% rates. For healthcare, the release lists 33 lifesaving drugs moving from 12% to nil, three more from 5% to nil, all other drugs and medicines from 12% to 5%, and supplies such as bandages, diagnostic kits and glucometers from 12% to 5%.</p>
<p>Now picture a codebase with a hard-coded list of rates, a validator that rejects other rates, or a slab summary with fixed columns: each needs a code change and a deploy. With the rate on the master, a rate change is a master-data edit, and the slab summary derives from whatever rates are on the lines. The corollary: a bill should keep the rate it was billed at, so editing the master never rewrites history.</p>
<p>Tax identity is data too. <a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter7/section32_v1.00.html">Section 32 of the CGST Act</a> says a person who isn&rsquo;t registered shall not collect any amount by way of tax, so when a clinic has no GSTIN, Clinizy Care forces every line to 0% and locks GST entry. That rule once bit us from the other side: the clinic&rsquo;s GSTIN wasn&rsquo;t carried into the signed-in session context, so GST-registered clinics briefly couldn&rsquo;t bill with GST. The lesson: read tax identity from the source of truth, not from a cached session.</p>

<h2>How do you get the taxable value right for MRP pricing and discounts?</h2>
<h3>MRP-inclusive medicines</h3>
<p>Pharmacy lines run backwards. Under the Legal Metrology (Packaged Commodities) Rules, 2011, pre-packaged goods declare a Maximum Retail Price inclusive of all taxes, as <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=1594225">PIB has summarised</a>. The price is fixed; the tax is carved out of it.</p>
<p>We treat MRP as GST-inclusive: taxable = round(MRP / (1 + rate)), then GST = MRP &minus; taxable. The subtraction matters. Computing tax forward can overshoot: for a &#8377;40 MRP at 5%, taxable rounds to 3,810 paise, and 5% of that is 190.5, rounding to 191 &mdash; &#8377;40.01 in total, a paisa above MRP. Subtraction gives 190 paise, so taxable plus GST equals MRP by construction and a sale never exceeds MRP.</p>
<h3>Bill-level discounts</h3>
<p><a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter4/section15_v1.00.html">Section 15(3)(a) of the CGST Act</a> excludes from the value of supply a discount given before or at the time of supply if it&rsquo;s recorded on the invoice, and <a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter6/rule46_v1.00.html">rule 46 of the CGST Rules</a> requires the invoice to show taxable value &ldquo;taking into account discount or abatement, if any&rdquo;.</p>
<p>A bill-level discount is harder than a line discount because lines carry different rates. We allocate it pro-rata across lines before tax, and the last line absorbs any remainder: &#8377;100 over three equal lines becomes 3,333, 3,333 and 3,334 paise. Where the discount lands changes the tax. On a &#8377;1,000 bill with a &#8377;500 exempt consultation and a &#8377;500 line at 18%, a pro-rata &#8377;100 discount cuts the taxable line to &#8377;450 and its tax to &#8377;81.</p>
<p>To be straight about it: an earlier version of our engine calculated tax on the pre-discount value &mdash; &#8377;90 instead of &#8377;81 in that example. An internal audit caught it, and we fixed it.</p>

<h2>How should invoice numbers, dates and financial years work?</h2>
<p><a href="https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter6/rule46_v1.00.html">Rule 46(b)</a> requires an invoice serial number that is unique for a financial year. The engineering corollary: never count existing bills and add one, because two people billing at the same moment read the same count.</p>
<p>In Clinizy Care, bill numbers are per clinic and per IST calendar month (YYYYMM-NNNN), generated by an atomic counter inside the same MongoDB transaction that creates the bill, so the counter and the bill commit or roll back together. The GST invoice number &mdash; GSTIN, financial year and bill number &mdash; is assigned only when the bill is finalized. Per-clinic counters are one place tenancy shows up in billing; we covered the wider design in <a href="/blog/how-we-built-multi-tenant-hms-indian-clinics">how we built a multi-tenant HMS for Indian clinics</a>.</p>
<p>Dates are the other half. Midnight in India is 18:30 UTC, so for five and a half hours the server&rsquo;s UTC clock still reads the previous day. An earlier version of our engine used UTC, so bills raised in that window could land on the wrong day &mdash; and on the night of 31 March, in the wrong financial year, the very unit rule 46 scopes invoice numbers to. We now compute the financial year and every day and month bucket explicitly in IST.</p>

[CTA]

<h2>What should happen after a bill is finalized?</h2>
<p>Nothing that changes it. Finalized bills in Clinizy Care can&rsquo;t be edited. Cancelling is an atomic, race-safe void that computes the refund due from the live amount paid, not from a figure that may have gone stale on someone&rsquo;s screen. Refunds are recorded on the bill and feed the collections and refund reports.</p>
<p>Payments arrive as cash, UPI, card, netbanking and partial payments. The time-based guardrail is a day-close lock, which stops edits to a day once its cash is reconciled, and Clinizy Care&rsquo;s day-end auto-reconciliation automation closes the day with a collection summary.</p>
<p>PDF invoices are rendered by a background worker with a UPI payment QR code, and a content fingerprint re-renders a stored PDF if the bill changed. Clinic-branded PDFs are a Pro-plan feature in <a href="https://clinizy.in/pricing">Clinizy Care&rsquo;s plans</a>, and accountants get a Tally XML export. Bills also carry patient names and addresses; our <a href="/blog/dpdp-act-health-tech-builders">DPDP Act guide for health-tech builders</a> covers that side.</p>

<h2>The honest takeaway</h2>
<p>None of this needed clever maths. It needed firm decisions made early &mdash; integers for money, rates on the master, one function for place of supply, taxable value before tax, IST for dates, immutability after finalization &mdash; and the discipline to hold them. The bugs in this post, from pre-discount tax to UTC day buckets to a GSTIN missing from the session, all came from computing with the wrong input, not from misreading the law.</p>
<p>If you&rsquo;re building invoicing for Indian healthcare, or any Indian B2C billing, that&rsquo;s the work of our <a href="/services/ai-native-software-engineering">AI-native software engineering</a> practice, and our <a href="/industries/healthcare">healthcare software engineering</a> page covers what we build for clinics and hospitals. To see the billing engine in context, read <a href="/products/clinizy-care">how we built Clinizy Care</a>.</p>`,
};

export default post;
