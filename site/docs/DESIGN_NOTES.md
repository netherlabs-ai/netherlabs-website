# Design intent

The opening retains the cinematic factory artwork and scroll camera. It is local conceptual artwork, not video or proof of client installations. One image plane, shading and protected copy form the scene.

Desktop camera motion and exit shading follow document position. Wide/tall viewports pin only when the copy fits. Fine pointers add restrained movement. Short windows and enlarged copy use natural height. Mobile has a separate composition; reduced motion removes the camera and entrance animation. These fallbacks are intentional.

Do not add overflow clipping, transforms or paint containment to an ancestor of the sticky hero. Keep `cinema` styles scoped, and do not flatten the opening to a static image during integration.

The buyer journey moves from business friction to concrete workflows, diagnostic deliverables, the method, NetherForge and the people behind the work. Diagnostic availability, separately scoped implementation and NetherForge's development status remain distinct. Examples are illustrative, not published client results.

The palette is ink `#080d0f`, paper `#f3f4f0` and mint `#a3f2d5`, with local Geist and Georgia emphasis. Internal routes share these materials and retain their substantive content.

Tab panels share one intrinsic CSS grid cell. Inactive panels still contribute to sizing while hidden and inert, avoiding jumps without fixed heights that clip copy. Do not change them to conditional mounting or display-none without equivalent stable sizing. Never attach entrance visibility state to tabs or buttons that rerender on interaction.

| Asset | Purpose |
| --- | --- |
| `hero-factory-enhanced-1920.webp` | Main factory image and social artwork. |
| `hero-factory-enhanced-3840.webp` | High-resolution desktop source. |
| `hero-factory-enhanced-mobile.webp` | Narrow composition. |
| `fonts/geist-sans.woff2` | Local variable sans font. |
| `fonts/geist-mono.woff2` | Local variable mono font. |
| `favicon.svg` | Existing favicon. |

All assets remain under `public/` and match the previous handoff. No new image, animation library, remote embed or runtime service is required.
