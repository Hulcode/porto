# Portfolio

This portfolio is built with Next.js, React, and Tailwind CSS 3.

## Getting started

Install dependencies and start the Next.js development server:

```sh
npm install
npm run dev
```

Open http://localhost:3000 to view the site. Use `npm run build` to create a
production build, `npm start` to serve it, and `npm run lint` to run ESLint.

## EmailJS configuration

The contact form uses EmailJS. The existing `NEXT_PUBLIC_EMAILJS_*` variables
in `.env` continue to work; they can also be moved to `.env.local`:

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Admin dashboard

The portfolio content is stored in MongoDB and initialized with the current
portfolio on first load. Sign in at `/admin/login` to edit the hero, about,
projects, experience, learning, contact, navigation, and footer content. Image
uploads are sent directly to Cloudinary using short-lived server-generated
signatures; only image URLs are stored with the portfolio content in MongoDB.

Fill in the private values in the local `.env.local` file (a blank template is
included in the workspace, and `.env.local.example` documents the required
keys).
Rotate any credentials previously shared in chat before using them. Set
`MONGODB_URI`, `MONGODB_DB`, all three Cloudinary variables, and a single admin
username, password, and random session secret (at least 32 characters). Never
commit `.env.local` or put these private credentials in `NEXT_PUBLIC_*`
variables. Generate a session secret with
`node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`.
