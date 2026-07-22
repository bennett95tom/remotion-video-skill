# Dark D'oh Bros — Higgsfield Prompt Pack

Ready-to-paste prompts for generating the DDB image/video canon in Higgsfield. Compiled
from the brand's existing locked-style prompts (found in the DDB Drive folder) plus new
video/b-roll prompts for the Remotion promo pipeline in `video/`.

**Locked style, every asset, no exceptions:** black background, bone-white (#f5f5dc) linework,
blood-red (#8a0303) accents only. Vintage horror screenprint / tattoo-flash sticker art. Thick
outlines, distressed texture, flat shapes. **No gradients, no 3D, no soft shading, no glossy
effects, no extra colors, no realism.** Demonic Cuphead / 1930s-cartoon energy, punk zine grit.

When a prompt below produces a keeper, save it to `video/public/` under the exact filename
noted — the Remotion scenes are wired to pick these up automatically once a matching
`<Img>` swap is made (see `HANDOFF.md` at repo root for which scene reads which file).

---

## 1. Mascot — Reaper Icon (character sheet, do this first)

Everything else keys off this. Lock it before generating anything downstream.

> Create a locked mascot character sheet for the Reaper Icon. Keep the same silhouette, face,
> cloak shape, hands, and texture every time. Use a black background with bone-colored artwork
> and blood-red accents only. Make it look like vintage horror screenprint sticker art with
> thick outlines, distressed texture, flat shapes, and no gradients. Show a hooded skull reaper
> with cloak silhouette, bony hands, flames, and small skull motifs, holding a sad melting pizza
> slice. Only change pose, angle, or expression when requested — do not redesign the character.
> No realism, no soft shading, no glossy effects, no extra colors.

Save as: `video/public/reaper-icon.png` (transparent or black background, square, ≥1024×1024)

---

## 2. Wordmark lockup (hero banner)

> A bold, gritty red-and-black vintage tattoo-style illustration in demonic Cuphead / 1930s
> animation style. Top banner reads "DARK D'OH BRO'S" in distressed, bold type, filling the
> arch. Main artwork: Grim Reaper in a hood, melting pizza slice in one hand, knife in the
> other, surrounded by flames and skulls. Bottom banner reads "SLICE BY SLICE, SOUL BY SOUL!"
> in matching distressed, bold, cracked font mirroring the top banner's style. Keep everything
> in the same grunge, punk-zine, dark horror vibe. NO gradients, NO 3D — just flat, sharp,
> high-contrast ink. Make the banner text look naturally integrated, not like a cheap sticker.

Save as: `video/public/wordmark-lockup.png` (vertical, ≥1080×1920 to match the video canvas)

---

## 3. Menu hero posters (the 4 items in the Remotion carousel)

Each follows the same "creature + banner" formula. Keep the Reaper Icon's world energy
(same ink weight, same palette) even though these are separate characters.

**Hexed Margarita** → `video/public/poster-hexed-margarita.png`
> A bold, gritty red-and-black vintage tattoo-style illustration of a levitating melted cheese
> slice with basil-leaf eyes, vintage horror screenprint style, black background, bone and
> blood-red only, thick outlines, no gradients. Banner text: "HEXED MARGARITA"

**Burning Desire** → `video/public/poster-burning-desire.png`
> A flaming pepperoni slice demon hurling hot-sauce-bottle grenades, same locked screenprint
> style, black background, bone and blood-red only, thick outlines, no gradients. Banner text:
> "BURNING DESIRE"

**The Devourer** → `video/public/poster-the-devourer.png`
> A hot dog slice beast with mustard tears and a crispy-onion chain, same locked screenprint
> style, black background, bone and blood-red only, thick outlines, no gradients. Banner text:
> "THE DEVOURER"

**Sweet Sweet Long Boy** → `video/public/poster-sweet-sweet-long-boy.png`
> A long vegan donut with icing fangs and sprinkle skulls, holding a piping bag, same locked
> screenprint style, black background, bone and blood-red only, thick outlines, no gradients.
> Banner text: "SWEET SWEET LONG BOY"

### Bench (extra menu characters already scripted, for future carousel expansion)
- The Ninth Circle — floating cursed slice surrounded by orbiting toppings.
- Satanic Skins — baked potato skin with barbed-wire arms and fryer scars.
- Satan's Tator Tots — smashed baby potatoes with gator grins and spiked collars.
- Long Boy – OG Glaze / Hexed / Unholy Dip / Bloody Mess / Cookie Possession / Peanut Bastard —
  same Long Boy base character, swap glaze/topping per the flavour name.
- £2 Slice Night — stressed slice dodging demon hands.
- Wasted Wednesday — two demon slices clinking beer cans in a pit.
- Feed the Greed (buy 3 slices promo) — three-eyed slice hugging a Long Boy donut.

(All follow the same "[creature description]. Banner: [NAME]" formula — reuse the locked
style line from section 1 if Higgsfield doesn't retain it between generations.)

---

## 4. NFC sticker art (for the in-store/street campaign, not the video — included for completeness)

**Skull Summon** — Gritty skull, flames, black & bone, demonic Cuphead style, 2" round sticker.
Text: "SCAN FOR FATE"

**Cursed Slice** — Creepy pizza slice, cracked eyes, red flames, grunge zine style.
Text: "TAP THE CURSE"

**Cult Initiation** — Occult sigil, pentagram, grunge, red & black, bold as hell.
Text: "JOIN THE CULT"

---

## 5. New — video/b-roll prompts for Higgsfield/Kling animation

These are new (not in the existing canon docs), written to slot into the Remotion promo's
placeholder beats. Generate as short loopable clips; drop finished MP4s into
`video/public/broll/` with the noted filename.

**Reaper dough toss** → `broll-dough-toss.mp4`
> Animate the Reaper Icon (same locked character — hooded skull reaper, cloak, bony hands)
> tossing a pizza dough disc in the air against a pure black background. Flat vintage
> screenprint style, no gradients, no 3D, no realism. Bone-white and blood-red only. Flour
> dust particles in bone-white. Loopable, 3–4 seconds, camera locked off.

**Flame burst impact** → `broll-flame-burst.mp4`
> A flat, hand-drawn-style flame burst in blood-red and bone-white bursts outward from center
> on a pure black background, vintage screenprint/tattoo-flash linework, no gradients, no
> glow, no realism. 1–2 seconds, for use as a hard-cut transition accent.

**Sticker scan moment** → `broll-nfc-scan.mp4`
> A hand holding a phone taps a red skull sticker (Skull Summon design) on a dark wall; on
> contact the skull's eyes flash blood-red once. Flat screenprint style, black background,
> bone and blood-red only, no realism, no gradients. 2–3 seconds.

**Slice pull / cheese stretch** → `broll-slice-pull.mp4`
> A giant NYC-style pizza slice lifts away from the pie with a long cheese pull, illustrated
> in the same locked flat screenprint style — black background, bone-white slice, blood-red
> sauce accent only, thick outlines, no gradients, no realism, no glossy cheese shading.
> 2–3 seconds, loopable.

---

## Notes for whoever's driving Higgsfield

- If Higgsfield drifts off-palette or adds gradients/realism, re-paste the locked style line
  from section 1 before the next prompt — it doesn't always persist between generations.
- Keep every export on a pure black (`#000000`) background so it drops cleanly into the
  Remotion video without a matte/keying pass.
- Once real assets land in `video/public/`, tell Claude Code (this repo) which scene should
  swap from placeholder art to the real file — see `HANDOFF.md` for the current placeholder
  map.
