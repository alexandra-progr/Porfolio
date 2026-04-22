# Atelier — Hero Frame Sequence Setup

## Quick start

```bash
npm install
npm run dev
```

The site loads immediately. Without frames the hero canvas is blank — add frames with the pipeline below.

---

## Video → Frame Pipeline

The hero uses a scroll-scrubbed canvas sequence, not a `<video>` tag.
Extract your source video into numbered JPG frames with ffmpeg.

### Step 1 — Drop your source video

```bash
mkdir -p input
# copy your video here:
mv /path/to/your-video.mp4 input/source.mp4
```

### Step 2 — Extract frames with ffmpeg

```bash
ffmpeg -i input/source.mp4 \
  -vf "fps=30,scale='min(1920,iw)':'-2':flags=lanczos" \
  -q:v 3 \
  public/frames/frame_%04d.jpg
```

> **Requires ffmpeg** — install via `brew install ffmpeg` (macOS) or `apt install ffmpeg` (Linux).

### Step 3 — Update FRAME_COUNT

```bash
ls public/frames | wc -l
```

Paste the number into `src/lib/constants.ts`:

```ts
export const FRAME_COUNT = 240; // ← replace with your count
```

### Optional: convert to WebP for ~40% smaller payload

```bash
for f in public/frames/*.jpg; do
  cwebp -q 82 "$f" -o "${f%.jpg}.webp" && rm "$f"
done
```

Then update `FRAME_EXT` in `src/lib/constants.ts` to `"webp"`.

### Vercel / size limits

If you're deploying to Vercel Hobby (25 MB limit), check your frame folder size:

```bash
du -sh public/frames
```

If it exceeds 20 MB, either reduce `fps` in the ffmpeg command (try `fps=20`) or convert to WebP.

### No ffmpeg locally?

A Node/WASM alternative exists via `@ffmpeg/ffmpeg` as `scripts/extract-frames.mjs` — ask Atelier support to enable it.

---

## Video backgrounds

Set your video URLs in:

- `src/components/Stats.tsx` → `STATS_BG_VIDEO`
- `src/components/CtaFooter.tsx` → `CTA_BG_VIDEO`

Both support plain `.mp4` URLs. For HLS (`.m3u8`), add `hls.js` and wire it via a `useEffect` ref.
