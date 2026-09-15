/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ProjectsByAxy // AI Solutions
 * Single-page app — cyberpunk aesthetic.
 *
 * Sections (in scroll order):
 *  NavBar          — fixed top navigation         [NEW]
 *  Hero            — main landing                 [ORIGINAL — untouched]
 *  Services        — 6 service offerings          [NEW]
 *  About           — agency profile + stats       [NEW]
 *  Process         — 4-phase workflow             [NEW]
 *  Projects        — deployed project cards       [ORIGINAL — untouched]
 *  Pricing         — 3 package tiers              [NEW]
 *  Network Feedback — testimonials                [ORIGINAL — untouched]
 *  Contact         — intake form + info           [NEW]
 */

import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from './lib/supabase';
import type { Inquiry } from './lib/supabase';
import {
  /* ── existing icons ── */
  Sparkles, ArrowLeft, Cpu, Database, Zap, X, ExternalLink, ShieldCheck,
  /* ── new icons ── */
  Monitor, Brain, Palette, ShoppingCart, Video, BarChart3,
  Package, TrendingUp, Crown, Mail, Phone, MapPin, Send, Check,
  Users, Award, Terminal, Globe, ChevronDown, MessageSquare,
  Code2, Layers, Target, RefreshCw
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SHARED ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const titleLineVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
interface Project {
  id: string; title: string; description: string; fullDescription: string;
  tech: string[]; icon: ReactNode; imageUrl: string;
  specs: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: "AX-04", title: "Bespoke Web Systems",
    description: "Custom high-velocity web platforms engineered for scale and speed. Zero-latency architecture.",
    fullDescription: "A comprehensive digital overhaul for enterprise partners, focusing on high-velocity performance and pixel-perfect aesthetics. Built with a zero-latency mindset using Next.js and custom neural caching layers. We engineered a system that handles 1M+ concurrent users while maintaining sub-100ms response times globally.",
    tech: ["Next.js", "AI-Core", "Scale"], icon: <Cpu size={20} />,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Performance", value: "99/100 Lighthouse" }, { label: "Scale", value: "Enterprise Grade" },
      { label: "Logic", value: "Neural Caching" }, { label: "Uptime", value: "99.99% Node-Locked" }
    ]
  },
  {
    id: "AX-09", title: "Predictive Ops",
    description: "Real-time anomaly detection for industrial supply chains using transformer architectures.",
    fullDescription: "Leveraging state-of-the-art transformer architectures to predict supply chain bottlenecks before they happen. Integrating edge computing for instantaneous anomaly detection across thousands of IoT sensors. This project reduced operational downtime by 43% for our industrial partners through proactive neural rerouting.",
    tech: ["RNN", "Cloud-Native", "Edge"], icon: <Zap size={20} />,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Architecture", value: "Transformer Layout" }, { label: "Latency", value: "<15ms Inference" },
      { label: "Nodes", value: "12,000+ Edge Devices" }, { label: "Security", value: "End-to-End Encrypted" }
    ]
  },
  {
    id: "AX-12", title: "Auto-Content",
    description: "Generative AI workflow automation for global marketing teams. Reduced latency by 60%.",
    fullDescription: "Revolutionizing marketing workflows with custom-trained Stable Diffusion models and GPT-O1 agents. Automating content creation cycles from 48 hours down to seconds. We developed a proprietary prompt-engineering layer that ensures brand consistency across millions of generated assets, saving over 5,000 man-hours monthly.",
    tech: ["Stable-Diffusion", "GPT-O1", "Nodes"], icon: <Database size={20} />,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Model", value: "GPT-O1 Hybrid" }, { label: "Throughput", value: "10k assets/hr" },
      { label: "Accuracy", value: "98.2% Brand Match" }, { label: "Pipeline", value: "Automated V-Ring" }
    ]
  }
];

const SERVICES = [
  {
    code: "S-01", icon: <Palette size={18} />,
    title: "Brand Identity",
    what: "Logo · Color System · Typography · Brand Guidelines",
    description: "We build the complete visual DNA of your brand from scratch — logos that command attention, color palettes that convert, and a system your team can use consistently across every touchpoint.",
    deliverables: ["Logo Suite (SVG, PNG, Dark/Light)", "Full Brand Guidelines PDF", "Social Media Kit (20+ templates)", "Business Card & Stationery"],
    timeline: "7 days",
  },
  {
    code: "S-02", icon: <Monitor size={18} />,
    title: "Web Development",
    what: "Landing Pages · Multi-Page Sites · Portfolio · Business Sites",
    description: "High-velocity websites built for founders who need to look premium and convert visitors into clients. Mobile-first, fast, and built to scale.",
    deliverables: ["Responsive Design (All Devices)", "SEO-Ready Structure", "Contact & Lead Forms", "CMS Integration (optional)"],
    timeline: "7–14 days",
  },
  {
    code: "S-03", icon: <ShoppingCart size={18} />,
    title: "D2C Store Development",
    what: "E-commerce · Product Pages · Checkout · Inventory",
    description: "End-to-end online stores for D2C founders — from StylezStreet streetwear to Tealwrap gifting. Built to sell, not just to look good.",
    deliverables: ["Full E-Commerce Store", "Payment Gateway Integration", "Product Photography Direction", "Abandoned Cart & Email Flows"],
    timeline: "14–21 days",
  },
  {
    code: "S-04", icon: <Brain size={18} />,
    title: "AI Content Creation",
    what: "Social Posts · Ad Creatives · Captions · Content Calendar",
    description: "Using Claude AI and ChatGPT to produce a month of on-brand content in days. Consistent voice, real engagement, zero creative block.",
    deliverables: ["30-Day Content Calendar", "20+ Social Media Posts", "Ad Copy Variants (Meta/Google)", "Hashtag & SEO Strategy"],
    timeline: "5–7 days",
  },
  {
    code: "S-05", icon: <Video size={18} />,
    title: "Video & Reels",
    what: "Product Videos · Brand Reels · Ads · Testimonials",
    description: "Short-form video for Instagram, YouTube Shorts, and ads — scripted, shot-directed or AI-generated, edited to stop the scroll and drive action.",
    deliverables: ["1–3 Min Promotional Video", "3–5 Short-Form Reels", "Script + Storyboard", "Subtitles & Platform Exports"],
    timeline: "7–10 days",
  },
  {
    code: "S-06", icon: <BarChart3 size={18} />,
    title: "Growth Marketing",
    what: "SEO · Google Ads · Meta Ads · Email · WhatsApp",
    description: "Performance marketing for founders ready to scale — from Google My Business setup to Meta ad funnels that bring qualified buyers directly to your store.",
    deliverables: ["Ad Campaign Setup & Launch", "Monthly Performance Report", "Email Automation Sequences", "Google My Business Optimization"],
    timeline: "Ongoing / Monthly",
  },
];

const PROCESS_PHASES = [
  {
    phase: "01", code: "SCAN", icon: <Target size={16} />,
    title: "Discovery & Neural Mapping",
    description: "Deep diagnostic of your business matrix — target audience, competitive landscape, technical requirements, and growth vectors. Full-spectrum analysis before a single line of code.",
    duration: "3–5 Days", output: "Strategic Blueprint + Scope Doc",
  },
  {
    phase: "02", code: "ARCHITECT", icon: <Layers size={16} />,
    title: "System Design & Blueprint",
    description: "We architect the complete solution — information hierarchy, visual systems, tech stack selection, and milestone sequencing. No surprises. No scope drift. Everything locked before build.",
    duration: "5–7 Days", output: "Technical Spec + Visual Wireframes",
  },
  {
    phase: "03", code: "DEPLOY", icon: <Code2 size={16} />,
    title: "High-Velocity Build",
    description: "Execution phase. Daily progress updates, iterative deployments, and real-time QA loops guarantee quality without sacrificing delivery speed. You see it before it ships.",
    duration: "7–30 Days", output: "Staged + Production Deployment",
  },
  {
    phase: "04", code: "SYNC", icon: <RefreshCw size={16} />,
    title: "Optimization & Handoff",
    description: "Post-launch performance monitoring, conversion analysis, bug patching, and complete knowledge transfer. Your system is fully yours — documented, trained, and optimized.",
    duration: "30 Days Post-Launch", output: "Performance Report + Full Docs",
  },
];

const PRICING_TIERS = [
  {
    id: "AX-P1", name: "STARTER", label: "Launch Grade",
    price: "₹24,999", priceAlt: "$299 USD", popular: false,
    description: "Ideal for first-time founders establishing their digital presence and brand.",
    icon: <Package size={18} />,
    features: [
      "Brand Identity Design", "Logo + Color System",
      "1 Landing Page Website", "Social Media Kit (10 Assets)",
      "Basic SEO Setup", "2 Revision Cycles", "7-Day Delivery",
    ],
  },
  {
    id: "AX-P2", name: "GROWTH", label: "Market Ready",
    price: "₹49,999", priceAlt: "$599 USD", popular: true,
    description: "For brands ready to scale with AI-powered automation and full-stack presence.",
    icon: <TrendingUp size={18} />,
    features: [
      "Everything in Starter", "Full Website (5 Pages)",
      "AI Content Pipeline Setup", "E-Commerce Integration",
      "Email Marketing System", "Product Photography (10 Shots)",
      "Analytics Dashboard", "Priority Support", "14-Day Delivery",
    ],
  },
  {
    id: "AX-P3", name: "DOMINATION", label: "Enterprise Tier",
    price: "₹74,999", priceAlt: "$899 USD", popular: false,
    description: "Complete brand ecosystem for operators demanding absolute market control.",
    icon: <Crown size={18} />,
    features: [
      "Everything in Growth", "Advanced E-Commerce Store",
      "AI Chatbot Integration", "Video Content Production",
      "Influencer Campaign Strategy", "Performance Marketing Setup",
      "Dedicated Account Manager", "Unlimited Revisions", "30-Day Delivery",
    ],
  },
];

