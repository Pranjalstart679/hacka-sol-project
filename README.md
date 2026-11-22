# RakhtKhoj - Emergency Blood Discovery & Live Donor Network

Transforming e-RaktKosh into an immediate, zero-friction emergency network for patients and local donors.

Project developed for Hack-A-Sol 2026 at IIIT Naya Raipur (Open Track).
Inspired by the 1st place winner ("RakhtKhoj" by Team Raktosh) at the "Build What Moves India" public services hackathon.

## Core Problem Statement

- **UX Paralysis on e-RaktKosh:** The national portal contains records of over 2.8 million registered donors, but citizens cannot access them directly in life-or-death emergencies.
- **The Distance Dilemma:** 12% of Indian districts are over 100 km away from any functional blood bank. Traveling to distant centers takes hours during the critical golden hour.
- **Annual Deficit:** India collects ~11 million units of blood annually against a demand of ~16 million units (a 5 million unit annual deficit).
- **Mobile App Fatigue:** Requiring donors to install a standalone application fails because donors can only donate once every 90 days. Standalone apps suffer massive churn and muted notifications.

## The Solution: RakhtKhoj

RakhtKhoj operates as a lightweight, mobile-first progressive web platform coupled with instant WhatsApp dispatch.

1. **Zero-Cognitive-Load Patient Flow:**
   - Single immediate question: "What is the blood group of the patient?"
   - Instant calculation of all compatible donor blood types.
   - Proximity search of nearest blood banks with live inventory counts.
   - Immediate SOS broadcast to nearby verified donors when banks are out of stock or too far (>100 km).
2. **Mobile Web + WhatsApp Bridge:**
   - Donors receive emergency alerts directly on WhatsApp with distance, patient details, and hospital name.
   - 10-second rapid disqualification questionnaire (weight >45 kg, no recent tattoo/surgery in 6 months, healthy today).
   - Once confirmed, direct one-tap calling and messaging between patient family and donor.
3. **90-Day Cooldown Protection:**
   - Automatic suppression of donors who have donated within the last 90 days.
4. **Referral-Driven Growth (Legal Incentive Mechanism):**
   - Direct payment for blood is prohibited under Indian law (National Blood Transfusion Council regulations).
   - RakhtKhoj provides referral incentives (health checkups, certified badges) for onboarding verified donors, expanding the national supply pool ethically.

## Technical Architecture

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Logic Engines:**
  - Antigen Compatibility Engine (RBC matching rules)
  - Geolocation & Haversine Distance Calculator
  - 90-Day ICMR Donor Cooldown Filter
- **Simulators:**
  - Emergency Broadcast Dispatcher
  - Donor WhatsApp Perspective Modal (dual-device testing)
  - Referral Code Generator and Milestone Tracker

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Pranjal/Hackasol.git
cd Hackasol

# Install dependencies
npm install

# Run the local development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Team & Track Information

- **Event:** Hack-A-Sol 2026
- **Institution:** IIIT Naya Raipur
- **Track:** Open Track
