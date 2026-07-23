#!/usr/bin/env python3
# =============================================================================
# DDB VHS GLITCH FAST-CUT REMIX
# Deterministic, local, free. No Veo, no AI generation, no dice-rolls.
# Cuts your existing footage into a fast VHS-glitch reel and renders an MP4.
#
# Run:  python3 vhs_remix.py
# Tune: edit the KNOBS block below, re-run. Same SEED = same cut every time.
# =============================================================================

import os, sys, glob, random, subprocess, shutil
from pathlib import Path

# ------------------------------- KNOBS ---------------------------------------
SEED           = 7        # change this for a different (but repeatable) cut
TARGET_SECONDS = 22       # total reel length
CLIP_LEN       = 0.26     # base fast-cut length (seconds) — smaller = faster
CLIP_JITTER    = 0.10     # +/- randomization on each cut length
FPS            = 30
W, H           = 1080, 1920
GLITCH         = 0.85     # 0..1 overall VHS intensity
POP_CHANCE     = 0.22     # fraction of cuts that get an extra-hard RGB tear
WITH_LOGO      = True     # flicker the DDB logo bug bottom-centre
LOGO_EVERY     = 1.0      # seconds between logo flashes
# -----------------------------------------------------------------------------

HOME = Path.home()
random.seed(SEED)

# Known DDB footage locations left by the earlier sessions (used if they exist)
SOURCE_DIRS = [
    HOME/"Downloads",                                    # AirDrops land here
    HOME/"Desktop"/"DDB_SOURCE",
    HOME/"Desktop"/"DDB_SOURCE"/"use this dough throw",
    HOME/"DDB_EVIL_INTERMISSION_TAKEOVER"/"hooked_pizza_microclips_final"/"clips_3frame",
]

# Folders/files matching these get weighted heavier in the cut (more of them)
BOOST_WORDS   = ["dough", "throw", "toss", "spin", "stretch"]
BOOST_FACTOR  = 3        # dough-throw clips appear ~3x as often

# Anything whose filename hits these is skipped (posters/menus/cards/graphics)
SKIP_WORDS = ["poster","menu","card","logo","proof","story","price",
              "flyer","brand","design","template","wordmark","mark"]
EXTRA_CLIPS = [
    HOME/"DDB_EVIL_INTERMISSION_TAKEOVER"/"source_DZK09wzieGH_clean.mp4",
]
LOGO_CANDIDATES = [
    HOME/"DDB VAULT"/"CLAUDE"/"ddb_logo_mark.png",
    HOME/"DDB VAULT"/"Dark_Doh_Bros_Final_Brand_Pack"/"03_PNG_Transparent"/"main-logo-lockup_bone-transparent.png",
]

OUTDIR = HOME/"DDB_VHS_REMIX"
SEGDIR = OUTDIR/"segments"
OUT    = OUTDIR/"ddb_vhs_glitch_fastcut.mp4"
PROOF  = OUTDIR/"ddb_vhs_glitch_fastcut_proof.jpg"

def run(cmd):
    return subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

def have(name):
    return shutil.which(name) is not None

def dur(path):
    r = run(["ffprobe","-v","error","-show_entries","format=duration",
             "-of","default=nw=1:nk=1", str(path)])
    try:
        return float(r.stdout.strip())
    except Exception:
        return 0.0

def gather_sources():
    vids = []
    for d in SOURCE_DIRS:
        if d.exists():
            for ext in ("*.mp4","*.MP4","*.mov","*.MOV","*.m4v"):
                vids += [Path(p) for p in glob.glob(str(d/ext))]
    for c in EXTRA_CLIPS:
        if c.exists():
            vids.append(c)
    # de-dup, drop posters/menus/cards, keep only readable video, weight throws
    seen, good = set(), []
    for v in vids:
        if v in seen:
            continue
        seen.add(v)
        low = str(v).lower()
        if any(w in low for w in SKIP_WORDS):
            continue
        if dur(v) <= 0.05:
            continue
        weight = BOOST_FACTOR if any(w in low for w in BOOST_WORDS) else 1
        good.extend([v] * weight)      # heavier weight = appears more in the cut
    return good

def find_logo():
    for c in LOGO_CANDIDATES:
        if c.exists():
            return c
    return None

def seg_filter(pop):
    g = GLITCH
    rh = int((6 if pop else 3) * g) + random.randint(-1,1)
    bv = int((6 if pop else 3) * g) + random.randint(-1,1)
    sat = 1.15 + (0.35 if pop else 0.0) + random.uniform(-0.05,0.1)
    grain = int(14 * g) + (10 if pop else 0)
    return (
        f"scale={W}:{H}:force_original_aspect_ratio=increase,"
        f"crop={W}:{H},setsar=1,fps={FPS},"
        f"rgbashift=rh={rh}:bv={bv},"
        f"eq=saturation={sat:.2f}:contrast=1.06:brightness=0.01,"
        f"gblur=sigma=0.3,"
        f"noise=alls={grain}:allf=t"
    )