const AGENCY_STATS = [
  { value: "25+", label: "Projects Deployed" },
  { value: "20+", label: "Happy Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "3+", label: "Years Active" },
];

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER — reusable pattern
   ═══════════════════════════════════════════════════════════════ */
function SectionHeader({
  scrollTo, title, subtitle,
}: { scrollTo: () => void; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-6 border-b border-white/10 pb-12">
      <motion.button
        variants={itemVariants}
        onClick={scrollTo}
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 hover:text-white transition-colors self-start"
      >
        <ArrowLeft size={12} /> Back to Top
      </motion.button>
      <div className="flex flex-col gap-3">
        <motion.h2
          variants={titleLineVariants}
          className="font-display font-medium text-3xl sm:text-4xl tracking-[0.1em] sm:tracking-widest uppercase"
        >
          {title} //
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function NavBar({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { id: "services",     label: "Services" },
    { id: "about",        label: "About" },
    { id: "process",      label: "Process" },
    { id: "projects",     label: "Projects" },
    { id: "pricing",      label: "Pricing" },
    { id: "testimonials", label: "Feedback" },
    { id: "contact",      label: "Contact" },
  ];

  const handleNav = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-6 sm:px-10"
        style={{
          background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] font-mono text-white/60 hover:text-white transition-colors flex items-center gap-2"
        >
          <span className="text-orange-400/60">AX</span>
          <span className="text-white/20">//</span>
          <span>PBA</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-[9px] uppercase tracking-[0.28em] font-mono text-white/30 hover:text-white/80 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: version + mobile toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-[8px] font-mono text-white/15 uppercase tracking-widest">
            v2.0.4
          </div>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1px] bg-white/40 transition-all ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-5 h-[1px] bg-white/40 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1px] bg-white/40 transition-all ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/98 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                onClick={() => handleNav(item.id)}
                className="text-[12px] uppercase tracking-[0.4em] font-mono text-white/50 hover:text-white transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
            <div className="text-[9px] font-mono text-white/15 uppercase tracking-widest mt-4">
              Protocol: AX-CORE // v2.0.4
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES SECTION  — list/table layout (clearly distinct from Projects grid)
   ═══════════════════════════════════════════════════════════════ */
function ServicesSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <section
      id="services"
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-black/60 backdrop-blur-3xl border-t border-white/5"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full flex flex-col gap-16 py-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div className="flex flex-col gap-6">
            <motion.button
              variants={itemVariants}
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 hover:text-white transition-colors self-start"
            >
              <ArrowLeft size={12} /> Back to Top
            </motion.button>
            <div className="flex flex-col gap-3">
              <motion.h2
                variants={titleLineVariants}
                className="font-display font-medium text-3xl sm:text-4xl tracking-[0.1em] sm:tracking-widest uppercase"
              >
                Service Matrix //
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono"
              >
                AI-Powered Creative Services for Indian Founders
              </motion.p>
            </div>
          </div>
          <motion.div variants={itemVariants} className="text-[10px] font-mono text-white/20 uppercase tracking-widest text-left md:text-right leading-relaxed">
            <div>Brand · Web · D2C · Content</div>
            <div>Video · Growth Marketing</div>
          </motion.div>
        </div>

        {/* Services — expandable list rows */}
        <motion.div variants={containerVariants} className="flex flex-col gap-0">
          {SERVICES.map((svc, i) => {
            const isOpen = active === svc.code;
            return (
              <motion.div
                key={svc.code}
                variants={itemVariants}
                className="group border-b border-white/5 last:border-b-0"
              >
                {/* Row header — always visible */}
                <button
                  onClick={() => setActive(isOpen ? null : svc.code)}
                  className="w-full flex items-center gap-6 py-6 text-left transition-all duration-300 hover:bg-white/[0.015] px-2 -mx-2 rounded-sm"
                >
                  {/* Index */}
                  <span className="text-[9px] font-mono text-white/20 tracking-widest w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className={`shrink-0 transition-colors duration-300 ${isOpen ? "text-orange-400/80" : "text-white/20 group-hover:text-white/40"}`}>
                    {svc.icon}
                  </div>

                  {/* Title + what */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className={`font-display text-lg sm:text-xl uppercase tracking-widest transition-colors duration-300 ${isOpen ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
                      {svc.title}
                    </div>
                    <div className="text-[10px] font-mono text-white/25 tracking-widest truncate hidden sm:block">
                      {svc.what}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-white/15">Delivery</span>
                    <span className="text-[10px] font-mono text-white/40">{svc.timeline}</span>
                  </div>

                  {/* Toggle arrow */}
                  <div className={`shrink-0 text-white/20 transition-all duration-300 ${isOpen ? "rotate-180 text-white/50" : "group-hover:text-white/40"}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pb-8 px-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Description */}
                    <div className="flex flex-col gap-4">
                      <div className="text-[9px] uppercase tracking-[0.3em] font-mono text-orange-400/60">
                        {svc.code} // Overview
                      </div>
                      <p className="text-[13px] text-white/55 leading-relaxed font-light tracking-wide">
                        {svc.description}
                      </p>
                      <button
                        onClick={() => scrollTo("contact")}
                        className="self-start px-5 py-2.5 border border-white/10 text-[9px] uppercase tracking-[0.25em] font-mono text-white/35 hover:bg-white hover:text-black transition-all duration-300 mt-2"
                      >
                        Enquire About This →
                      </button>
                    </div>

                    {/* Deliverables */}
                    <div className="flex flex-col gap-4">
                      <div className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/20">
                        Deliverables //
                      </div>
                      <div className="flex flex-col gap-0 border-t border-white/5">
                        {svc.deliverables.map((d) => (
                          <div key={d} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                            <span className="text-orange-400/50 text-[10px]">→</span>
                            <span className="text-[11px] font-mono text-white/45">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA strip */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/5 pt-10">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
              Not sure which service fits?
            </p>
            <p className="text-[12px] text-white/45 font-light">
              Book a free 30-min call — we'll scope exactly what you need.
            </p>
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.35em] font-mono font-bold hover:bg-white/90 transition-all duration-300 flex items-center gap-3 group whitespace-nowrap"
          >
            Book Free Call <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════════════════════ */
function AboutSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-black border-t border-white/5"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full flex flex-col gap-16 py-12"
      >
        <SectionHeader
          scrollTo={() => scrollTo("hero")}
          title="Agency Profile"
          subtitle="Origins & Architecture // Hyderabad-Based · India-Built · World-Deployed"
        />

        {/* Main two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: narrative */}
          <motion.div variants={containerVariants} className="flex flex-col gap-8">
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-orange-400/70">
                Mission Statement
              </div>
              <blockquote className="font-display text-xl sm:text-2xl text-white/85 leading-relaxed italic tracking-wide border-l border-white/15 pl-6">
                "We don't build websites. We engineer digital ecosystems that shift market realities for the founders who dare to think differently."
              </blockquote>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 text-[13px] text-white/45 leading-relaxed font-light tracking-wide">
              <p>
                ProjectsByAxy is an AI-powered creative agency headquartered in Hyderabad, Telangana. Founded on the principle that India's next generation of founders deserves world-class digital infrastructure — at a fraction of traditional agency cost.
              </p>
              <p>
                We fuse bleeding-edge AI tooling with human creative judgment to deliver brand systems, web platforms, and marketing engines that generate compounding returns. Our work is measured in conversions, not aesthetics.
              </p>
              <p>
                Every engagement is direct with Axy — no junior hand-offs, no scope creep, no agency theatre. Just precision execution.
              </p>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/20">Core Stack</div>
              <div className="flex flex-wrap gap-2">
                {["Claude AI", "ChatGPT", "Next.js", "React", "Tailwind", "Supabase", "Stripe", "Shopify", "Vercel", "Framer"].map((t) => (
                  <span key={t} className="text-[9px] uppercase tracking-widest font-mono px-2.5 py-1 border border-white/10 text-white/30 hover:text-white/60 hover:border-white/30 transition-all cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: stats + founder card */}
          <motion.div variants={containerVariants} className="flex flex-col gap-8">
            {/* Stats grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {AGENCY_STATS.map((s) => (
                <div key={s.label} className="p-6 border border-white/5 bg-white/[0.02] flex flex-col gap-2 hover:border-white/10 transition-colors">
                  <div className="font-display text-3xl sm:text-4xl font-medium text-white/90 tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/30">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Founder card */}
            <motion.div
              variants={itemVariants}
              className="p-8 border-l-2 border-orange-400/30 bg-white/[0.02] flex flex-col gap-6"
            >
              <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-orange-400/70">
                AX-FOUNDER // Lead Architect
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-display text-xl uppercase tracking-widest text-white/90">AXY</div>
                <div className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                  Digital Architect & Systems Engineer
                </div>
              </div>
              <p className="text-[12px] text-white/40 font-light leading-relaxed tracking-wide">
                Specializing in AI-accelerated brand building, full-stack engineering, and performance marketing. Every project is a direct collaboration — no layers, no agency overhead.
              </p>
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
                  <Globe size={11} className="text-orange-400/50" />
                  <span>Hyderabad, Telangana — India</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
                  <Terminal size={11} className="text-orange-400/50" />
                  <span>mail@projectsbyaxy.com</span>
                </div>
              </div>
            </motion.div>

            {/* Certifications / badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {["AI-Certified", "Full-Stack", "D2C Specialist", "Made in India"].map((b) => (
                <div key={b} className="px-3 py-1.5 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.2em] font-mono text-white/30">
                  {b}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROCESS SECTION
   ═══════════════════════════════════════════════════════════════ */
function ProcessSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <section
      id="process"
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-black/60 backdrop-blur-3xl border-t border-white/5"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full flex flex-col gap-16 py-12"
      >
        <SectionHeader
          scrollTo={() => scrollTo("hero")}
          title="Execution Protocol"
          subtitle="4-Phase Deployment Pipeline // From Brief to Launch"
        />

        {/* Phases */}
        <div className="flex flex-col gap-0">
          {PROCESS_PHASES.map((phase, i) => (
            <motion.div
              key={phase.code}
              variants={cardVariants}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.015)" }}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-12 p-8 border-b border-white/5 transition-all duration-500 cursor-default"
            >
              {/* Animated left border on hover */}
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-white/60 group-hover:h-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />

              {/* Phase number */}
              <div className="flex-shrink-0 flex flex-col gap-1 md:w-24">
                <div className="font-display text-4xl sm:text-5xl text-white/[0.06] font-bold leading-none group-hover:text-white/12 transition-colors">
                  {phase.phase}
                </div>
                <div className="text-[9px] font-mono text-orange-400/60 uppercase tracking-[0.3em] group-hover:text-orange-400/90 transition-colors">
                  {phase.code}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-white/25 group-hover:text-white/60 transition-colors">
                    {phase.icon}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl uppercase tracking-[0.12em] text-white/70 group-hover:text-white/95 transition-colors">
                    {phase.title}
                  </h3>
                </div>
                <p className="text-[12px] sm:text-[13px] text-white/35 leading-relaxed font-light tracking-wide group-hover:text-white/55 transition-colors">
                  {phase.description}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap gap-6 pt-2 border-t border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-white/20">Duration</span>
                    <span className="text-[11px] font-mono text-white/50">{phase.duration}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-white/20">Output</span>
                    <span className="text-[11px] font-mono text-white/50">{phase.output}</span>
                  </div>
                </div>
              </div>

              {/* Step indicator */}
              <div className="hidden md:flex items-center self-center text-[9px] font-mono text-white/10 tracking-widest">
                {i < PROCESS_PHASES.length - 1 ? `→ ${PROCESS_PHASES[i + 1].code}` : "COMPLETE"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between border-t border-white/5 pt-12">
          <div className="text-[11px] font-mono text-white/25 uppercase tracking-widest">
            Average total delivery: <span className="text-white/50">14–45 Days</span>
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.35em] font-mono font-bold hover:bg-white/90 transition-all duration-300 flex items-center gap-3 group"
          >
            Start Protocol <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING SECTION
   ═══════════════════════════════════════════════════════════════ */
function PricingSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <section
      id="pricing"
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-black/60 backdrop-blur-3xl border-t border-white/5"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full flex flex-col gap-16 py-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div className="flex flex-col gap-6">
            <motion.button
              variants={itemVariants}
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 hover:text-white transition-colors self-start"
            >
              <ArrowLeft size={12} /> Back to Top
            </motion.button>
            <div className="flex flex-col gap-3">
              <motion.h2
                variants={titleLineVariants}
                className="font-display font-medium text-3xl sm:text-4xl tracking-[0.1em] sm:tracking-widest uppercase"
              >
                Pricing Tiers //
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-mono"
              >
                Transparent Pricing // Zero Hidden Fees // Milestone-Based Billing
              </motion.p>
            </div>
          </div>
          <motion.div variants={itemVariants} className="text-[10px] font-mono text-white/20 uppercase tracking-widest text-left md:text-right">
            <div>30% upfront · 40% on approval</div>
            <div>30% on delivery</div>
          </motion.div>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`group relative flex flex-col gap-8 p-8 transition-all duration-500 cursor-default ${
                tier.popular
                  ? "border border-white/20 bg-white/[0.04] shadow-[0_0_40px_rgba(255,255,255,0.04)]"
                  : "border border-white/5 bg-white/[0.02] hover:border-white/10"
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[8px] uppercase tracking-[0.3em] font-mono font-bold whitespace-nowrap">
                  Recommended
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/20 tracking-widest">{tier.id}</span>
                  <div className={`${tier.popular ? "text-orange-400/70" : "text-white/20 group-hover:text-white/40"} transition-colors`}>
                    {tier.icon}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className={`text-[9px] font-mono uppercase tracking-[0.3em] ${tier.popular ? "text-orange-400/80" : "text-white/25"}`}>
                    {tier.label}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-white/85 group-hover:text-white transition-colors">
                    {tier.name}
                  </h3>
                </div>
                <p className="text-[11px] text-white/35 font-light leading-relaxed tracking-wide">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1 border-y border-white/5 py-6">
                <div className={`font-display text-4xl font-medium tracking-tight ${tier.popular ? "text-white" : "text-white/70"}`}>
                  {tier.price}
                </div>
                <div className="text-[10px] font-mono text-white/25 tracking-widest">{tier.priceAlt}</div>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-3 flex-1">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check size={11} className={`flex-shrink-0 mt-0.5 ${tier.popular ? "text-orange-400/70" : "text-white/25"}`} />
                    <span className="text-[11px] text-white/40 font-light leading-snug group-hover:text-white/55 transition-colors">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollTo("contact")}
                className={`w-full py-4 text-[10px] uppercase tracking-[0.3em] font-mono font-bold transition-all duration-300 ${
                  tier.popular
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/10 text-white/40 hover:bg-white hover:text-black"
                }`}
              >
                Initialize Protocol →
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="inline-block px-6 py-2 border border-white/5 rounded-full text-[9px] uppercase tracking-[0.3em] font-mono text-white/20">
            Custom enterprise pricing available // Book a consultation call
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════════════════ */
/* ── Service → Package mapping ── */
const SERVICE_OPTIONS = [
  { id: "brand",   code: "S-01", label: "Brand Identity Design" },
  { id: "web",     code: "S-02", label: "Web Development" },
  { id: "store",   code: "S-03", label: "D2C Store Development" },
  { id: "ai",      code: "S-04", label: "AI Content Creation" },
  { id: "video",   code: "S-05", label: "Video & Reels" },
  { id: "growth",  code: "S-06", label: "Growth Marketing" },
] as const;

type ServiceId = typeof SERVICE_OPTIONS[number]["id"];

const PACKAGE_TIERS = [
  { id: "STARTER",     label: "STARTER — ₹24,999",     price: "₹24,999" },
  { id: "GROWTH",      label: "GROWTH — ₹49,999",      price: "₹49,999" },
  { id: "DOMINATION",  label: "DOMINATION — ₹74,999",  price: "₹74,999" },
] as const;

type PackageId = typeof PACKAGE_TIERS[number]["id"] | "";

function derivePackage(selected: ServiceId[]): PackageId {
  const count = selected.length;
  if (count === 0) return "";
  const hasStore  = selected.includes("store");
  const hasVideo  = selected.includes("video");
  const hasGrowth = selected.includes("growth");
  if (count >= 5 || (hasStore && hasVideo && hasGrowth)) return "DOMINATION";
  if (count >= 3) return "GROWTH";
  return "STARTER";
}

interface ContactForm {
  name: string; email: string; services: ServiceId[]; selectedPackage: PackageId; message: string;
}

function ContactSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", services: [], selectedPackage: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailFailed, setEmailFailed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (id: ServiceId) => {
    setForm(prev => {
      const next = prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id];
      return { ...prev, services: next, selectedPackage: derivePackage(next) };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setEmailFailed(false);
    const serviceLabels = form.services.map(id => SERVICE_OPTIONS.find(s => s.id === id)?.label ?? id);
    const projectType   = serviceLabels.join(", ") || "General Inquiry";
    const packageLabel  = form.selectedPackage
      ? PACKAGE_TIERS.find(p => p.id === form.selectedPackage)?.label ?? form.selectedPackage
      : "Not specified";

    try {
      /* 1 — persist to Supabase */
      const { error: dbErr } = await supabase.from('contact_inquiries').insert({
        name:             form.name,
        email:            form.email,
        project_type:     projectType,
        selected_package: form.selectedPackage || null,
        message:          form.message,
      });
      if (dbErr) console.error('[AXY] Supabase insert error:', dbErr);

      /* 2 — fire edge function directly (handles admin + confirmation emails) */
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const notifyRes = await fetch(`${supabaseUrl}/functions/v1/notify-new-inquiry`, {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          record: {
            name:             form.name,
            email:            form.email,
            project_type:     projectType,
            selected_package: packageLabel,
            message:          form.message,
            created_at:       new Date().toISOString(),
          },
        }),
      });

      if (!notifyRes.ok) {
        const errBody = await notifyRes.text().catch(() => "");
        console.error('[AXY] notify-new-inquiry failed:', notifyRes.status, errBody);
        if (dbErr) {
          throw new Error("Could not save or send your request. Please try again or email us directly.");
        }
        setEmailFailed(true);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('[AXY] Submission error:', err);
      setSubmitError(err instanceof Error ? err.message : "Transmission failed. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full bg-white/[0.03] border border-white/10 text-white/80 font-mono text-[12px] px-4 py-3 focus:outline-none focus:border-white/40 placeholder:text-white/20 transition-colors tracking-wide";

  return (
    <section
      id="contact"
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-black border-t border-white/5"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full flex flex-col gap-16 py-12"
      >
        <SectionHeader
          scrollTo={() => scrollTo("hero")}
          title="Intake Terminal"
          subtitle="Secure Communication Channel // Encrypted · Direct · Verified"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Form */}
          <motion.div variants={containerVariants} className="flex flex-col gap-8">
            <motion.div variants={itemVariants} className="text-[10px] uppercase tracking-[0.4em] font-mono text-orange-400/70">
              Submit Intake Request
            </motion.div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  {/* Name */}
                  <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/25">
                      Operator Name *
                    </label>
                    <input
                      name="name" type="text" required
                      placeholder="Your full name"
                      value={form.name} onChange={handleChange}
                      className={inputClass}
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/25">
                      Email Address *
                    </label>
                    <input
                      name="email" type="email" required
                      placeholder="your@email.com"
                      value={form.email} onChange={handleChange}
                      className={inputClass}
                    />
                  </motion.div>

                  {/* Services Checkboxes */}
                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/25">
                      Needed Services
                      <span className="ml-2 text-white/15 normal-case tracking-normal">— select all that apply</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {SERVICE_OPTIONS.map(svc => {
                        const checked = form.services.includes(svc.id);
                        return (
                          <button
                            key={svc.id}
                            type="button"
                            onClick={() => toggleService(svc.id)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 border text-left transition-all duration-200 group ${
                              checked
                                ? "border-orange-400/50 bg-orange-400/5 text-white/80"
                                : "border-white/8 bg-white/[0.02] text-white/35 hover:border-white/20 hover:text-white/55"
                            }`}
                          >
                            {/* custom checkbox */}
                            <span className={`flex-shrink-0 w-3.5 h-3.5 border flex items-center justify-center transition-all ${
                              checked ? "border-orange-400/70 bg-orange-400/20" : "border-white/20"
                            }`}>
                              {checked && <Check size={8} className="text-orange-400" />}
                            </span>
                            <span className="text-[9px] font-mono uppercase tracking-[0.15em] leading-tight">{svc.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Package — auto-locked, read-only display */}
                  <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/25">
                      Suggested Package
                      <span className="ml-2 text-white/15 normal-case tracking-normal">— auto-assigned from services</span>
                    </label>
                    <div className={`${inputClass} flex items-center justify-between cursor-default select-none ${
                      form.selectedPackage ? "border-orange-400/30 text-orange-400/80" : "text-white/20 italic"
                    }`}>
                      <span>
                        {form.selectedPackage
                          ? PACKAGE_TIERS.find(p => p.id === form.selectedPackage)?.label
                          : "Select services above to auto-assign"}
                      </span>
                      {form.selectedPackage && (
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Locked</span>
                      )}
                    </div>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/25">
                      Mission Brief *
                    </label>
                    <textarea
                      name="message" required rows={4}
                      placeholder="Describe your project, goals, timeline, and any specific requirements..."
                      value={form.message} onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </motion.div>

                  {/* Error */}
                  {submitError && (
                    <div className="text-[10px] font-mono text-red-400/70 border border-red-400/20 px-4 py-3 bg-red-400/5">
                      ⚠ {submitError}
                    </div>
                  )}

                  {/* Submit */}
                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-mono font-bold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group mt-2"
                    >
                      {submitting ? (
                        <>
                          <span className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Transmit Request
                          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </>
                      )}
                    </button>
                    <p className="text-[9px] font-mono text-white/20 text-center mt-3 uppercase tracking-widest">
                      Direct transmission // No email client // Secure channel
                    </p>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-6 py-16 border border-white/10 bg-white/[0.02]"
                >
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                    <Check size={24} className="text-white/80" />
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="font-display text-lg uppercase tracking-widest text-white/80">
                      Request Transmitted
                    </div>
                    <div className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                      Response within 24 hours // AX-PROTOCOL active
                    </div>
                    {emailFailed && (
                      <div className="text-[10px] font-mono text-orange-400/70 border border-orange-400/20 px-4 py-3 bg-orange-400/5 mt-2 max-w-sm">
                        ⚠ Your request was saved, but the confirmation email couldn't be sent. We'll still see your inquiry — feel free to reach out directly too.
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/25 hover:text-white transition-colors"
                  >
                    Send Another →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div variants={containerVariants} className="flex flex-col gap-10">

            {/* System status */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 p-6 border border-white/5 bg-white/[0.02]">
              <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-orange-400/70">
                System Status
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Communication Channel", value: "Active", ok: true },
                  { label: "Response Protocol", value: "< 24hrs", ok: true },
                  { label: "Availability", value: "Mon–Sat", ok: true },
                  { label: "Consultation Mode", value: "Free Initial Call", ok: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${s.ok ? "bg-green-400/70 shadow-[0_0_6px_rgba(74,222,128,0.6)]" : "bg-red-400/60"}`} />
                      <span className="text-[10px] font-mono text-white/55">{s.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact channels */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/20">
                Direct Channels
              </div>
              <div className="flex flex-col gap-0 border-t border-white/5">
                {[
                  { icon: <Mail size={13} />, label: "Email", value: "mail@projectsbyaxy.com", href: "mailto:mail@projectsbyaxy.com" },
                  { icon: <Phone size={13} />, label: "Phone / WhatsApp", value: "+91-9966402288", href: "tel:+919966402288" },
                  { icon: <MapPin size={13} />, label: "Location", value: "Gachibowli, Hyderabad, TG", href: null },
                  { icon: <Globe size={13} />, label: "Network", value: "projectsbyaxy.com", href: "https://projectsbyaxy.com" },
                ].map((c) => (
                  <div key={c.label} className="group flex items-start gap-4 py-4 border-b border-white/5">
                    <div className="text-white/20 group-hover:text-orange-400/60 transition-colors mt-0.5 flex-shrink-0">
                      {c.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[9px] uppercase tracking-widest font-mono text-white/20">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-[11px] font-mono text-white/50 hover:text-white transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-white/50">{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/20">
                Network Nodes
              </div>
              <div className="flex gap-3">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com/company/projectsbyaxy" },
                  { label: "Instagram", href: "https://instagram.com/projectsbyaxy" },
                  { label: "GitHub", href: "https://github.com/projectsbyaxy" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-white/10 text-[9px] uppercase tracking-[0.2em] font-mono text-white/30 hover:text-white hover:border-white/40 transition-all"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Bottom encrypted note */}
        <motion.div variants={itemVariants} className="text-center border-t border-white/5 pt-12">
          <div className="inline-block px-6 py-2 border border-white/5 rounded-full text-[9px] uppercase tracking-[0.3em] font-mono text-white/15">
            AX-INTAKE-PROTOCOL // All communications encrypted // Secure Channel Active
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAdmin, setShowAdmin] = useState(() => window.location.hash === "#admin");

  useEffect(() => {
    const handleHash = () => setShowAdmin(window.location.hash === "#admin");
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  if (showAdmin) {
    return <AdminPanel onExit={() => { window.location.hash = ""; setShowAdmin(false); }} />;
  }

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsLoading(true);
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative">

      {/* ── FIXED BACKGROUND LAYER (unchanged from original) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-11 bg-orange-950/20 mix-blend-overlay" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        <div
          className="absolute inset-0 z-20 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(circle at 60% 40%, rgba(255, 140, 0, 0.15) 0%, transparent 60%)" }}
        />
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ddn0iLywygnKtQwSoAneEWDjqL/hf_20260512_220752_0c6a2c44-513c-466b-9868-3094eed07efa.mp4"
          />
        </div>
      </div>

      {/* ── FIXED NAV ── */}
      <NavBar scrollTo={scrollTo} />

      <main className="relative z-10 flex flex-col items-center">

        {/* ══ HERO (ORIGINAL — UNTOUCHED) ══════════════════════════ */}
        <section
          id="hero"
          className="min-h-screen w-full relative flex flex-col items-center justify-center p-6 sm:p-12"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-7xl h-full min-h-[600px] relative"
          >
            <div className="lg:absolute lg:top-0 lg:left-0 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 max-w-md">
              <div className="relative">
                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase relative z-10 flex flex-col leading-[1.1]">
                  <motion.span variants={titleLineVariants}>
                    <span className="text-white/40">PROJECTSBYAXY //</span> <span className="text-white">AI SOLUTIONS</span>
                  </motion.span>
                </h1>
              </div>
              <motion.p variants={itemVariants} className="text-[12px] sm:text-[13px] text-white/50 leading-relaxed font-light tracking-wide max-w-sm">
                Empowering businesses and scaling growth through precision-engineered digital projects and expert neural logic. Shift your reality.
              </motion.p>
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                {([
                  { icon: <Palette size={15} />, label: "Brand" },
                  { icon: <Monitor size={15} />, label: "Web" },
                  { icon: <Video size={15} />,   label: "Video" },
                ] as { icon: React.ReactNode; label: string }[]).map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => scrollTo("services")}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/60 transition-all">
                      {icon}
                    </div>
                    <span className="text-[8px] uppercase tracking-[0.2em] font-mono text-white/20 group-hover:text-white/50 transition-colors">
                      {label}
                    </span>
                  </button>
                ))}
              </motion.div>
            </div>



            <motion.div variants={itemVariants} className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 mt-16 lg:mt-0 w-full max-w-xs flex flex-col gap-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-orange-400/80 font-mono text-center lg:text-left">
                Technical Specs
              </div>
              <div className="flex flex-col border-t border-white/10">
                <SpecRow label="Agency" value="ProjectsByAxy Solutions" />
                <SpecRow label="Logic" value="Advanced ai solutions" />
                <SpecRow label="Flow" value="High-Velocity Delivery" />
                <SpecRow label="Stack" value="Claude Ai , Chatgpt , Saas, Full Stack , Cloud Ops , Video edits & content creation." />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:absolute lg:bottom-0 lg:left-0 mt-16 lg:mt-0 max-w-sm w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400/20 to-transparent border border-white/5 rounded-lg overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200&h=200" alt="Neural Core" className="w-full h-full object-cover opacity-60 mix-blend-overlay" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[10px] font-mono text-orange-400/80 tracking-[0.2em] uppercase">
                  AX-01: <span className="text-white">DIGITAL CORE</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  Custom high-velocity web platform engineered for enterprise scale and speed.
                </p>
                <button onClick={() => scrollTo("projects")} className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded text-[9px] uppercase tracking-[0.2em] font-mono hover:bg-white hover:text-black transition-all">
                  View Project
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:absolute lg:bottom-0 lg:right-0 lg:mb-2 mt-12 lg:mt-0 flex flex-wrap justify-center lg:justify-end items-center gap-3">
              {["AI-POWERED", "D2C READY", "FULL-STACK", "BRAND-FIRST"].map((badge) => (
                <div key={badge} className="px-4 py-1.5 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.25em] font-mono text-white/40 hover:text-white hover:border-white/40 transition-all cursor-default">
                  {badge}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ══ SERVICES (NEW) ═══════════════════════════════════════ */}
        <ServicesSection scrollTo={scrollTo} />

        {/* ══ ABOUT (NEW) ══════════════════════════════════════════ */}
        <AboutSection scrollTo={scrollTo} />

        {/* ══ PROCESS (NEW) ════════════════════════════════════════ */}
        <ProcessSection scrollTo={scrollTo} />

        {/* ══ PROJECTS (ORIGINAL — UNTOUCHED) ═════════════════════ */}
        <section
          id="projects"
          className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-black/60 backdrop-blur-3xl border-t border-white/5"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl w-full flex flex-col gap-16 py-12"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
              <div className="flex flex-col gap-6">
                <motion.button variants={itemVariants} onClick={() => scrollTo("hero")} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 hover:text-white transition-colors self-start">
                  <ArrowLeft size={12} /> Back to Top
                </motion.button>
                <div className="flex flex-col gap-3">
                  <motion.h2 variants={titleLineVariants} className="font-display font-medium text-3xl sm:text-4xl tracking-[0.1em] sm:tracking-widest uppercase">
                    Deployed Projects //
                  </motion.h2>
                  <motion.p variants={itemVariants} className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono">
                    Neural Deployments & Market Disruption
                  </motion.p>
                </div>
              </div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono text-white/60">
                <span className="whitespace-nowrap">Filter: All</span>
                <div className="w-[1px] h-4 bg-white/20" />
                <span className="whitespace-nowrap">2024-2025</span>
              </motion.div>
            </div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id} title={project.title} description={project.description}
                  tech={project.tech} icon={project.icon}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center border-t border-white/5 pt-12">
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-mono">
                [ End of Index — Request Full Portfolio ]
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ PRICING (NEW) ════════════════════════════════════════ */}
        <PricingSection scrollTo={scrollTo} />

        {/* ══ NETWORK FEEDBACK (ORIGINAL — UNTOUCHED) ═════════════ */}
        <section
          id="testimonials"
          className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-black border-t border-white/5"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl w-full flex flex-col gap-16 py-12"
          >
            <div className="flex flex-col gap-6 border-b border-white/10 pb-12">
              <motion.button variants={itemVariants} onClick={() => scrollTo("hero")} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 hover:text-white transition-colors self-start">
                <ArrowLeft size={12} /> Back to Top
              </motion.button>
              <div className="flex flex-col gap-3">
                <motion.h2 variants={titleLineVariants} className="font-display font-medium text-3xl sm:text-4xl tracking-[0.1em] sm:tracking-widest uppercase">
                  Network Feedback //
                </motion.h2>
                <motion.p variants={itemVariants} className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono">
                  Verifications from Industry Leaders
                </motion.p>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <TestimonialCard quote="ProjectsByAxy transformed our legacy data pipeline into a real-time neural engine. The speed of iteration was unprecedented." author="Marcus Thorne" role="CTO, Flux Dynamics" id="VR-012" />
              <TestimonialCard quote="The V2 deployment exceeded our expectations for search accuracy. A true shift in our digital core." author="Sarah Jenkins" role="Lead AI Architect, NeoSystems" id="VR-084" />
              <TestimonialCard quote="Precision, high-velocity delivery, and absolute clarity. The team at Axy doesn't just build, they architect futures." author="Elena Vance" role="CEO, Astral Tech" id="VR-103" />
            </div>

            <motion.div variants={itemVariants} className="text-center pt-8">
              <div className="inline-block px-6 py-2 border border-white/5 rounded-full text-[9px] uppercase tracking-[0.3em] font-mono text-white/20">
                Encrypted Feedback Channel // Secure
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ CONTACT (NEW) ════════════════════════════════════════ */}
        <ContactSection scrollTo={scrollTo} />

      </main>

      {/* ── GLOBAL LOADER OVERLAY (ORIGINAL — UNTOUCHED) ── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
              <div className="flex justify-around w-full h-full text-[10px] font-mono text-white whitespace-pre select-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div key={i} animate={{ y: ["-100%", "100%"] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}>
                    {Array.from({ length: 40 }, () => (Math.random() > 0.5 ? "0" : "1")).join("\n")}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-12 max-w-sm w-full px-6">
              <div className="relative">
                <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }} className="relative z-10 w-32 h-32 flex items-center justify-center text-white">
                  <Cpu size={64} strokeWidth={0.5} className="opacity-80" />
                  <div className="absolute inset-x-0 inset-y-0 border border-white/10 rounded-full animate-[spin_4s_linear_infinite]" />
                  <div className="absolute inset-x-[-10px] inset-y-[-10px] border border-white/5 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                </motion.div>
                <motion.div animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
              </div>
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex flex-col items-center gap-2">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.6em] font-mono text-white/80">Neural Synchronizing</motion.div>
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Protocol: AX-CORE // v2.0.4</div>
                </div>
                <div className="w-full bg-white/[0.02] border border-white/10 p-4 font-mono text-[8px] sm:text-[9px] text-white/40 flex flex-col gap-1 rounded-sm h-32 overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/80 to-transparent z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <motion.div animate={{ y: [0, -200] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="flex flex-col gap-1">
                    <div className="text-white/60">[ AUTH ] EXCHANGING HANDSHAKE...</div>
                    <div>[ INFO ] INITIALIZING NEURAL BUFFER_01</div>
                    <div className="text-white/60">[ SCAN ] VERIFYING IDENTITY TOKEN: 0x88f2...</div>
                    <div>[ INFO ] MAPPING INFRASTRUCTURE TOPOLOGY</div>
                    <div className="text-white/30">[ LOG ] ALLOCATING MEMORY: 512MB RAM</div>
                    <div className="text-white/60">[ SYNC ] ESTABLISHING CLOUD_BRIDGE...</div>
                    <div className="text-green-500/40">[ SUCCESS ] PORTAL_READY: TRUE</div>
                    <div>[ INFO ] CACHING ASSETS FOR HIGH_VELOCITY</div>
                    <div className="text-white/60">[ AUTH ] EXCHANGING HANDSHAKE...</div>
                    <div>[ INFO ] INITIALIZING NEURAL BUFFER_01</div>
                    <div className="text-white/60">[ SCAN ] VERIFYING IDENTITY TOKEN: 0x88f2...</div>
                  </motion.div>
                </div>
                <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                  <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROJECT MODAL (ORIGINAL — UNTOUCHED) ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Decorative sparkle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed bottom-12 right-12 text-white/20 pointer-events-none z-10"
      >
        <Sparkles size={24} strokeWidth={1} />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HELPER COMPONENTS (all original — untouched)
   ═══════════════════════════════════════════════════════════════ */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center py-4 border-b border-white/10 group gap-2 xs:gap-8">
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/40 font-mono group-hover:text-orange-400 transition-colors shrink-0">
        {label}
      </span>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-white/80 font-mono group-hover:text-white transition-colors text-left flex-1">
        {value}
      </span>
    </div>
  );
}

function TestimonialCard({ quote, author, role, id }: { quote: string; author: string; role: string; id: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
      whileHover={{ scale: 1.015, backgroundColor: "rgba(255,255,255,0.02)" }}
      className="group relative flex flex-col gap-6 p-8 border-l border-white/10 hover:border-white/60 transition-all duration-500 cursor-default"
    >
      <div className="absolute top-0 left-[-1px] w-[2px] h-0 bg-white group-hover:h-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      <div className="text-[10px] font-mono text-white/20 tracking-[0.4em]">{id} // IDENTITY_VERIFIED</div>
      <p className="font-display text-lg md:text-xl text-white/90 leading-relaxed italic tracking-wide group-hover:text-white transition-colors">
        "{quote}"
      </p>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-white/70">{author}</span>
        <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/30">{role}</span>
      </div>
    </motion.div>
  );
}

interface ProjectCardProps { id: string; title: string; description: string; tech: string[]; icon: ReactNode; onClick?: () => void; }

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, tech, icon, onClick }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
    whileHover={{ scale: 1.02, y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}
    onClick={onClick}
    className="group flex flex-col gap-6 p-8 border border-white/5 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 rounded-sm cursor-pointer"
  >
    <div className="flex justify-between items-start">
      <div className="text-[10px] font-mono text-white/20 tracking-widest">{id}</div>
      <div className="text-white/30 group-hover:text-white transition-colors duration-500">{icon}</div>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="font-display text-xl uppercase tracking-widest font-medium text-white/90 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-[12px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors font-light tracking-wide">{description}</p>
    </div>
    <div className="flex flex-wrap gap-3 mt-auto">
      {tech.map((t) => (
        <span key={t} className="text-[9px] uppercase tracking-widest font-mono px-2 py-1 bg-white/5 text-white/30 group-hover:text-white/60 transition-colors">{t}</span>
      ))}
    </div>
  </motion.div>
);

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full border border-white/10 transition-all group">
          <X size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-8 left-8 flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">{project.icon}</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Protocol</span>
              <span className="text-sm font-mono text-white tracking-widest">{project.id}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-orange-400/80 tracking-[0.4em] uppercase">
              <ShieldCheck size={12} /> Verification_Active
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest leading-tight">{project.title}</h2>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/20">Abstract // Summary</div>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light tracking-wide italic">"{project.fullDescription}"</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/20">Operational Specs //</div>
            <div className="grid grid-cols-2 gap-4">
              {project.specs.map(spec => (
                <div key={spec.label} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                  <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{spec.label}</div>
                  <div className="text-[11px] font-mono text-white/80">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto pt-8 flex flex-wrap gap-4 items-center">
            <button className="flex-1 px-8 py-4 bg-white text-black text-[11px] uppercase tracking-[0.4em] font-mono font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-3 group">
              Launch Instance <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 border border-white/10 rounded text-[9px] font-mono text-white/30 uppercase tracking-widest">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ADMIN PANEL v2.1  — Supabase-powered, full cyberpunk redesign
   Access:   navigate to  /#admin
   Login:    Supabase Auth (email + password)
             Create your admin user in: Supabase Dashboard → Auth → Users
   DB:       contact_inquiries table (see .env.example for SQL)
   ═══════════════════════════════════════════════════════════════════════ */

type AdminView = "command" | "inquiries" | "analytics" | "projects" | "settings";

function AdminPanel({ onExit }: { onExit: () => void }) {
  /* ── Auth ── */
  const [session, setSession]       = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  /* ── Data ── */
  const [view, setView]                     = useState<AdminView>("command");
  const [inquiries, setInquiries]           = useState<Inquiry[]>([]);
  const [dbLoading, setDbLoading]           = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [notes, setNotes]                   = useState("");
  const [savingNotes, setSavingNotes]       = useState(false);
  const [filter, setFilter]                 = useState<"all" | "new" | "read" | "replied" | "archived">("all");
  const [notification, setNotification]     = useState<string | null>(null);
  const [connected, setConnected]           = useState(false);

  /* ── Auth effect ── */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  /* ── Data fetch + realtime ── */
  useEffect(() => {
    if (!session) return;
    setDbLoading(true);
    supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setInquiries(data as Inquiry[]); setDbLoading(false); });

    const channel = supabase
      .channel("admin-inquiries")
      .on("postgres_changes", { event: "*", schema: "public", table: "contact_inquiries" },
        (payload: any) => {
          if (payload.eventType === "INSERT") {
            setInquiries(p => [payload.new as Inquiry, ...p]);
            setNotification(`New inquiry from ${payload.new.name}`);
            setTimeout(() => setNotification(null), 4500);
          } else if (payload.eventType === "UPDATE") {
            setInquiries(p => p.map(i => i.id === payload.new.id ? payload.new as Inquiry : i));
            setSelectedInquiry(p => p?.id === payload.new.id ? payload.new as Inquiry : p);
          } else if (payload.eventType === "DELETE") {
            setInquiries(p => p.filter(i => i.id !== (payload.old as Inquiry).id));
            setSelectedInquiry(p => p?.id === (payload.old as Inquiry).id ? null : p);
          }
        })
      .subscribe(status => setConnected(status === "SUBSCRIBED"));

    return () => { supabase.removeChannel(channel); };
  }, [session]);

  /* ── Login handler ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
    setLoginLoading(false);
  };

  /* ── Inquiry ops ── */
  const updateStatus = async (id: string, status: string) => {
    await supabase.from("contact_inquiries").update({ status }).eq("id", id);
  };
  const saveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    await supabase.from("contact_inquiries").update({ notes }).eq("id", selectedInquiry.id);
    setSavingNotes(false);
  };
  const deleteInquiry = async (id: string) => {
    if (!window.confirm("Delete this inquiry permanently?")) return;
    await supabase.from("contact_inquiries").delete().eq("id", id);
    setSelectedInquiry(null);
  };
  const selectInquiry = async (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNotes(inq.notes ?? "");
    if (inq.status === "new") await updateStatus(inq.id, "read");
  };

  /* ── Chart data ── */
  const todayStr = new Date().toISOString().split("T")[0];
  const chartDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { key: d.toISOString().split("T")[0], label: d.toLocaleDateString("en", { weekday: "short" }).toUpperCase() };
  });
  const chartData = chartDays.map(d => ({
    ...d, count: inquiries.filter(i => i.created_at.startsWith(d.key)).length,
  }));
  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  const newCount      = inquiries.filter(i => i.status === "new").length;
  const repliedCount  = inquiries.filter(i => i.status === "replied").length;
  const todayCount    = inquiries.filter(i => i.created_at.startsWith(todayStr)).length;
  const filtered      = filter === "all" ? inquiries : inquiries.filter(i => i.status === filter);

  const statusColor: Record<string, string> = {
    new: "text-orange-400", read: "text-white/30", replied: "text-green-400/70", archived: "text-white/15",
  };
  const M = "font-mono text-[9px] uppercase tracking-[0.18em]";

  /* ── Loading ── */
  if (authLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className={`${M} text-white/25`}>Initializing AX-Core...</div>
    </div>
  );

  /* ════════════════════════ LOGIN SCREEN ════════════════════════ */
  if (!session) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6"
      style={{ background: "radial-gradient(circle at 50% 40%, rgba(249,115,22,0.05) 0%, transparent 60%)" }}>
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm flex flex-col gap-8"
      >
        {/* Animated scan line */}
        <div className="relative h-px w-full overflow-hidden">
          <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
        </div>

        <div className="flex flex-col gap-3">
          <div className={`${M} text-orange-400/70`}>AX-ADMIN // Secure Portal v2.1</div>
          <h1 className="font-display text-4xl uppercase tracking-widest text-white/90">Admin Login</h1>
          <p className={`${M} text-white/20`}>Supabase auth required to access control center</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {[
            { label: "Email Address", type: "email", val: email, set: setEmail, ph: "admin@projectsbyaxy.com" },
            { label: "Password",      type: "password", val: password, set: setPassword, ph: "••••••••••" },
          ].map(f => (
            <div key={f.label} className="flex flex-col gap-1.5">
              <label className={`${M} text-white/25`}>{f.label}</label>
              <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} required placeholder={f.ph} autoComplete={f.type === "email" ? "email" : "current-password"}
                className="w-full bg-white/[0.03] border border-white/10 text-white/80 font-mono text-[12px] px-4 py-3 focus:outline-none focus:border-orange-400/40 placeholder:text-white/15 tracking-wide transition-colors" />
            </div>
          ))}
          {loginError && (
            <div className="flex items-center gap-2 border border-red-400/20 bg-red-400/[0.04] px-3 py-2">
              <span className={`${M} text-red-400/70`}>{loginError}</span>
            </div>
          )}
          <button type="submit" disabled={loginLoading}
            className="w-full py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-orange-50 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-2">
            {loginLoading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 border border-black/30 border-t-black rounded-full" />
                Authenticating...
              </>
            ) : "Authenticate →"}
          </button>
        </form>

        <button onClick={onExit} className={`${M} text-white/15 hover:text-white/40 transition-colors self-center`}>
          ← Return to Site
        </button>

        <div className="relative h-px w-full overflow-hidden">
          <motion.div animate={{ x: ["200%", "-100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  );

  /* ════════════════════════ ADMIN SHELL ════════════════════════ */
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Live notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -16, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -16, x: "-50%" }}
            style={{ position: "fixed", top: "56px", left: "50%", zIndex: 200 }}
            className="flex items-center gap-3 px-5 py-3 bg-orange-400 text-black"
          >
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.6, repeat: 3 }}
              className="w-2 h-2 rounded-full bg-black/40" />
            <span className={`${M} font-bold`}>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <header className="h-12 shrink-0 flex items-center justify-between px-5 border-b border-white/5 bg-black/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className={`${M} text-orange-400/80`}>AX-ADMIN</span>
          <span className={`${M} text-white/10`}>//</span>
          <span className={`${M} text-white/20`}>Control Center</span>
        </div>

        <div className="flex items-center gap-5">
          {/* Realtime status */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={connected ? { opacity: [1, 0.4, 1] } : { opacity: 0.3 }}
              transition={connected ? { duration: 2, repeat: Infinity } : {}}
              className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400" : "bg-white/20"}`}
              style={connected ? { boxShadow: "0 0 6px rgba(74,222,128,0.7)" } : {}}
            />
            <span className={`${M} text-white/15`}>{connected ? "Supabase Live" : "Connecting..."}</span>
          </div>

          <div className="w-px h-3 bg-white/10" />

          <button onClick={onExit} className={`${M} text-white/20 hover:text-white/60 transition-colors flex items-center gap-1.5`}>
            <X size={10} /> Exit
          </button>
          <button onClick={() => supabase.auth.signOut()} className={`${M} text-red-400/30 hover:text-red-400/60 transition-colors`}>
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="w-44 shrink-0 border-r border-white/5 flex flex-col bg-[#030303]">
          <nav className="flex flex-col gap-0.5 p-2 flex-1 pt-3">
            {([
              { id: "command",   label: "Command",   badge: 0 },
              { id: "inquiries", label: "Inquiries",  badge: newCount },
              { id: "analytics", label: "Analytics",  badge: 0 },
              { id: "projects",  label: "Projects",   badge: 0 },
              { id: "settings",  label: "Settings",   badge: 0 },
            ] as { id: AdminView; label: string; badge: number }[]).map(item => (
              <button key={item.id} onClick={() => setView(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm transition-all duration-150 text-left w-full ${
                  view === item.id ? "bg-white/[0.05] border border-white/[0.08]" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${view === item.id ? "bg-orange-400" : "bg-white/10"}`} />
                <span className={`${M} flex-1 ${view === item.id ? "text-white/80" : "text-white/25"}`}>{item.label}</span>
                {item.badge > 0 && (
                  <span className="text-[8px] font-mono bg-orange-400/20 text-orange-400 px-1.5 py-0.5 rounded-sm">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-white/5">
            <div className={`${M} text-white/10`}>AX-Core v2.1</div>
            <div className={`${M} text-white/[0.07] mt-0.5`}>Supabase-Linked</div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto bg-[#030303]">
          <div className="p-6 max-w-5xl">

            {/* ════ COMMAND (Dashboard) ════ */}
            {view === "command" && (
              <div className="flex flex-col gap-6">
                <div>
                  <div className={`${M} text-orange-400/50 mb-1`}>01 // Overview</div>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-white/75">Command Center</h2>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: "Total Inquiries", value: inquiries.length,  hot: false },
                    { label: "New / Unread",     value: newCount,          hot: true  },
                    { label: "Replied",          value: repliedCount,      hot: false },
                    { label: "Today",            value: todayCount,        hot: false },
                  ].map(s => (
                    <motion.div key={s.label} whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
                      className="p-5 border border-white/[0.04] bg-white/[0.015] cursor-default">
                      {dbLoading ? (
                        <div className="h-10 flex items-center">
                          <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }}
                            className="w-12 h-7 bg-white/[0.06] rounded-sm" />
                        </div>
                      ) : (
                        <div className={`font-display text-4xl font-medium leading-none mb-2 ${s.hot ? "text-orange-400" : "text-white/65"}`}>
                          {s.value}
                        </div>
                      )}
                      <div className={`${M} text-white/20`}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Weekly chart */}
                <div className="border border-white/[0.04] bg-white/[0.01] p-5">
                  <div className={`${M} text-white/20 mb-5`}>Inquiries — Last 7 Days //</div>
                  <div className="flex items-end gap-2" style={{ height: 80 }}>
                    {chartData.map(d => {
                      const isToday = d.key === todayStr;
                      const pct = maxCount > 0 ? (d.count / maxCount) * 100 : 0;
                      return (
                        <div key={d.key} className="flex-1 flex flex-col items-center gap-1.5">
                          {d.count > 0 && (
                            <div className={`${M} text-[8px] ${isToday ? "text-orange-400" : "text-white/25"}`}>{d.count}</div>
                          )}
                          <div className="w-full flex items-end flex-1">
                            <motion.div
                              initial={{ height: 0 }} animate={{ height: `${Math.max(pct, d.count > 0 ? 6 : 0)}%` }}
                              transition={{ duration: 0.6, delay: 0.05 * chartData.indexOf(d) }}
                              className={`w-full rounded-sm ${isToday ? "bg-orange-400/50" : "bg-white/[0.08]"}`}
                              style={{ minHeight: d.count > 0 ? 3 : 0 }}
                            />
                          </div>
                          <div className={`${M} text-[7px] ${isToday ? "text-orange-400/50" : "text-white/15"}`}>{d.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent feed */}
                <div className="border border-white/[0.04]">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
                    <div className={`${M} text-white/20`}>Recent Inquiries // Live Feed</div>
                    {connected && (
                      <div className="flex items-center gap-1.5">
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                          className="w-1 h-1 rounded-full bg-green-400" />
                        <span className={`${M} text-white/15`}>Live</span>
                      </div>
                    )}
                  </div>

                  {dbLoading ? (
                    <div className={`${M} text-white/10 py-10 text-center`}>Fetching from Supabase...</div>
                  ) : inquiries.length === 0 ? (
                    <div className="py-12 flex flex-col items-center gap-2">
                      <div className={`${M} text-white/10`}>No inquiries yet</div>
                      <div className={`${M} text-white/[0.07]`}>Contact form submissions appear here in real-time</div>
                    </div>
                  ) : inquiries.slice(0, 8).map((inq, i) => (
                    <motion.button key={inq.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => { selectInquiry(inq); setView("inquiries"); }}
                      className="w-full flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors text-left">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${inq.status === "new" ? "bg-orange-400" : "bg-white/[0.08]"}`}
                        style={inq.status === "new" ? { boxShadow: "0 0 5px rgba(251,146,60,0.6)" } : {}} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-white/55 font-display uppercase tracking-wider truncate">{inq.name}</div>
                        <div className={`${M} text-white/20 mt-0.5`}>{inq.project_type}</div>
                      </div>
                      <div className={`${M} ${statusColor[inq.status]} shrink-0`}>{inq.status}</div>
                      <div className={`${M} text-white/15 shrink-0`}>{new Date(inq.created_at).toLocaleDateString("en-IN")}</div>
                    </motion.button>
                  ))}

                  {inquiries.length > 8 && (
                    <button onClick={() => setView("inquiries")} className={`${M} text-white/20 hover:text-white/50 transition-colors p-4 w-full text-center`}>
                      View all {inquiries.length} inquiries →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ════ INQUIRIES ════ */}
            {view === "inquiries" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between flex-wrap gap-4">
                  <div>
                    <div className={`${M} text-orange-400/50 mb-1`}>02 // Inbox</div>
                    <h2 className="font-display text-2xl uppercase tracking-widest text-white/75">Inquiries</h2>
                  </div>
                  {/* Filter pills */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {(["all","new","read","replied","archived"] as const).map(f => (
                      <button key={f} onClick={() => setFilter(f)}
                        className={`${M} px-3 py-1.5 border transition-all ${filter === f ? "border-white/20 text-white/60 bg-white/[0.04]" : "border-white/[0.06] text-white/20 hover:border-white/15"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {dbLoading ? (
                  <div className={`${M} text-white/10 py-16 text-center`}>Fetching from Supabase...</div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {/* List panel */}
                    <div className="border border-white/[0.04] flex flex-col">
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
                        <span className={`${M} text-white/15`}>{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
                        {filtered.length > 0 && (
                          <button onClick={async () => { for (const i of filtered) await updateStatus(i.id, "archived"); }}
                            className={`${M} text-white/15 hover:text-white/40 transition-colors`}>Archive all</button>
                        )}
                      </div>
                      <div className="overflow-y-auto" style={{ maxHeight: 540 }}>
                        {filtered.length === 0 ? (
                          <div className={`${M} text-white/10 py-12 text-center`}>No {filter === "all" ? "" : filter} inquiries</div>
                        ) : filtered.map((inq, i) => (
                          <motion.button key={inq.id}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                            onClick={() => selectInquiry(inq)}
                            className={`w-full flex items-start gap-3 p-4 border-b border-white/[0.03] text-left transition-all ${
                              selectedInquiry?.id === inq.id ? "bg-white/[0.04] border-l-2 border-l-orange-400/40" : "hover:bg-white/[0.02]"
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${inq.status === "new" ? "bg-orange-400" : "bg-white/[0.08]"}`}
                              style={inq.status === "new" ? { boxShadow: "0 0 4px rgba(251,146,60,0.5)" } : {}} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 justify-between">
                                <span className="text-[11px] text-white/60 font-display uppercase tracking-wider truncate">{inq.name}</span>
                                <span className={`${M} ${statusColor[inq.status]} text-[8px] shrink-0`}>{inq.status}</span>
                              </div>
                              <div className={`${M} text-white/20 mt-0.5`}>{inq.project_type}</div>
                              <p className="text-[10px] text-white/20 mt-1 truncate">{inq.message}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Detail pane */}
                    {selectedInquiry ? (
                      <motion.div key={selectedInquiry.id}
                        initial={{ opacity: 0, x: 10, filter: "blur(6px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="border border-white/[0.04] p-5 flex flex-col gap-5 overflow-y-auto" style={{ maxHeight: 580 }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className={`${M} text-orange-400/50 mb-1`}># {selectedInquiry.id.slice(0, 8).toUpperCase()}</div>
                            <h3 className="font-display text-xl uppercase tracking-wider text-white/80">{selectedInquiry.name}</h3>
                          </div>
                          <button onClick={() => setSelectedInquiry(null)} className="text-white/15 hover:text-white/50 transition-colors">
                            <X size={14} />
                          </button>
                        </div>

                        {/* Meta */}
                        <div className="border-t border-white/[0.04]">
                          {[
                            { label: "Email",    value: selectedInquiry.email },
                            { label: "Service",  value: selectedInquiry.project_type },
                            { label: "Received", value: new Date(selectedInquiry.created_at).toLocaleString("en-IN") },
                          ].map(row => (
                            <div key={row.label} className="flex justify-between items-start py-2.5 border-b border-white/[0.04]">
                              <span className={`${M} text-white/25 shrink-0`}>{row.label}</span>
                              <span className={`${M} text-white/55 text-right ml-4`}>{row.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Message */}
                        <div>
                          <div className={`${M} text-white/20 mb-2`}>Message //</div>
                          <div className="text-[11px] text-white/45 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3">
                            {selectedInquiry.message}
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <div className={`${M} text-white/20 mb-2`}>Private Notes //</div>
                          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                            placeholder="Add your notes about this lead..."
                            className="w-full bg-white/[0.02] border border-white/[0.07] text-white/55 font-mono text-[11px] px-3 py-2.5 focus:outline-none focus:border-orange-400/30 placeholder:text-white/15 resize-none tracking-wide transition-colors"
                          />
                          <button onClick={saveNotes} disabled={savingNotes}
                            className={`${M} mt-2 float-right px-4 py-1.5 border border-white/[0.08] text-white/25 hover:text-white/55 hover:border-white/20 transition-all disabled:opacity-40`}>
                            {savingNotes ? "Saving..." : "Save Notes"}
                          </button>
                          <div style={{ clear: "both" }} />
                        </div>

                        {/* Status */}
                        <div>
                          <div className={`${M} text-white/20 mb-2`}>Status Pipeline //</div>
                          <div className="flex flex-wrap gap-1.5">
                            {(["new","read","replied","archived"] as const).map(s => (
                              <button key={s} onClick={() => updateStatus(selectedInquiry.id, s)}
                                className={`${M} px-3 py-1.5 border transition-all ${
                                  selectedInquiry.status === s
                                    ? "border-white/25 text-white/65 bg-white/[0.04]"
                                    : "border-white/[0.06] text-white/20 hover:border-white/15"
                                }`}>
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2 border-t border-white/[0.04]">
                          <a
                            href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.project_type || "Your Inquiry")} — ProjectsByAxy`}
                            className="flex-1 py-3 bg-white text-black font-mono text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-orange-50 transition-all text-center"
                          >
                            Reply via Email →
                          </a>
                          <button onClick={() => deleteInquiry(selectedInquiry.id)}
                            className={`${M} px-4 border border-red-400/[0.08] text-red-400/25 hover:border-red-400/30 hover:text-red-400/55 transition-all`}>
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="border border-white/[0.04] flex items-center justify-center" style={{ minHeight: 200 }}>
                        <div className={`${M} text-white/10`}>Select an inquiry to view details</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ════ ANALYTICS ════ */}
            {view === "analytics" && (() => {
              // Service breakdown
              const serviceTypes = [...new Set(inquiries.map((i: Inquiry) => i.project_type).filter(Boolean))] as string[];
              const serviceBreakdown = serviceTypes
                .map(type => ({ type, count: inquiries.filter((i: Inquiry) => i.project_type === type).length }))
                .sort((a, b) => b.count - a.count);
              const maxSvc = Math.max(...serviceBreakdown.map(s => s.count), 1);

              // Status breakdown
              const statusBreakdown = (["new","read","replied","archived"] as const).map(s => ({
                s,
                count: inquiries.filter((i: Inquiry) => i.status === s).length,
                pct: inquiries.length > 0 ? Math.round(inquiries.filter((i: Inquiry) => i.status === s).length / inquiries.length * 100) : 0,
              }));

              // Last 4 weeks
              const weeks = Array.from({ length: 4 }, (_, i) => {
                const end = new Date(); end.setDate(end.getDate() - i * 7);
                const start = new Date(end); start.setDate(start.getDate() - 7);
                return {
                  label: i === 0 ? "This wk" : `${i}w ago`,
                  count: inquiries.filter((inq: Inquiry) => { const d = new Date(inq.created_at); return d >= start && d <= end; }).length,
                };
              }).reverse();
              const maxWeek = Math.max(...weeks.map(w => w.count), 1);

              // Avg response: % replied
              const replyRate = inquiries.length > 0 ? Math.round(inquiries.filter((i: Inquiry) => i.status === "replied").length / inquiries.length * 100) : 0;

              const statusDot: Record<string, string> = {
                new: "bg-orange-400", read: "bg-white/20", replied: "bg-green-400/70", archived: "bg-white/10",
              };

              return (
                <div className="flex flex-col gap-6 max-w-4xl">
                  <div>
                    <div className={`${M} text-orange-400/50 mb-1`}>03 // Analytics</div>
                    <h2 className="font-display text-2xl uppercase tracking-widest text-white/75">Analytics</h2>
                  </div>

                  {dbLoading ? (
                    <div className={`${M} text-white/10 py-16 text-center`}>Loading data from Supabase...</div>
                  ) : inquiries.length === 0 ? (
                    <div className={`${M} text-white/10 py-16 text-center`}>No data yet — submit the contact form to see analytics</div>
                  ) : (
                    <>
                      {/* KPI row */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          { label: "Total Leads",   value: inquiries.length,    unit: "" },
                          { label: "Reply Rate",    value: replyRate,            unit: "%" },
                          { label: "Avg / Week",    value: inquiries.length > 0 ? Math.round(inquiries.length / Math.max(weeks.length, 1)) : 0, unit: "" },
                          { label: "Services Mix",  value: serviceTypes.length, unit: " types" },
                        ].map(k => (
                          <div key={k.label} className="p-5 border border-white/[0.04] bg-white/[0.01]">
                            <div className="font-display text-3xl font-medium text-white/65 leading-none mb-2">
                              {k.value}{k.unit}
                            </div>
                            <div className={`${M} text-white/20`}>{k.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Service breakdown */}
                      <div className="border border-white/[0.04]">
                        <div className={`${M} text-white/15 px-5 py-3 border-b border-white/[0.04]`}>Leads by Service //</div>
                        {serviceBreakdown.length === 0 ? (
                          <div className={`${M} text-white/10 py-8 text-center`}>No service data</div>
                        ) : (
                          <div className="p-5 flex flex-col gap-4">
                            {serviceBreakdown.map((s, i) => (
                              <motion.div key={s.type} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }} className="flex items-center gap-4">
                                <div className={`${M} text-white/35 w-36 shrink-0 truncate`}>{s.type}</div>
                                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-sm overflow-hidden">
                                  <motion.div className="h-full bg-orange-400/50 rounded-sm"
                                    initial={{ width: 0 }} animate={{ width: `${(s.count / maxSvc) * 100}%` }}
                                    transition={{ duration: 0.7, delay: i * 0.05 }} />
                                </div>
                                <div className={`${M} text-white/30 w-6 text-right`}>{s.count}</div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Status breakdown */}
                        <div className="border border-white/[0.04]">
                          <div className={`${M} text-white/15 px-5 py-3 border-b border-white/[0.04]`}>By Status //</div>
                          <div className="p-5 flex flex-col gap-4">
                            {statusBreakdown.map((s, i) => (
                              <div key={s.s} className="flex items-center gap-4">
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[s.s]}`} />
                                <div className={`${M} text-white/35 w-20 capitalize shrink-0`}>{s.s}</div>
                                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-sm overflow-hidden">
                                  <motion.div className="h-full rounded-sm bg-white/20"
                                    initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                                    transition={{ duration: 0.6, delay: i * 0.06 }} />
                                </div>
                                <div className={`${M} text-white/25 w-10 text-right`}>{s.count} <span className="text-white/15">({s.pct}%)</span></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Weekly trend */}
                        <div className="border border-white/[0.04]">
                          <div className={`${M} text-white/15 px-5 py-3 border-b border-white/[0.04]`}>Weekly Trend //</div>
                          <div className="p-5">
                            <div className="flex items-end gap-3" style={{ height: 80 }}>
                              {weeks.map((w, i) => {
                                const pct = maxWeek > 0 ? (w.count / maxWeek) * 100 : 0;
                                return (
                                  <div key={w.label} className="flex-1 flex flex-col items-center gap-1.5">
                                    {w.count > 0 && <div className={`${M} text-[8px] text-white/25`}>{w.count}</div>}
                                    <div className="w-full flex items-end flex-1">
                                      <motion.div className="w-full rounded-sm bg-orange-400/40"
                                        initial={{ height: 0 }} animate={{ height: `${Math.max(pct, w.count > 0 ? 8 : 0)}%` }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                        style={{ minHeight: w.count > 0 ? 3 : 0 }} />
                                    </div>
                                    <div className={`${M} text-[7px] text-white/20 mt-1.5`}>{w.label}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

            {/* ════ PROJECTS ════ */}
            {view === "projects" && (
              <div className="flex flex-col gap-5">
                <div>
                  <div className={`${M} text-orange-400/50 mb-1`}>03 // Portfolio</div>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-white/75">Deployed Projects</h2>
                </div>
                <div className="border border-white/[0.04]">
                  {PROJECTS.map((p, i) => (
                    <motion.div key={p.id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className={`flex items-start gap-5 px-5 py-4 hover:bg-white/[0.015] transition-colors ${i < PROJECTS.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                    >
                      <span className={`${M} text-white/20 w-12 shrink-0 mt-0.5`}>{p.id}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] text-white/60 font-display uppercase tracking-wider">{p.title}</div>
                        <div className={`${M} text-white/20 mt-1`}>{p.description.slice(0, 70)}...</div>
                      </div>
                      <div className="flex gap-1.5 flex-wrap justify-end shrink-0">
                        {p.tech.map(t => <span key={t} className={`${M} text-[8px] px-2 py-1 border border-white/[0.06] text-white/20`}>{t}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className={`${M} text-white/[0.08]`}>Edit the PROJECTS array in App.tsx to update this list.</div>
              </div>
            )}

            {/* ════ SETTINGS ════ */}
            {view === "settings" && (
              <div className="flex flex-col gap-5 max-w-lg">
                <div>
                  <div className={`${M} text-orange-400/50 mb-1`}>04 // Config</div>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-white/75">Settings</h2>
                </div>

                {/* Agency info */}
                <div className="border border-white/[0.04]">
                  <div className={`${M} text-white/15 px-5 py-3 border-b border-white/[0.04]`}>Agency Info //</div>
                  {[
                    { label: "Agency Name", value: "ProjectsByAxy Solutions" },
                    { label: "Email",       value: "mail@projectsbyaxy.com" },
                    { label: "Location",    value: "Gachibowli, Hyderabad, TG" },
                    { label: "Admin User",  value: session?.user?.email ?? "—" },
                    { label: "Admin Route", value: "yourdomain.com/#admin" },
                    { label: "Auth",        value: "Supabase Email/Password" },
                    { label: "DB",          value: "contact_inquiries (Supabase)" },
                    { label: "Realtime",    value: connected ? "Connected ✓" : "Disconnected" },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between px-5 py-3 border-b border-white/[0.03] last:border-0">
                      <span className={`${M} text-white/25 shrink-0`}>{row.label}</span>
                      <span className={`${M} text-white/50 text-right ml-4 max-w-[55%] break-all`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Data summary */}
                <div className="border border-white/[0.04]">
                  <div className={`${M} text-white/15 px-5 py-3 border-b border-white/[0.04]`}>Data //</div>
                  <div className="px-5 py-4 flex items-center justify-between">
                    <div>
                      <span className={`${M} text-white/35`}>Contact Inquiries</span>
                      <div className={`${M} text-white/15 mt-0.5`}>{inquiries.length} records in Supabase</div>
                    </div>
                    <button onClick={() => setView("inquiries")}
                      className={`${M} px-4 py-2 border border-white/[0.08] text-white/25 hover:text-white/50 hover:border-white/20 transition-all`}>
                      View All →
                    </button>
                  </div>
                </div>

                {/* Logout */}
                <button onClick={() => supabase.auth.signOut()}
                  className="w-full py-3.5 border border-red-400/[0.08] text-red-400/25 font-mono text-[9px] uppercase tracking-[0.3em] hover:border-red-400/25 hover:text-red-400/50 transition-all">
                  Sign Out of Admin
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
