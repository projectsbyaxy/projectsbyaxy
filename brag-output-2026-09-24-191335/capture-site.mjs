import { chromium } from "playwright";
import path from "node:path";

const EXE = "C:\\Users\\fciL3086\\.cache\\hyperframes\\chrome\\chrome-headless-shell\\win64-152.0.7977.30\\chrome-headless-shell-win64\\chrome-headless-shell.exe";
const OUT = "site-shots";

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

async function shot(name) {
  await page.screenshot({ path: path.join(OUT, name) });
  console.log("saved", name);
}

// Hero
await shot("01-hero.png");

// Services section
await page.evaluate(() => document.getElementById("services")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2200);
await shot("02-services.png");

// About
await page.evaluate(() => document.getElementById("about")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2200);
await shot("03-about.png");

// Process
await page.evaluate(() => document.getElementById("process")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2200);
await shot("04-process.png");

// Projects
await page.evaluate(() => document.getElementById("projects")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2200);
await shot("05-projects.png");

// Pricing
await page.evaluate(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2200);
await shot("06-pricing.png");

// Testimonials
await page.evaluate(() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2200);
await shot("07-testimonials.png");

// Contact / Intake Terminal — empty state
await page.evaluate(() => document.getElementById("contact")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(2200);
await shot("08-terminal-empty.png");

// Fill name
const nameInput = page.locator('input[name="name"]');
await nameInput.click();
await nameInput.type("Aanya Kapoor", { delay: 40 });
await shot("09-terminal-name.png");

// Fill email
const emailInput = page.locator('input[name="email"]');
await emailInput.click();
await emailInput.type("aanya@newco.in", { delay: 40 });
await shot("10-terminal-email.png");

// Tick two service tags — Web Development, AI Content Creation
const buttons = await page.locator('button[type="button"]').all();
for (const btn of buttons) {
  const txt = (await btn.innerText()).trim().toUpperCase();
  if (txt.includes("WEB DEVELOPMENT") || txt.includes("AI CONTENT CREATION")) {
    await btn.click();
  }
}
await page.waitForTimeout(400);
await shot("11-terminal-tags.png");

// Mission brief
const brief = page.locator('textarea[name="message"]');
await brief.click();
await brief.type("Need a launch video that actually slaps.", { delay: 25 });
await shot("12-terminal-brief.png");

await shot("13-terminal-ready.png");

await browser.close();
console.log("done");
