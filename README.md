# Mitrah · Therapy & Mental Wellbeing

A calm, pastel-themed website for a mental health therapy practice, built with
React (Vite) + Tailwind CSS + React Router.

## Pages
- **Home** (`/`) — hero, services, quote, call-to-action
- **About** (`/about`) — therapist bio, approach, values
- **What to Expect** (`/what-to-expect`) — process steps + FAQ
- **Enquiry** (`/enquiry`) — contact form that emails submissions

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Enquiry form (email setup)

Submissions are emailed via [Web3Forms](https://web3forms.com) — no backend needed.

1. Get a free access key at https://web3forms.com (enter your email, no signup).
2. Create a `.env` file in the project root:

   ```bash
   VITE_WEB3FORMS_KEY=your-access-key-here
   ```

3. Restart the dev server. Submissions now arrive in that email inbox.

> Without a key, the form still shows the success screen but does not send.

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deploy (Netlify)

This repo includes `netlify.toml` and `public/_redirects` (SPA routing).

**Option A — Connect Git (recommended)**
1. Push this repo to GitHub.
2. In Netlify: *Add new site → Import from Git* → pick this repo.
3. Add an environment variable: `VITE_WEB3FORMS_KEY` = your key.
4. Deploy. Auto-deploys on every push.

**Option B — Drag & drop**
1. Add `.env` key, then `npm run build`.
2. Drag the `dist/` folder onto https://app.netlify.com/drop

### Custom domain (mitrahofficial.com)
In Netlify → *Domain settings → Add a domain* → enter the domain, then add the
DNS records Netlify provides at your domain registrar. HTTPS is automatic.
