# Assets

## botanicals/

Gold single-weight line art: peonies, sprigs, a wreath and a frame. No fills, no shading. Drawn in a pale gold; the site pushes them to brand gold with:

```css
.tint-gold { filter: sepia(1) saturate(3) hue-rotate(-10deg) brightness(0.95); }
```

Rules: corners and edges only, 40 to 80 percent opacity, always behind content, never over text or faces, one per section. Mirror or rotate a corner to fit (`-scale-x-100`, `rotate-180`). `botanical-frame.png` is used as a mask for side ornaments, not as an image.

| File | Use |
|---|---|
| `botanical-corner.png` | Section and hero corners; the arch's top-right flourish |
| `botanical-sprig.png` | Small floating accent near headings |
| `botanical-wreath.png` | Circular framing for a monogram or a single photo |
| `botanical-frame.png` | Mask source for tall side ornaments |

These are the canonical originals. `marketing-hugo/` mounts this directory directly through Hugo; it does not keep its own copies. The older React marketing site still has local copies.

## marketing/

Hero product mockups showing the desktop site, phone view and printed card for a sample couple (Natan & Beti, bilingual). Use inside the arch or as a floating composition with the `float-soft` drift. Do not crop them into hard rectangles.

## marketing/gallery/

Sample wedding and invitation photos used in the marketing gallery preview. Consolidated from the existing marketing site so Hugo references the shared brand asset directory for every image.
