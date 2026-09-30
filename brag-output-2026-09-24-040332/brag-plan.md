# Brag Plan: ProjectsByAxy (Cinematic)

## What is this app?
ProjectsByAxy is a cyberpunk-styled AI creative agency site for Indian founders — brand, web, D2C, content, video, and growth marketing — that talks about itself like a black-ops tech briefing, down to treating a contact form submission as a "secure transmission."

## The angle
Trailer-scale treatment of the site's own language. Its real copy already reads like movie-trailer voiceover — "precision-engineered," "high-velocity delivery," "shift your reality" — so the video doesn't invent hype, it just gives that language the scale and pacing it's already asking for. Full-bleed declarative statements, dramatic reveals, one idea per beat.

## Hook (first 2-3 seconds)
Black frame. "PRECISION-ENGINEERED." slams full-bleed, center, huge type. Holds. Crossfades with a slow scale into "HIGH-VELOCITY DELIVERY." — both lines lifted verbatim from the site's own hero copy and spec sheet.

## Key moments (the middle)
- The wordmark reveal: "PROJECTSBYAXY // AI SOLUTIONS" rising out of an orange bloom, treated like a title card, not a UI element.
- Four capabilities stated like superpowers, one per beat, full-bleed: Brand Identity. Web Development. AI Content Creation. Video & Reels.
- The Intake Terminal, condensed to its most dramatic beats: the card materializes, the button is pressed, the success checkmark lands — no busy typing simulation, just the weight of the moment.

## Outro / punchline
"PROJECTSBYAXY" slams full-screen. "SHIFT YOUR REALITY." underneath. Long hold, implied music swell under the final line.

