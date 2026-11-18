# ALING · Portfolio

Personal portfolio of **M Regi Agustian Heryandi** ("ALING"). Next.js 16 + Tailwind CSS 4, no backend.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Editing content

All content lives in `src/data/`:

| File | What |
| --- | --- |
| `profile.ts` | Name, slogan, contact, about text, experience |
| `projects.ts` | Projects: description, features, screenshot, links |
| `skills.tsx` | Skills shown in the sliding rows |

### Adding project screenshots and links

1. Put the image in `public/projects/`, e.g. `public/projects/clinic-information-system.png` (16:10 works best).
2. In `src/data/projects.ts`, set it on the project:

```ts
screenshot: "/projects/clinic-information-system.png",
demo: "https://your-live-site.com",
repo: "https://github.com/MRegiAgustianH/repo-name",
```

Buttons only render for links that are set.

## Deploy (GitHub → Vercel)

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/MRegiAgustianH/<repo-name>.git
git push -u origin main
```

Then go to https://vercel.com/new, import the repository and click **Deploy**. Vercel detects Next.js automatically. Every push to `main` redeploys.

Optional: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://aling.vercel.app`) in Vercel → Settings → Environment Variables for correct social preview URLs.

## Notes

- GitHub contributions are fetched in the browser from the public `github-contributions-api.jogruber.de` service. If it is unavailable, the section shows a link to the GitHub profile.
- The design references in `template-*.md` (React Bits Pro) require a paid license, so the background, 404, profile and project log are custom implementations inspired by them.
