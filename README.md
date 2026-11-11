# teri marketing — Hugo

A Hugo version of the existing React marketing site, retaining its emerald and gold design, assets, responsive layouts, English and Amharic copy, FAQ, mobile navigation, and scroll animations. No React or Node server is needed in production.

## Run

Install Hugo **0.139.4 or newer**, then:

```sh
cd marketing-hugo
hugo server
```

Open http://localhost:1313/. English is at `/`; Amharic is at `/am/`.

## Build and host

```sh
hugo --minify
```

Deploy `public/` to any static host. Set your production URL when building:

```sh
hugo --minify --baseURL https://example.com/
```

The compiled CSS is committed, so ordinary Hugo builds do not need npm or the original `marketing-site/` directory. Keep the sibling `../brand/` directory in the checkout: Hugo mounts its images, logos, favicons, fonts, and tokens directly under `/brand/`. Deploy only the resulting `public/` output. Configure your host to serve `404.html` for missing URLs rather than rewriting every URL to the homepage.

## Edit

- `data/en.json`, `data/am.json`: translated copy outside pricing. Keep the same keys and array order in both files.
- `content/sections/pricing.en.md`, `content/sections/pricing.am.md`: pricing headings and plans.
- `layouts/partials/`: shared sections and illustrated feature previews. Repeated cards are explicit markup; update their indexes if adding or removing data entries.
- `layouts/_default/baseof.html`: metadata, fonts, and page shell.
- `../brand/assets/`: canonical hero images, botanical ornaments, and gallery photos.
- `../brand/logo/`: outlined wordmark and favicon variants.
- `../brand/fonts/`: local Righteous wordmark face.
- `../brand/tokens/tokens.css`: shared design tokens, loaded directly without copying.
- `static/js/site.js`: menu, FAQ, language links, animations, and CTA feedback.
- `assets/css/main.css`, `tailwind.config.ts`: styles and design tokens.

After changing Tailwind classes or CSS, regenerate the stylesheet:

```sh
npm ci
npm run css
# Or keep this running alongside hugo server:
npm run css:watch
```

`npm run build` regenerates CSS and builds Hugo. The typography follows `../brand/fonts/README.md`; text faces use its Google Fonts embed and Righteous is served from the brand font directory. Language links preserve the current section; legacy `?lang=en` and `?lang=am` links are supported. Language URLs determine page content, including with JavaScript disabled.

The final Get started button retains the source site's informational toast. It does not submit a signup or create an account. Application functionality remains in the existing Next.js app.

## Pricing configuration

Edit `content/sections/pricing.en.md` for English and `content/sections/pricing.am.md` for Amharic. The TOML front matter between `+++` markers controls the section:

- `[pricing]`: `heading`, `headingscript` (accent text), `subtitle`, and `badge`.
- Each `[[pricing.plans]]`: `name`, `price`, `period`, `description`, `features`, `cta`, `href`, and `featured`.
- Add or remove plan entries and feature strings freely. `featured = true` applies the emerald card style and badge.

These files configure the homepage only; Hugo does not publish separate pricing pages. The existing subtitle setting is available but is not displayed by the current design. Changes appear automatically with `hugo server`.
# marketing-site
