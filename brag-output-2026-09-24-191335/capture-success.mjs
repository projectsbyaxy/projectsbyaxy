import { chromium } from "playwright";

const EXE = "C:\\Users\\fciL3086\\.cache\\hyperframes\\chrome\\chrome-headless-shell\\win64-152.0.7977.30\\chrome-headless-shell-win64\\chrome-headless-shell.exe";

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

await page.evaluate(() => document.getElementById("contact")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(900);

// Replace the form container's contents with the real success markup (no network call, no real submission)
await page.evaluate(() => {
  const form = document.querySelector("form");
  if (!form) return;
  const wrap = form.parentElement;
  form.style.display = "none";
  const div = document.createElement("div");
  div.className = "flex flex-col items-center gap-6 py-16 border border-white/10 bg-white/[0.02]";
  div.innerHTML = `
    <div class="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>
    <div class="flex flex-col items-center gap-2 text-center">
      <div class="font-display text-lg uppercase tracking-widest text-white/80">Request Transmitted</div>
      <div class="text-[11px] font-mono text-white/30 uppercase tracking-widest">Response within 24 hours // AX-PROTOCOL active</div>
    </div>
    <button class="text-[9px] uppercase tracking-[0.3em] font-mono text-white/25">Send Another →</button>
  `;
  wrap.appendChild(div);
});
await page.waitForTimeout(300);
await page.screenshot({ path: "site-shots/14-terminal-success.png" });
console.log("saved success shot");

await browser.close();
