# Hyperframes Composition Brief: ProjectsByAxy

## Objective
Create a short launch-style brag video for ProjectsByAxy, an AI-powered creative agency site for Indian founders that presents itself with a self-serious hacker-terminal aesthetic.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 19 seconds

## Source Material
- Project root: `C:\Users\fciL3086\Documents\Workspace\projectsbyaxy\.claude\worktrees\local-changes-branch-e52539`
- Primary files read: `index.html`, `src/index.css`, `src/App.tsx`, `README.md`, `package.json`
- Product name: ProjectsByAxy
- Tagline / strongest claim: "Shift your reality." / "Empowering businesses and scaling growth through precision-engineered digital projects and expert neural logic."
- Key UI or visual moment to recreate: the Intake Terminal contact form — fields, service-tag checkboxes, auto-locking package badge, "TRANSMIT REQUEST →" button, and its "REQUEST TRANSMITTED" success state.
- Copy that must appear verbatim:
  - "PROJECTSBYAXY // AI SOLUTIONS"
  - "Shift your reality."
  - "Agency — ProjectsByAxy Solutions" / "Logic — Advanced ai solutions" / "Flow — High-Velocity Delivery" / "Stack — Claude Ai, Chatgpt, Saas, Full Stack, Cloud Ops, Video edits & content creation."
  - Service names: "Brand Identity", "Web Development", "AI Content Creation", "Video & Reels"
  - "TRANSMIT REQUEST →"
  - "REQUEST TRANSMITTED" / "RESPONSE WITHIN 24 HOURS // AX-PROTOCOL ACTIVE"
  - "AX // PBA"

## Creative Direction
- Tone preset: default
- Creative direction: confident hacker-terminal ops briefing — dense monospace HUD energy, playful and shareable, not a joke at the product's expense.
- Interpretation: quick clean cuts with a steady upbeat pulse; text slams in fast then holds long enough to read; restraint over chaos — competence, not meme energy.
- Angle: the site talks about itself like a black-ops tech briefing, down to treating a contact form submission as a "secure transmission." The video leans into that self-serious terminal voice.
- Hook: black frame, one orange scanline sweep, `AX // PBA` types in, then `PROJECTSBYAXY // AI SOLUTIONS` slams in.
- Outro / punchline: the form's own real success state (checkmark, "REQUEST TRANSMITTED") resolves into the logo, URL, and "Shift your reality."
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Sci-fi/laser cliché sound effects despite the "terminal" theme — sounds should read as real UI

## Visual Identity
- Background: `#000000`
- Text: `#ffffff` (primary), reduced-opacity white for secondary/tertiary copy
- Accent: Tailwind `orange-400` (`#fb923c`), used at low opacity for glows, badges, and labels
- Display font: Space Grotesk (headlines) — fallback to a bold geometric sans if unavailable
- Body font: JetBrains Mono (all labels, specs, UI chrome — uppercase, wide letter-spacing) — fallback to a monospace font if unavailable
- Visual references from the project: black terminal cards with thin white/10-opacity borders, orange checkbox tags, uppercase tracked-out monospace labels, the "AX // PBA" wordmark with orange "AX" and dimmed "//"

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook: Boot-up — 3s — `AX // PBA` types in, then the full headline slams in
2. Reveal: Tech Specs — 3s — tagline holds, then 4 spec rows tick in one by one
3. Highlight: Service Matrix — 4s — 4 service rows snap in one after another
4. Highlight: The Intake Terminal (centerpiece) — 6s — simulated form fill, service tags tick on, package badge locks, TRANSMIT REQUEST clicked
5. Punchline / Outro — 3s — success card resolves, hard cut to logo + URL + "Shift your reality."

## Audio
- Audio role: warm confident bed with tasteful mechanical/interface accents
- Audio arc: steady pulse from the hook through the highlights, a brief ducked dip under the transmit-button click for emphasis, resolving into a confirmation chime and a restrained final hit on the logo, with a quick fade under the last hold
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3`
- Music treatment: start at 0s under the hook, hold through the middle, duck ~0.12-0.15 under the transmit click, back up for the outro, fade over the final logo hold
- Music cue guidance: preset at `brag-output/composition/assets/music/` (copy cue JSON from skill assets if useful) — 120.19 BPM. Strong cues at 16.02s, 17.02s, 17.52s, 18.02s, 18.52s, 20.02s. Land the transmit-click and success-card reveal on cues near 15-17s; lock the final logo hold near 18-19s. Beat grid (~0.5s spacing) available for the Scene 3 service-row reveal — snap every other beat so text stays readable.
- Audio-reactive treatment: subtle — orange glow around the hero visual and terminal card edges may breathe gently with bass/RMS energy. No waveform or equalizer visuals.
- Audio-coupled moments:
  - Scene 1 — logo typing in with soft key-tick sounds
  - Scene 2 — spec rows ticking in with light interface clicks
  - Scene 3 — service rows snapping in one by one, card-arrival sound each, timed to the beat grid
  - Scene 4 — simulated typing in fields, a tick per service tag, a distinct transmit whoosh on the button click
  - Scene 5 — confirmation chime on the success checkmark, restrained hit on the final logo landing
- SFX selection guidance: motion-matched, professional restraint. Read `sfx-analysis.md`/`sfx-analysis.json` bundled with the brag skill assets for selection guidance; prefer lower high-frequency-risk sounds for the repeated Scene 3 row-reveals.
- SFX analysis guidance: `sfx-analysis.md` at the brag skill's `assets/sfx/` directory.
- Exact SFX choice: Hyperframes should choose filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: copy the chosen music and any Hyperframes-selected SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core` (composition contract + `data-*` timing), `hyperframes-animation` (motion), `hyperframes-creative` (design spec, beats, audio-reactive), `hyperframes-keyframes` (seek-safe keyframes), and `hyperframes-cli` (lint/check/render). `/brag` is its own workflow: do not enter the `hyperframes` entry-point intent interview or route into its generic promo / launch-video workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (the Intake Terminal, per the storyboard).
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds (target 19s).
- Include the planned music/SFX layer.
- Treat `/brag` audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints; ignore cues that hurt readability, scene pacing, or the product story.
- Use only 1-3 strong cue locks in this 19s video.
- Use SFX to support motion and interaction; restraint where the edit is already busy.
- Use local assets for audio and any required runtime/media dependencies when possible.
- Run `hyperframes check` before render — it is brag's single gate.
