# Feature: Dedicated Contact Page

A dedicated landing page at `/contact` designed for direct traffic, SEO, and clear business communication.

## Overview
The Contact Page provides a comprehensive point of contact for users, offering more context than the site-wide modal. It includes business credentials like email, response times, and office information.

## Architecture

### 1. Refactored Form (`src/components/ContactForm.tsx`)
The core booking logic has been extracted into a standalone component.
- **State Management**: Handles validation, phone input, and submission logic internally.
- **Versatility**: Used by both `ContactModal.tsx` and the inline `/contact` page.
- **Props**:
  - `isModal`: Adjusts behavior (e.g., hiding or showing additional buttons).
  - `onSuccess`: Callback for parent components to react to successful submissions.

### 2. Contact Page (`src/app/contact/page.tsx`)
A static page that leverages the inline form.
- **Business Identity**: Prominently displays `hello@brynex.in`.
- **Engagement**: Sets clear expectations with response time info ("4-6 business hours").
- **SEO**: Custom metadata optimized for conversion-intent keywords.

## User Flow
1. **Direct Access**: Users land on `/contact` via SERPs or the "Contact" link in the nav/footer.
2. **Contextual Access**: Users on other pages can still trigger the `ContactModal` via "Start a project" buttons, maintaining a frictionless UX.
3. **Submission**: Both entry points use the same backend API (`/api/contact`).

## Design
- **Inline vs. Modal**: The inline version has more breathing room, while the modal version is compact and focused on immediate action.
- **Responsive**: Fully optimized for mobile-first engagement.
