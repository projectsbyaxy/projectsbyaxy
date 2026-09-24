# Brag Plan: ProjectsByAxy (Phonk Edit — Real Footage Rebuild)

## Why this version exists
Two prior attempts used synthetic HTML text cards (service names, pricing tiers as big centered pop-in text) styled to look like a montage. User feedback: this read as "AI slop," not a real edit. Reference analysis (a real phonk/montagem web-dev portfolio reel) confirmed the actual genre convention: real screen footage of the real product, small minimal captions, held shots — not text-card slideshows.

This version is built entirely from **real screenshots of the live site** (captured via Playwright against `localhost:3000`, including a genuine step-by-step capture of the Intake Terminal actually being filled in — name typed, email typed, both service tags ticked, mission brief written, then the real success state), not synthetic HTML recreations.

## Structure
- Cold open + a short text-hook build (mission statement) — kept, since a brief hook before cutting to real footage is a legitimate edit convention and wasn't the part called out as slop.
- Everything after the drop is real screenshots: Hero → Services → About → Process → Projects → Pricing → Testimonials → Intake Terminal fill-up sequence (7 real states) → Outro.
- Captions are small, corner-positioned, one short phrase per scene — not full-bleed centered statements.
- Subtle Ken Burns zoom on each still for life; still beat-locked to the same real detected beat grid (200 BPM) as before, but paced faster overall per feedback ("too restrained"), especially through the terminal sequence which cuts on nearly every beat to read as a rapid real demo.

## Assets
- `assets/shots/01-hero.png` … `14-terminal-success.png` — real Playwright captures, 1920x1080
- `assets/music/akxneshiva.mp3` — user-provided track (reused)
- SFX — reused from prior build (sparse, only at major hits)

## Duration
~26.5s, beat-locked end to end.
