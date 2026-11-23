# Rakshya

Rakshya is a mobile web prototype for finding blood banks and exploring how nearby donors might respond to a blood request. It was developed for Hack-A-Sol 2026 at IIIT Naya Raipur, Open Track.

[Hosted demo](https://rakshya-app.vercel.app)

## Try the patient and donor workflow

1. Choose a patient blood group on the home page. Inspect matching red cell groups and sample facility stock.
2. Select a city or allow browser location access to recalculate straight-line distances to facilities.
3. Open **Broadcast SOS**, enter fictional patient details, and start a simulated alert.
4. Select **Simulate donor response** to view the request as a donor. Accept or decline and return to the patient dashboard to see the result.

The directory, stock levels, donor distances, and referral milestones use example data. The browser does not query e-RaktKosh or send automatic WhatsApp notifications. The share button opens a WhatsApp draft that identifies the request as a demonstration. Clinical screening and actual stock confirmation belong with the receiving blood center.

Donor registration and district imports update the roster for the current browser session. Refreshing the page resets it. The prototype applies a 90-day interval to illustrate donor filtering.

## Local development

The frontend uses React, TypeScript, Vite, Tailwind CSS, and Leaflet. Install Node.js 22 and npm, then run:

```sh
npm ci
npm run dev
```

## Production preview

```sh
npm run build
npm run preview
```

The build type-checks the application and generates a service worker for the bundled assets. After the worker finishes installing on localhost or HTTPS, the app and its sample directory can reopen offline. Map tiles, external directions, and WhatsApp sharing require a connection.
