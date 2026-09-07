# Final merged-build QA

These are open checks. Do not mark them complete from source assertions or old screenshots.

Check all six routes and branded 404 at widths **320, 375, 768, 1024, 1440 and 1920**. Include **375 x 812** and **1440 x 900**, homepage breakpoint boundaries **700/701** and **1000/1001**, short desktop windows around **700 px high**, **200% browser zoom** and **200% text resizing**. Use a real browser and at least one touch device.

| Area | Expected result |
| --- | --- |
| All routes | No sideways scroll, clipped words, text collisions, missing assets, console or hydration errors. One h1 and working skip link. |
| Hero top | Factory art, headline and both actions visible, readable and clear of the header. |
| Desktop scroll | Wide/tall scene pins; factory camera follows scroll continuously; copy stays stable; scene releases naturally into workflows. |
| Short viewport/enlarged copy | Natural document flow replaces pinning when the copy cannot fit. All actions remain reachable. |
| Mobile hero | Independent narrow composition and reachable actions, without desktop sticky trapping. |
| Reduced motion | No camera push, pointer parallax or entrance animation. Test changing the preference while open. |
| Four tab groups | Test all 18 options. Each group keeps the same outer panel height at a fixed viewport, with its longest content readable. Refresh resets to option one. |
| Keyboard tabs | Arrows, Home and End select correctly. Only active tab is in page tab order; hidden panels cannot receive focus. |
| Mobile tab controls | Stay near results and below the header, without covering other text. |
| FAQs | One open disclosure; keyboard summary and visible focus. |
| Mobile menus | Close button, Escape, backdrop and route links work. Dismissal restores opener focus; modal background is inert. |
| Contact dialog | Opens from every home action, restores focus on dismissal, shows hello mailbox and disclosure. No PII fields or submission. |
| Menu to contact | Contact opens after menu closes, with focus inside the new dialog. |
| Navigation | Home, About, diagnostic, Steward, Contact, Privacy and 404 recovery all work locally. |
| Accessibility | Inspect small text over the moving artwork, focus contrast, mobile target sizes and screen-reader labels. |

On the authorized Netlify draft, run the preserved live verifier. Check noindex, production canonicals, exact headers, branded HTTP 404 and zero runtime functions. Verify `/api/intake-form` and `/.netlify/functions/intake-form` with GET, synthetic nonpersonal POST, bare OPTIONS and the full preflight-origin matrix. A local server does not prove provider behavior.

Record browser/version, viewport, route, outcome and fixes against the final merged commit. Inspect network activity for remote runtime requests and missing local assets. Yves's review and the team's security/deployment sign-off remain the release decision.
