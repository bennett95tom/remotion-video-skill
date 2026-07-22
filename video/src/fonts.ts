import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// Self-hosted (not @remotion/google-fonts): this sandbox's headless Chrome can't
// validate the TLS cert the network proxy re-terminates with, so any runtime
// fetch to fonts.gstatic.com fails during render. The four files below
// were downloaded once via `curl --cacert` and live in public/fonts/ — loaded
// locally via @remotion/fonts, no network call at render time.
const waitForFonts = delayRender("Loading DDB brand fonts");

Promise.all([
  loadFont({ family: "Anton", url: staticFile("fonts/Anton-Regular.woff2"), weight: "400" }),
  loadFont({ family: "Nosifer", url: staticFile("fonts/Nosifer-Regular.woff2"), weight: "400" }),
  loadFont({ family: "Courier Prime", url: staticFile("fonts/CourierPrime-Regular.woff2"), weight: "400" }),
  loadFont({ family: "Courier Prime", url: staticFile("fonts/CourierPrime-Bold.woff2"), weight: "700" }),
])
  .then(() => continueRender(waitForFonts))
  .catch((err) => {
    console.error("Failed to load DDB brand fonts", err);
    continueRender(waitForFonts);
  });

// Bold poster/wordmark headlines — tattoo-flash, high-impact
export const FONT_DISPLAY = "Anton";
// Dripping horror accent — used sparingly, for the strapline and cult-ritual beats only
export const FONT_ACCENT = "Nosifer";
// Typewriter body/meta — prices, hashtags, fine print (matches DDB's locked "Courier New" rule)
export const FONT_BODY = "Courier Prime";