## User flow worth showing
The Intake Terminal, compressed to its dramatic essentials (cinematic favors weighty holds over busy interaction):
1. **Entry** — the terminal card materializes full-bleed, fields already populated (no simulated typing — cinematic doesn't do busywork).
2. **Key action** — the cursor presses `TRANSMIT REQUEST →`.
3. **Result** — hard cut to the success checkmark and `REQUEST TRANSMITTED`.

## Tone
- Preset: `cinematic`
- Creative direction: trailer-scale treatment of the site's own black-ops-agency voice — no jokes, no wink, just scale and confidence.
- Interpretation: fewer, longer scenes (4-5 total, 3-6s each). Dramatic reveals, not quick cuts. ALL CAPS / heavy display type at large scale. Full-bleed single-focus per beat — never more than one idea on screen at once. Transitions are dramatic wipes or slow crossfades with a subtle scale-in (0.95 → 1.0).

## Format: landscape — 1920x1080
## Duration: 22s

## Visual identity (from the project)
- Background: `#000000`
- Accent: Tailwind `orange-400` (`#fb923c`)
- Text: `#ffffff` primary, reduced-opacity white for secondary copy
- Display font: Archivo Black (bundled Hyperframes font; stands in for the site's Space Grotesk — heavy geometric display, matches the source's bold uppercase headline treatment)
- Body/label font: JetBrains Mono (exact match to the site's own mono font)
- Strongest visual element: the site's own real Intake Terminal UI and its "REQUEST TRANSMITTED" success state

## Share copy (draft)
Every founder builds a company. This one built a weapon. ProjectsByAxy — precision-engineered, high-velocity, shift your reality. ⚡ projectsbyaxy.com

## Audio direction
- Role: cinematic support — restrained under the declarative beats, swelling at the reveal moments
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3` — the only bundled option; it's an upbeat business-pop bed rather than an orchestral score, so the cinematic feel is built through a deliberately restrained volume arc (low under quiet beats, swelling into the wordmark reveal and the outro) rather than the track's own energy. This is a pragmatic choice given the available asset library, noted here rather than pretending otherwise.
- Music treatment: enter very low (~0.15) under the hook fragments, swell to ~0.75 into the wordmark reveal (scene 2), hold moderate (~0.55) through the capability beats so they don't fight the track's natural bounce, dip low again under the terminal's dramatic hold, swell back to ~0.8 for the outro slam, long fade over the final hold.
- Music cue guidance: preset at `assets/music/cues/happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.json`, 120.19 BPM. Strong cues at 16.02s, 17.02s, 17.52s, 18.02s, 18.52s, 20.02s — not directly reusable at this video's different scene timings, so cues are re-evaluated at composition time against this plan's own beat placements; only the wordmark reveal and the final outro slam get a beat lock, everything else follows dramatic timing over musical timing.
- Audio-reactive treatment: none — cinematic restraint, no glow/pulse tied to audio energy for this pass.
- SFX posture: sparse, deep, weighty — favor low-frequency-risk impact sounds for scene transitions and the outro hit; avoid anything that reads as a "UI click."
- Audio-coupled moments:
  - Scene 1 — a soft low impact under each hook fragment's landing
  - Scene 2 — a deeper impact on the wordmark's full arrival
  - Scene 4 — a single weighty hit on the button press, a distinct confirmation tone on the success checkmark
  - Scene 5 — a low, resonant final hit under the logo slam, timed to a strong cue
- Restraint rule: no dense sequential ticking (no typing sounds, no rapid card-arrival chatter) — every SFX cue in this cut is isolated and deliberate, matching the tone's "one idea, fully landed" pacing.

## Storyboard

### Scene 1 — Hook: Declarative Fragments — 4s
Black frame. "PRECISION-ENGINEERED." slams in full-bleed, huge Archivo Black type, centered. Holds ~1.8s. Crossfades (with a subtle scale-out on exit, scale-in on entry) into "HIGH-VELOCITY DELIVERY." Holds to scene end.
Sequential/interaction: none — two sequential full-bleed statements, not a list.
Audio intent: quiet, coiled tension — restrained under both lines.
Audio-coupled idea: a soft low impact on each line's landing.
Music: very low, spacious.
Transition mood: dramatic wipe → Scene 2

### Scene 2 — Reveal: The Wordmark — 4s
Orange glow blooms from center. "PROJECTSBYAXY" rises into frame at large scale, "// AI SOLUTIONS" settles beneath it a beat later. Hold on the full title card.
Sequential/interaction: none.
Audio intent: the payoff of Scene 1's tension — the music swells here.
Audio-coupled idea: a deeper impact on the wordmark's arrival, timed to a strong beat.
Music: swells from low to ~0.75.
Transition mood: slow crossfade with scale (0.95→1.0) → Scene 3

### Scene 3 — Highlight: Capabilities as Superpowers — 5s
Four capability lines state themselves one at a time, full-bleed, large type, each held long enough to read before the next replaces it: "Brand Identity." / "Web Development." / "AI Content Creation." / "Video & Reels." (all real service names from the site).
Sequential/interaction: yes — four lines build in sequence, each fully replacing the last (not a stacked list); hold each ~1.1s before the crossfade to the next.
Audio intent: measured confidence, one claim at a time.
Audio-coupled idea: none per-line (avoid rapid-fire ticking); music carries this beat.
Music: moderate, steady.
Transition mood: dramatic wipe → Scene 4

### Scene 4 — Highlight: The Intake Terminal (centerpiece) — 6s
The real Intake Terminal card materializes full-bleed, fields already filled (no typing simulation). A beat of held focus on the card. Cursor presses `TRANSMIT REQUEST →`. Hard cut to the real success state: checkmark, `REQUEST TRANSMITTED`.
Sequential/interaction: yes — one simulated click (the button press), then the success state.
Audio intent: weight and payoff — this is the video's proof point.
Audio-coupled idea: a single weighty hit on the button press; a distinct confirmation tone on the success checkmark.
Music: dips low under the held focus, no swell until the checkmark lands.
Transition mood: dramatic → Scene 5

### Scene 5 — Punchline / Outro — 3s
Hard cut to black. "PROJECTSBYAXY" slams full-screen. "SHIFT YOUR REALITY." settles beneath it. Long hold.
Sequential/interaction: none.
Audio intent: the swell resolves into a confident, final close.
Audio-coupled idea: one low, resonant hit under the logo slam, locked to a strong cue near the end of the track's usable window.
Music: swells to ~0.8, long fade over the final hold.
Transition mood: hard cut → end

**Music mood for this video:** cinematic (restrained/swelling arc over an upbeat bed, treated as dramatically as the asset allows)
**Audio summary:** A deliberately low, spacious volume arc turns the only available bundled track — an upbeat business-pop bed — into something closer to a building score: quiet under the opening statements, swelling into the wordmark reveal, settling for the capability beats, dipping for the terminal's dramatic hold, and swelling one final time under the closing logo slam.
