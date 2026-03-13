# Feature: Contact Form & API

A production-grade lead generation system with international phone support and automated email notifications.

## Overview
The contact system allows potential clients to book consultations. It includes a multi-step modal UI, client-side validation, and a secure backend API for processing requests.

## Architecture

### 1. UI Layer (`src/components/ContactModal.tsx`)
- **React Hook Form**: Used for form state management and validation.
- **International Phone Support**: Integrated `react-international-phone` for localized phone number capture.
- **Visuals**: Dark-mode optimized styling with premium transitions.

### 2. API Layer (`src/app/api/contact/route.ts`)
A Next.js Route Handler that:
- Receives POST requests with form data.
- Validates inputs (Zod schema recommended for future enhancement).
- Sends emails using **Nodemailer**.

### 3. Email Integration
- Configured via environment variables (`SMTP_HOST`, `SMTP_USER`, etc.).
- Sends HTML-formatted emails to the business inbox.

## Key Dependencies
- `react-international-phone`: For robust phone input.
- `nodemailer`: For reliable email delivery.
- `axios`: For API communication.

## Future Enhancements
- [ ] Implement Honeypot/CAPTCHA for spam prevention.
- [ ] Add Zod validation on the API side.
- [ ] Connect to a CRM (e.g., HubSpot or Pipedrive) via Webhooks.