def global_filter():
    g = GLITCH
    return (
        f"drawgrid=w=iw:h=3:t=1:c=black@{0.30*g:.2f},"   # scanlines
        f"vignette=PI/5,"
        f"noise=alls={int(6*g)}:allf=t,"
        f"curves=b='0/0.03 1/0.92':r='0/0.02 1/0.98',"    # tape colour bleed
        f"eq=contrast=1.04:saturation=1.08"
    )

def main():
    if not have("ffmpeg") or not have("ffprobe"):
        sys.exit("ffmpeg/ffprobe not found. Install with: brew install ffmpeg")

    sources = gather_sources()
    if not sources:
        sys.exit("No source footage found. Expected DDB clips under:\n  " +
                 "\n  ".join(str(d) for d in SOURCE_DIRS))
    print(f"Found {len(sources)} source clips.")

    OUTDIR.mkdir(parents=True, exist_ok=True)
    if SEGDIR.exists():
        shutil.rmtree(SEGDIR)
    SEGDIR.mkdir(parents=True, exist_ok=True)

    # Build the fast-cut list until we fill TARGET_SECONDS
    seglist, total, i = [], 0.0, 0
    pool = sources[:]
    random.shuffle(pool)
    while total < TARGET_SECONDS:
        src = pool[i % len(pool)]
        i += 1
        d = dur(src)
        length = max(0.08, CLIP_LEN + random.uniform(-CLIP_JITTER, CLIP_JITTER))
        inpoint = 0.0 if d <= length else random.uniform(0, max(0.0, d - length))
        pop = random.random() < POP_CHANCE
        seg = SEGDIR/f"seg_{len(seglist):04d}.mp4"
        r = run(["ffmpeg","-y","-hide_banner","-loglevel","error",
                 "-ss",f"{inpoint:.3f}","-t",f"{length:.3f}","-i",str(src),
                 "-vf",seg_filter(pop),"-an","-r",str(FPS),
                 "-c:v","libx264","-preset","veryfast","-crf","20",
                 "-pix_fmt","yuv420p",str(seg)])
        if seg.exists() and dur(seg) > 0.03:
            seglist.append(seg)
            total += length
        if len(seglist) > 400:
            break
    print(f"Built {len(seglist)} fast cuts (~{total:.1f}s).")

    # Concat (all segments share codec/params → stream copy)
    listfile = SEGDIR/"list.txt"
    listfile.write_text("".join(f"file '{s}'\n" for s in seglist))
    joined = OUTDIR/"_joined.mp4"
    run(["ffmpeg","-y","-hide_banner","-loglevel","error",
         "-f","concat","-safe","0","-i",str(listfile),
         "-c","copy",str(joined)])

    # Global VHS pass (+ optional flickering logo bug)
    logo = find_logo() if WITH_LOGO else None
    if logo:
        fc = (f"[0:v]{global_filter()}[bg];"
              f"[1:v]scale=460:-1,format=rgba,colorchannelmixer=aa=0.85[lg];"
              f"[bg][lg]overlay=x=(W-w)/2:y=H-h-140:"
              f"enable='lt(mod(t,{LOGO_EVERY}),0.12)',format=yuv420p[v]")
        cmd = ["ffmpeg","-y","-hide_banner","-loglevel","error",
               "-i",str(joined),"-loop","1","-i",str(logo),
               "-filter_complex",fc,"-map","[v]","-t",f"{total:.2f}","-an",
               "-c:v","libx264","-preset","medium","-crf","20",
               "-pix_fmt","yuv420p","-movflags","+faststart",str(OUT)]
        print(f"Logo bug: {logo.name}")
    else:
        cmd = ["ffmpeg","-y","-hide_banner","-loglevel","error",
               "-i",str(joined),"-vf",global_filter()+",format=yuv420p","-an",
               "-c:v","libx264","-preset","medium","-crf","20",
               "-pix_fmt","yuv420p","-movflags","+faststart",str(OUT)]
    r = run(cmd)
    if not OUT.exists():
        sys.exit("Final render failed:\n" + r.stderr[-1500:])

    # Proof contact sheet
    run(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(OUT),
         "-vf","fps=2,scale=150:266,tile=8x6:padding=2:margin=2:color=black",
         "-frames:v","1",str(PROOF)])

    print("\n========================================")
    print("  DONE")
    print(f"  Video: {OUT}")
    print(f"  Proof: {PROOF}")
    print(f"  {total:.1f}s · {W}x{H} · {FPS}fps · silent (add music in-app)")
    print("========================================")
    # open on mac
    if sys.platform == "darwin":
        run(["open", str(OUT)])

if __name__ == "__main__":
    main()
