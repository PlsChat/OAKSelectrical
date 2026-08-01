# Oaks Electrical & Renewables — website

Static site. No build step, no dependencies. Open `index.html` in a browser and it works.

```
index.html                              home page
supermarket-shop-fitout.html            sector page
temporary-power-supplies-schools.html   sector page
insurance-electrical-work.html          sector page
solar-pv-ev-charging.html               sector page
fire-alarms-emergency-lighting.html     sector page
privacy.html                            privacy notice
gallery.js      THE PHOTO LISTS — edit this to change which photos appear where
assets/photos/  100 optimised photos, photo-000.jpg to photo-099.jpg
styles.css      all styling — brand colours are the CSS variables at the top
script.js       mobile menu and copyright year
assets/         logo (transparent), reversed logo for dark backgrounds, favicon
CNAME           tells GitHub Pages the site lives at oakselectrical.net
robots.txt      search engine instructions
sitemap.xml     page list for search engines
.nojekyll       stops GitHub trying to process the files as a blog
```

---

## 1. Replace the placeholders before publishing

Search and replace across `index.html` and `privacy.html`:

| Find | Replace with |
|---|---|
| `01234 567 890` | your phone number (also in the `tel:01234567890` links — no spaces there) |
| `enquiries@oakselectrical.net` | your email |
| `Unit 0, Example Way` | address line 1 |
| `Town, County, AB1 2CD` | address line 2 and postcode |
| `00000000` | company registration number |
| `GB000000000` | VAT number |
| `YOUR_FORM_ID` | your Formspree form ID (see step 3) |

Then check two things:

- **Accreditation badges.** In the Compliance section there's a row: NICEIC, ECA, CHAS, Constructionline, SafeContractor. Delete any you don't actually hold — an unearned badge is a complaint waiting to happen.
- **The Morrisons mention.** It appears twice (services card and the fit-out section). Worth confirming you're allowed to name them before it goes live. Don't add their logo — that needs written permission.

## 2. Put it on GitHub Pages

The repo is already created: **https://github.com/PlsChat/OAKSelectrical**

Note: `assets/photos/` is not in this folder. GitHub's browser uploader only takes 100 files
at a time and the photo set is 200, so photos ship separately once they've been chosen.

```bash
cd /path/to/this/folder
git init
git add .
git commit -m "Oaks Electrical website"
git branch -M main
git remote add origin https://github.com/PlsChat/OAKSelectrical.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**

Live within a minute or two at `https://plschat.github.io/OAKSelectrical/`.

No command line? On a new empty repo, click **"uploading an existing file"** and drag in the
contents of this folder. `.nojekyll` is hidden — Cmd+Shift+. on Mac, "Hidden items" in the
View tab on Windows. The site still works without it.

### Point oakselectrical.net at it

The `CNAME` file is already in this folder, so GitHub picks the domain up automatically.
Check it landed under **Settings → Pages → Custom domain** after the first deploy.

At your registrar, add these DNS records:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | plschat.github.io |

Delete any existing A record on `@` first, or they'll conflict. Leave MX records alone —
those are your email and nothing here touches them.

DNS usually takes 10–30 minutes, occasionally up to 24 hours. Once GitHub shows the domain
as verified, tick **Enforce HTTPS** in Settings → Pages. That box may be greyed out for an
hour or so while the certificate is issued — that's normal, come back to it.

## 3. Make the enquiry form work

GitHub Pages can't run server code, so the form needs a third-party handler.
[Formspree](https://formspree.io) has a free tier:

1. Sign up, create a form, point it at your email.
2. Copy the form ID from the endpoint they give you.
3. Replace `YOUR_FORM_ID` in `index.html`.

Until that's done the form fails on submit. The phone number and email still work, so it's
not fatal, but don't leave it.

## 4. Editing the design

Brand colours are at the top of `styles.css`:

```css
--green:#193117;   /* logo green */
--brass:#93803F;   /* logo wordmark gold, darkened for contrast on white */
--live:#FFC421;    /* the lightning bolt — accents and primary buttons */
--bg:#FBFBF9;      /* page background */
--r:14px;          /* corner radius on cards */
```

Change those and the whole site follows.

Adding a service is a copy-paste job: duplicate one of the `<section class="sec" id="...">`
blocks, change the heading, the paragraph and the `<li>` items.

## 5. Adding photos to the sector pages

Open `gallery.js`. At the top there are five lists — `fitout`, `temporary`, `insurance`,
`renewables`, `firealarms`. Add a photo like this:

```js
  fitout: [
    ["photo-004.jpg", "New distribution board, overnight supermarket refit"],
    ["photo-011.jpg", "Containment run above the ceiling grid"]
  ],
```

The caption shows under the photo and doubles as the alt text, so write something
descriptive — it helps both search rankings and screen readers. Six to nine photos per page
is about right; more than twelve and people stop scrolling.

A list left empty just hides that page's gallery section. Nothing breaks.

Every photo in `assets/photos/` has two versions: `photo-000.jpg` (full size, opens in the
lightbox) and `th-photo-000.jpg` (thumbnail, shown in the grid). You only ever name the
full-size one — the thumbnail is found automatically.

To add new photos later, drop them in `assets/photos/` following the same naming pattern and
save a thumbnail version prefixed `th-`. Keep the long edge under about 1500px so pages stay
fast.

## Notes

- `assets/oaks-logo-reversed.png` was generated by recolouring the dark green to off-white
  so the logo works on the dark footer. It's fine, but if you have a designer, ask them for
  a proper reversed version.
- No cookies, no analytics, no tracking. If you add Google Analytics later you'll need a
  cookie banner and an update to `privacy.html`.
