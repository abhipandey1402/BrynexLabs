# Brynex Labs — Automated Booking System Plan

> End-to-end plan for letting visitors book a consultation slot directly, with
> meeting links generated and delivered automatically — integrated into the
> existing leads CRM (`/super-admin/leads`). Last updated: June 2026.

---

## Current state & the gap

The contact form collects a *requested* date/time which the team must confirm
manually ("we respond within 6 business hours"). Every manual confirmation
loop loses warm leads — especially US visitors who expect instant scheduling.
Goal: **visitor picks a real slot → calendar invite + Google Meet link sent
automatically → booking lands in our CRM pipeline with attribution.**

---

## Options compared

| Option | Monthly cost | Effort | Verdict |
|---|---|---|---|
| **Cal.com cloud (recommended)** | **$0** (Free plan, 1 user) → $15/user Teams later | ~half a day | Best balance: free, embeddable, Google Meet auto-links, webhooks + API for CRM sync, open-source escape hatch |
| Calendly | $0 very limited (1 event type) → $12/user Standard for reminders/integrations | ~half a day | Polished but paywalls the automation we need; closed ecosystem |
| Cal.com self-hosted | ~$10–20 server (free AGPL license) | 2–3 days setup + maintenance | Do later only if we want full white-label/control; same API |
| Custom build (Google Calendar API) | Google Workspace ~$7/user | 3–5 dev-days + ongoing maintenance | Full design control, books straight into MongoDB — but reinventing timezone/conflict/reminder logic; not worth it at this stage |

**Recommendation: Cal.com cloud Free plan now; revisit Teams ($15/user/mo) when
a second person takes sales calls (round-robin), and self-hosting only at scale.**

---

## Target end-to-end flow

1. Visitor clicks **"Book a Free Consultation"** (service pages, contact page, sticky CTA).
2. Embedded Cal.com widget shows real availability in the **visitor's timezone** (critical for US/India).
3. Visitor picks slot, fills short qualification fields (name, email, phone, what they're building, budget band).
4. Cal.com auto-creates the **Google Calendar event with a Google Meet link**, sends invites to both sides, and schedules **email reminders (24h + 1h before)**.
5. Cal.com **webhook fires → our `/api/bookings/webhook`** → booking saved into MongoDB as a lead (status `qualified`, kind `booking`) with the meeting link, slot time, and the same first-touch attribution (UTM/referrer/country) we already capture.
6. Admin sees the booking inside `/super-admin/leads` alongside form leads; GA4 logs a `booking_confirmed` conversion.
7. Reschedule/cancel webhooks keep the lead record in sync automatically.

No human action between "visitor interested" and "meeting on both calendars."

---

## Implementation phases

### Phase 1 — Booking live (half a day, $0)

1. Create Cal.com account with `hello@brynex.in`; connect Google Calendar (the calendar consultations should land on).
2. Event type: **"Free Discovery Call" — 30 min**, location **Google Meet** (auto-generated per booking).
   - Availability: define IST working hours **plus a US-friendly evening block** (e.g. 7–10 PM IST = morning US ET) — this matters more than any feature.
   - Buffers: 15 min after; minimum notice: 4 h; daily cap: 4 calls; rolling window: 21 days.
   - Booking questions: phone (for WhatsApp follow-up), "What are you building?" (textarea), "Budget range" (select: <$5K / $5–15K / $15–50K / $50K+ / INR options).
3. Branding: accent color `#c2410c`, hide Cal branding where the plan allows.
4. Embed on the site (`@calcom/embed-react`, ~10 KB):
   - `/contact`: tabs — "Book instantly" (embed) | "Request a callback" (existing form as fallback).
   - Service pages + StickyCTA: secondary CTA "Book a Free Call" opening the embed modal; pass `utm_*` from our stored attribution into the embed config so Cal.com records it too.
5. Reminders: Cal.com's built-in email reminder workflow (free) — 24 h and 1 h before.

### Phase 2 — CRM + analytics sync (half a day, $0)

1. Cal.com → Settings → Webhooks: subscribe `BOOKING_CREATED`, `BOOKING_RESCHEDULED`, `BOOKING_CANCELLED` to `https://brynex.in/api/bookings/webhook` with a signing secret (env: `CALCOM_WEBHOOK_SECRET`).
2. New route `src/app/api/bookings/webhook/route.ts`:
   - Verify `x-cal-signature-256` (HMAC-SHA256 of raw body with the secret).
   - Map payload → `contactStore`: name, email, phone, slot start/end, timezone, Meet URL (`payload.videoCallData.url` / location), answers (project, budget), `kind: 'booking'`, initial status `qualified`.
   - Reschedule/cancel: find by booking UID (store `bookingUid`) and update slot or set status `lost` with a note.
   - Reuse the existing Brevo notification email so the team still gets the instant "new booking" alert.
3. Extend `ContactSubmission` with optional `kind: 'form' | 'booking'`, `meetingUrl`, `bookingUid`, `slotStart`, `slotEnd`, `budgetRange` — and surface a "Join Meet" button + booking badge in `LeadsList`.
4. GA4: fire `booking_confirmed` (server-side via Measurement Protocol from the webhook, or client-side on the embed's `bookingSuccessful` event — client-side is simpler and enough).

### Phase 3 — Optimization (later, still $0)

- **Routing form** (Cal.com feature): one "Book a call" entry that routes AI-agent
  inquiries vs software vs SEO to different event types/durations.
- A/B the CTA: "Get a Custom Growth Plan" form vs "Book a call now" embed — GA4
  will show which converts better per market (we tag market on CTA clicks already).
- India flow: WhatsApp reminder via manual link is already in the CRM; automated
  WhatsApp/SMS reminders are a paid Cal.com workflow or Twilio (~$0.005/msg) — only
  add if no-show rate is a problem.

### Phase 4 — Scale triggers (when, not if)

| Trigger | Action | Cost |
|---|---|---|
| 2nd salesperson | Cal.com Teams: round-robin/collective events | $15/user/mo |
| White-label requirement | Self-host Cal.com on a VPS | ~$10–20/mo |
| High no-show rate | SMS/WhatsApp reminders (Cal.com workflow or Twilio) | ~$5–15/mo |

---

## Cost summary (first 12 months, recommended path)

| Item | Cost |
|---|---|
| Cal.com Free plan | $0 |
| Google Meet links | $0 (works with a free Gmail-connected calendar; Workspace optional) |
| Webhook endpoint + CRM sync (our code, Vercel) | $0 infra |
| Reminder emails | $0 (Cal.com built-in) |
| **Total** | **$0/month** until a second seat is needed |

---

## Env & security checklist

- `CALCOM_WEBHOOK_SECRET` in Vercel env (verify signature on every webhook; reject otherwise).
- Webhook route is public by design — it must stay outside the admin auth middleware but validate signatures strictly and rate-limit.
- The embed loads from `cal.com` — no PII leaves our stack beyond what the visitor enters into the booking (same as any scheduler).
- Keep the existing form as fallback: bookings require picking a slot; some leads still prefer "call me back."
