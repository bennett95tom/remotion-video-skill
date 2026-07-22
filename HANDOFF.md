# Dark D'oh Bros × Remotion — Handoff

State of this repo's video work, for whoever picks it up next (Claude Code here, Codex/
Higgsfield on the Mac side, or future-you).

## What exists right now

- `video/` — a working Remotion project, `npm install`'d and rendering clean.
  - `npm run studio` — open the interactive preview (from inside `video/`)
  - `npm run build` — renders `out/ddb-promo.mp4`
- First cut rendered: **23s, 1080×1920, black/bone/blood-red kinetic-typography promo.**
  Wordmark cold-open → strapline → 4-item menu carousel → CTA/socials outro. No photography
  or mascot art yet — it's type + code-drawn shapes only, because no real DDB image assets
  were available in this sandbox (only the *prompts* for generating them, see below).
- `higgsfield-prompts/DDB-brand-pack.md` — every locked-style prompt needed to generate the
  real canon art (Reaper Icon mascot, wordmark banner, menu posters, NFC stickers, plus new
  b-roll prompts) with exact target filenames.

## Brand rules (do not deviate)

- Palette: black `#000000` bg, bone-white `#f5f5dc` text, blood-red `#8a0303` accent only.
  No gradients, no 3D, no soft shading, no extra colors. See `video/src/constants.ts`.
- Fonts: Anton (display/wordmark), Nosifer (horror accent, used sparingly), Courier Prime
  (body/meta — this is DDB's locked "typewriter" rule). Self-hosted in `video/public/fonts/`
  — see the "why" note below.
- Strapline: **"Slice by Slice. Soul by Soul."** Never rephrase.
- Tone: punk/horror street food, Brighton, cult/ritual framing (NFC sticker hunt = "the
  cult"). Not cute, not corporate wellness.

## Why fonts are self-hosted instead of `@remotion/google-fonts`

This sandbox's headless Chrome fails TLS validation against `fonts.gstatic.com` (the
network proxy re-terminates certs with a CA Chrome doesn't trust for a freshly-downloaded
headless shell). Fix: the four required `.woff2` files were downloaded once via
`curl --cacert` and committed to `video/public/fonts/`, loaded locally through
`@remotion/fonts`. If you're on a normal machine (e.g. the Mac side) this constraint
doesn't apply — `@remotion/google-fonts` would work fine there too, but there's no reason
to switch back since the self-hosted version is also faster and works offline.

## Asset placeholder map — what to swap once Higgsfield generates the real art

Everything currently renders with code-drawn placeholders (a simple flat skull SVG in
`video/src/components/Background.tsx`, `SkullMark`). To upgrade:

| Slot | Current placeholder | Real asset (from prompt pack) | Where used |
|---|---|---|---|
| Mascot | `<SkullMark />` (inline SVG) | `video/public/reaper-icon.png` | `scenes/01-Wordmark.tsx`, `scenes/03-MenuHeroes.tsx`, `scenes/04-CTA.tsx` |
| Hero banner | — (not used yet) | `video/public/wordmark-lockup.png` | could replace the type-only cold open in `01-Wordmark.tsx` |
| Menu posters (×4) | — (cards are text-only) | `video/public/poster-*.png` (see prompt pack §3) | `scenes/03-MenuHeroes.tsx` `MenuCard` |
| B-roll clips | — | `video/public/broll/*.mp4` | not wired yet — would need a new scene or `<Video>` layer |

To swap: replace `<SkullMark size={...} />` with
`<Img src={staticFile("reaper-icon.png")} style={{ width: ..., height: ... }} />` (import
`Img`, `staticFile` from `"remotion"`). Same pattern for the menu poster cards.

## Next steps

1. Run the prompts in `higgsfield-prompts/DDB-brand-pack.md` in Higgsfield, starting with
   the Reaper Icon mascot sheet (everything else keys off it).
2. Drop finished exports into `video/public/` using the exact filenames in the table above.
3. Swap the placeholder components for `<Img>`/`<Video>` calls per scene.
4. Re-render: `cd video && npm run build`.
5. Pick a music track and wire `<Audio>` per `references/music-sync.md` — the frame budget
   in `video/src/constants.ts` (`SCENE_FRAMES`, `TRANSITION_FRAMES`) is built to be easy to
   re-time against a track's beat once one is chosen.
