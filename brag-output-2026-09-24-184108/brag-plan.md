# Brag Plan: ProjectsByAxy (Phonk / Montagem Dark Funk Edit)

## What is this app?
ProjectsByAxy is a cyberpunk-styled AI creative agency site for Indian founders that talks about itself like a black-ops tech briefing — a natural fit for the aggressive, hard-cut visual grammar of a phonk/dark-funk montage edit.

## The angle
This is a full-site tour (same real content as the cinematic full-tour cut) re-cut to a user-supplied phonk/dark funk track (`akxneshiva.mp3`, 200 BPM), beat-locked to its actual detected beat grid. The tone shifts from cinematic restraint to `chaotic`: hard zoom-punch cuts, flash-cut transitions, glitch accents, a darker/grittier grade — timed to a real quiet-build-then-drop structure the track already has (weak beats 0–8.5s, a hard jump to strong consistent beats from ~8.5s on).

## Music (user-provided, not from the bundled library)
- File: `akxneshiva.mp3` ("MONTAGEM UNKNOWN - AKXNESHIVA"), user's own file, rights assumed cleared by the user.
- 200 BPM, beat grid extracted via `npx hyperframes beats` (231 beats detected, `.3s` grid).
- Structure used: beats 0–8.557s are quiet/building (strength 0.3–0.87); the track's real drop lands hard at 8.557s and stays strong (0.85–0.97) in a repeating ~0.6s downbeat pattern from there to at least 26s.
- This is a genuine asset match for the tone (unlike the cinematic cut's pragmatic workaround with the bundled corporate track) — no volume-arc trickery needed, just beat-locking to what's actually there.

## Hook (first ~1.4 seconds)
Near-silence. `AX // PBA` glitch-flickers into frame — the cold open before the build.

## Key moments (the middle)
- Tension build (1.357s–8.557s): the mission-statement fragments hard-cut against the track's build, ending right as the beat locks in.
- The drop (8.557s): the wordmark reveal — `PROJECTSBYAXY // AI SOLUTIONS` — slams in over the real hero video with a zoom-punch, exactly on the beat.
- Eight rapid-fire beat-locked beats after the drop: Services, About, Process, Projects, Pricing, Testimonial, the real Intake Terminal (centerpiece, gets more time), each cut hard on a strong beat.

## Outro / punchline
Hard cut to black on a strong beat. `PROJECTSBYAXY` slams full-screen, `SHIFT YOUR REALITY.` beneath, final hit locked to the beat at 25.357s.

## User flow worth showing
Same as prior cuts, compressed further for chaotic pacing: the real Intake Terminal card (fields pre-filled — no time for simulated typing at this tempo), a snapped button press, hard cut to the real `REQUEST TRANSMITTED` success state.

## Tone
- Preset: `chaotic`, applied as a phonk/dark-funk "montagem" edit specifically
- Creative direction: zoom-punch entrances (scale ~1.15→1.0), flash-cut transitions (brief white flash at hard cuts), chromatic/glitch accents on the cold open and the drop, darker/grittier grade (heavier overlay darkening than the cinematic cut, less warm)
- Interpretation: every scene boundary is locked to a real detected beat timestamp, not an arbitrary duration — this is what makes it read as an "edit," not just a fast slideshow

## Format: landscape — 1920x1080
## Duration: ~25.4s (ends on the beat at 25.357s rather than an arbitrary round number — beat-lock takes priority over hitting exactly 25.0s)

## Visual identity (from the project)
Same as prior cuts: `#000000` background, `#fb923c` accent, Archivo Black display / JetBrains Mono body — but with a darker, higher-contrast grade and the hero video reused as the drop-moment backdrop.

## Share copy (draft)
ProjectsByAxy — precision-engineered, high-velocity, and cut like it means it. 🔥 projectsbyaxy.com

## Audio direction
- Role: the track drives the edit — beat-locked cuts throughout, not restrained/ducked like the cinematic cut
- Music: `akxneshiva.mp3`, played at consistent high volume (~0.85) from the drop onward; quieter (~0.3) during the 0–8.557s build to let the tension read
- Beat lock: every scene-cut timestamp below is a real strong-beat time from `beats/assets/music/akxneshiva.mp3.json`, not invented
- SFX posture: sparse — a glitch/static accent on the cold open, one weighty hit exactly on the drop, and the terminal's press/success hits reused from prior cuts. The track's own bass carries most of the impact; extra SFX stays out of the way from the drop onward.

## Storyboard (all cut points are real detected beat timestamps)

### Scene A — Cold Open — 0.000s–1.357s (1.357s)
Near-black. `AX // PBA` glitch-flickers in with a static/glitch accent.
Transition: glitch flash → Scene B

### Scene B — Tension Build — 1.357s–8.557s (7.2s)
Mission-statement fragments hard-cut against the build: "WE DON'T BUILD WEBSITES." then "WE ENGINEER DIGITAL ECOSYSTEMS." Quiet, tense, deliberately restrained motion before the release.
Transition: hard flash cut, glitch accent → Scene C (the drop)

### Scene C — The Drop: Wordmark over Hero Video — 8.557s–10.957s (2.4s)
`PROJECTSBYAXY // AI SOLUTIONS` slams in with a zoom-punch (scale 1.15→1.0) over the real hero video, beat-locked hit exactly at 8.557s.
Transition: flash cut → Scene D

### Scene D — Services — 10.957s–12.757s (1.8s)
Six real service names, fast zoom-punch group entrance.
Transition: flash cut → Scene E

### Scene E — About — 12.757s–14.557s (1.8s)
"Hyderabad. India-Built. World-Deployed." + real stat row.
Transition: flash cut → Scene F

### Scene F — Process — 14.557s–16.357s (1.8s)
Scan → Architect → Deploy → Sync.
Transition: flash cut → Scene G

### Scene G — Projects — 16.357s–18.157s (1.8s)
Three real portfolio titles.
Transition: flash cut → Scene H

### Scene H — Pricing — 18.157s–19.357s (1.2s)
Starter → Growth → Domination ladder.
Transition: flash cut → Scene I

### Scene I — Testimonial — 19.357s–20.557s (1.2s)
One real client quote flash.
Transition: flash cut → Scene J

### Scene J — Intake Terminal (centerpiece) — 20.557s–23.557s (3.0s)
Real terminal card, fields pre-filled. Snapped button press. Hard cut to the real success state.
Transition: hard cut → Scene K

### Scene K — Outro — 23.557s–25.357s (1.8s)
`PROJECTSBYAXY` slams full-screen, `SHIFT YOUR REALITY.` beneath, final hit locked to the beat at 25.357s.

**Total: 25.357s.**
