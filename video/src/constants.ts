// Dark D'oh Bros — brand-locked identity. Do not override these values per-scene.
// Source: DDB canon docs (brand spec + King's Trust plan) — black / bone / blood, no gradients, no cute.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920; // vertical — Reels/TikTok/Stories, matches DDB's NFC + social campaign format
export const DURATION_FRAMES = 690; // 23s @ 30fps

export const COLORS = {
  bgVoid: "#000000", // Black void
  bone: "#f5f5dc", // Bone-white — primary text
  boneFaded: "#c0c0a0", // Faded bone — secondary text
  blood: "#8a0303", // Blood-red — primary accent
  bloodBright: "#c81e1e", // brighter red for glow/shadow, same family
  driedBlood: "#2a0000", // borders, dividers
  flame: "#ff6a00", // flame accent for fire/heat moments only, used sparingly
} as const;

export const BRAND = {
  name: "Dark D'oh Bros",
  wordmark: "DARK D'OH BROS",
  strapline: "Slice by Slice. Soul by Soul.",
  city: "BRIGHTON",
  handle: "@darkdohbros",
  hashtags: ["#darkdohbros", "#brightonpizza", "#sliceclub"],
} as const;

export const MENU_HEROES = [
  {
    name: "Hexed Margarita",
    tag: "The Classic Curse",
    desc: "Black-smoked garlic marinara. 72hr dough.",
    price: "£22 / £3.50 slice",
  },
  {
    name: "Burning Desire",
    tag: "Hot Love. Bad Idea.",
    desc: "Double pepperoni, spicy honey miso ranch.",
    price: "£22 / £3.50 slice",
  },
  {
    name: "The Devourer",
    tag: "Hot Dog From Hell",
    desc: "Bratwurst, crispy onions, pickle-jalapeño aioli.",
    price: "£22 / £3.50 slice",
  },
  {
    name: "Sweet Sweet Long Boy",
    tag: "Sticky. Sentient. Sinful.",
    desc: "Vegan baked donut, six unholy glazes.",
    price: "£2.50",
  },
] as const;

// Frame budget (see references/core-concepts.md):
// total = sum(scene durations) - sum(transition durations)
// 150 + 120 + 330 + 140 = 740 scene frames
// transitions: 18 + 16 + 16 = 50
// output: 740 - 50 = 690 = DURATION_FRAMES
export const SCENE_FRAMES = {
  wordmark: 150,
  tagline: 120,
  menu: 330,
  cta: 140,
} as const;

export const TRANSITION_FRAMES = {
  wordmarkToTagline: 18,
  taglineToMenu: 16,
  menuToCta: 16,
} as const;
