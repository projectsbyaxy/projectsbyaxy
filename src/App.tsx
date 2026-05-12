/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowLeft, Cpu, Database, Zap, X, ExternalLink, ShieldCheck } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  icon: ReactNode;
  imageUrl: string;
  specs: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: "AX-04",
    title: "Bespoke Web Systems",
    description: "Custom high-velocity web platforms engineered for scale and speed. Zero-latency architecture.",
    fullDescription: "A comprehensive digital overhaul for enterprise partners, focusing on high-velocity performance and pixel-perfect aesthetics. Built with a zero-latency mindset using Next.js and custom neural caching layers. We engineered a system that handles 1M+ concurrent users while maintaining sub-100ms response times globally.",
    tech: ["Next.js", "AI-Core", "Scale"],
    icon: <Cpu size={20} />,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Performance", value: "99/100 Lighthouse" },
      { label: "Scale", value: "Enterprise Grade" },
      { label: "Logic", value: "Neural Caching" },
      { label: "Uptime", value: "99.99% Node-Locked" }
    ]
  },
  {
    id: "AX-09",
    title: "Predictive Ops",
    description: "Real-time anomaly detection for industrial supply chains using transformer architectures.",
    fullDescription: "Leveraging state-of-the-art transformer architectures to predict supply chain bottlenecks before they happen. Integrating edge computing for instantaneous anomaly detection across thousands of IoT sensors. This project reduced operational downtime by 43% for our industrial partners through proactive neural rerouting.",
    tech: ["RNN", "Cloud-Native", "Edge"],
    icon: <Zap size={20} />,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Architecture", value: "Transformer Layout" },
      { label: "Latency", value: "<15ms Inference" },
      { label: "Nodes", value: "12,000+ Edge Devices" },
      { label: "Security", value: "End-to-End Encrypted" }
    ]
  },
  {
    id: "AX-12",
    title: "Auto-Content",
    description: "Generative AI workflow automation for global marketing teams. Reduced latency by 60%.",
    fullDescription: "Revolutionizing marketing workflows with custom-trained Stable Diffusion models and GPT-O1 agents. Automating content creation cycles from 48 hours down to seconds. We developed a proprietary prompt-engineering layer that ensures brand consistency across millions of generated assets, saving over 5,000 man-hours monthly.",
    tech: ["Stable-Diffusion", "GPT-O1", "Nodes"],
    icon: <Database size={20} />,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Model", value: "GPT-O1 Hybrid" },
      { label: "Throughput", value: "10k assets/hr" },
      { label: "Accuracy", value: "98.2% Brand Match" },
      { label: "Pipeline", value: "Automated V-Ring" }
    ]
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsLoading(true);
      element.scrollIntoView({ behavior: "smooth" });
      // Short delay for the "loader" effect requested previously
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const titleLineVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cinematic Brightness Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Amber Tint Overlay */}
        <div className="absolute inset-0 z-11 bg-orange-950/20 mix-blend-overlay" />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Film Grain Texture layer */}
        <div 
          className="absolute inset-0 z-20 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Background Ambient Glow */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at 60% 40%, rgba(255, 140, 0, 0.15) 0%, transparent 60%)"
          }}
        />

        {/* Background Video (Hero Only Background) */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_3Ddn0iLywygnKtQwSoAneEWDjqL/hf_20260512_220752_0c6a2c44-513c-466b-9868-3094eed07efa.mp4"
          />
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
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
            {/* Top Left: Logo & Subtext */}
            <div className="lg:absolute lg:top-0 lg:left-0 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 max-w-md">
              <div className="relative">
                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase relative z-10 flex flex-col leading-[1.1]">
                  <motion.span variants={titleLineVariants}>
                    <span className="text-white/40">PROJECTSBYAXY //</span> <span className="text-white">AI SOLUTIONS</span>
                  </motion.span>
                </h1>
              </div>

              <motion.p 
                variants={itemVariants}
                className="text-[12px] sm:text-[13px] text-white/50 leading-relaxed font-light tracking-wide max-w-sm"
              >
                Empowering businesses and scaling growth through precision-engineered digital projects and expert neural logic. Shift your reality.
              </motion.p>

              {/* Feature Icons */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                {[Cpu, Database, Zap].map((Icon, idx) => (
                  <div key={idx} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all cursor-crosshair">
                    <Icon size={16} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Top Right: Pagination Navigation */}
            <motion.div 
              variants={itemVariants}
              className="lg:absolute lg:top-0 lg:right-0 mt-12 lg:mt-0 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-mono text-white/40"
            >
              <div className="flex items-center gap-4">
                <span>01/26 Projects</span>
                <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/40 w-1/4" />
                </div>
              </div>
              <button 
                onClick={() => scrollTo("projects")}
                className="hover:text-white transition-colors flex items-center gap-2 group"
              >
                Browse All <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </motion.div>

            {/* Middle Right: Technical Specs */}
            <motion.div 
              variants={itemVariants}
              className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 mt-16 lg:mt-0 w-full max-w-xs flex flex-col gap-6"
            >
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

            {/* Bottom Left: Product Card */}
            <motion.div 
              variants={itemVariants}
              className="lg:absolute lg:bottom-0 lg:left-0 mt-16 lg:mt-0 max-w-sm w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400/20 to-transparent border border-white/5 rounded-lg overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Neural Core" 
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[10px] font-mono text-orange-400/80 tracking-[0.2em] uppercase">
                  AX-01: <span className="text-white">DIGITAL CORE</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed font-light">
                  Custom high-velocity web platform engineered for enterprise scale and speed.
                </p>
                <button
                  onClick={() => scrollTo("projects")}
                  className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded text-[9px] uppercase tracking-[0.2em] font-mono hover:bg-white hover:text-black transition-all"
                >
                  View Project
                </button>
              </div>
            </motion.div>

            {/* Bottom Right: Highlight Badges */}
            <motion.div 
              variants={itemVariants}
              className="lg:absolute lg:bottom-0 lg:right-0 lg:mb-2 mt-12 lg:mt-0 flex flex-wrap justify-center lg:justify-end items-center gap-3"
            >
              {["8K RAW", "A+", "ULTRA-WIDE", "NEURAL-SYNC"].map((badge) => (
                <div 
                  key={badge} 
                  className="px-4 py-1.5 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.25em] font-mono text-white/40 hover:text-white hover:border-white/40 transition-all cursor-default"
                >
                  {badge}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
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
                    Deployed Projects //
                  </motion.h2>
                  <motion.p 
                    variants={itemVariants}
                    className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono"
                  >
                    Neural Deployments & Market Disruption
                  </motion.p>
                </div>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono text-white/60"
              >
                <span className="whitespace-nowrap">Filter: All</span>
                <div className="w-[1px] h-4 bg-white/20" />
                <span className="whitespace-nowrap">2024-2025</span>
              </motion.div>
            </div>

            {/* Projects Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {PROJECTS.map((project) => (
                <ProjectCard 
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  icon={project.icon}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>

            {/* Footer Pagination */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center border-t border-white/5 pt-12"
            >
              <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-mono">
                [ End of Index — Request Full Portfolio ]
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
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
            {/* Header */}
            <div className="flex flex-col gap-6 border-b border-white/10 pb-12">
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
                  Network Feedback //
                </motion.h2>
                <motion.p 
                  variants={itemVariants}
                  className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono"
                >
                  Verifications from Industry Leaders
                </motion.p>
              </div>
            </div>

            {/* Testimonials List */}
            <div className="flex flex-col gap-12">
              <TestimonialCard 
                quote="ProjectsByAxy transformed our legacy data pipeline into a real-time neural engine. The speed of iteration was unprecedented."
                author="Marcus Thorne"
                role="CTO, Flux Dynamics"
                id="VR-012"
              />
              <TestimonialCard 
                quote="The V2 deployment exceeded our expectations for search accuracy. A true shift in our digital core."
                author="Sarah Jenkins"
                role="Lead AI Architect, NeoSystems"
                id="VR-084"
              />
              <TestimonialCard 
                quote="Precision, high-velocity delivery, and absolute clarity. The team at Axy doesn't just build, they architect futures."
                author="Elena Vance"
                role="CEO, Astral Tech"
                id="VR-103"
              />
            </div>

            <motion.div variants={itemVariants} className="text-center pt-8">
              <div className="inline-block px-6 py-2 border border-white/5 rounded-full text-[9px] uppercase tracking-[0.3em] font-mono text-white/20">
                Encrypted Feedback Channel // Secure
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Global Loader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Data Rain Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
              <div className="flex justify-around w-full h-full text-[10px] font-mono text-white whitespace-pre select-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ 
                      duration: 2 + Math.random() * 3, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: Math.random() * 2
                    }}
                  >
                    {Array.from({ length: 40 }, () => (Math.random() > 0.5 ? "0" : "1")).join("\n")}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-12 max-w-sm w-full px-6">
              {/* Central Core Animation */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative z-10 w-32 h-32 flex items-center justify-center text-white"
                >
                  <Cpu size={64} strokeWidth={0.5} className="opacity-80" />
                  {/* Rotating Orbitals */}
                  <div className="absolute inset-x-0 inset-y-0 border border-white/10 rounded-full animate-[spin_4s_linear_infinite]" />
                  <div className="absolute inset-x-[-10px] inset-y-[-10px] border border-white/5 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                </motion.div>
                
                {/* Glow Pulse */}
                <motion.div 
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 blur-3xl rounded-full"
                />
              </div>

              {/* Status Section */}
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] uppercase tracking-[0.6em] font-mono text-white/80"
                  >
                    Neural Synchronizing
                  </motion.div>
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                    Protocol: AX-CORE // v2.0.4
                  </div>
                </div>

                {/* Processing Logs */}
                <div className="w-full bg-white/[0.02] border border-white/10 p-4 font-mono text-[8px] sm:text-[9px] text-white/40 flex flex-col gap-1 rounded-sm h-32 overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/80 to-transparent z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  
                  <motion.div
                    animate={{ y: [0, -200] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col gap-1"
                  >
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

                {/* Progress Bar */}
                <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Decorative Icon */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 text-white/20 pointer-events-none"
      >
        <Sparkles size={24} strokeWidth={1} />
      </motion.div>
    </div>
  );
}

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

function TestimonialCard({ quote, author, role, id }: { 
  quote: string; 
  author: string; 
  role: string; 
  id: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
      }}
      whileHover={{ 
        scale: 1.015,
        backgroundColor: "rgba(255,255,255,0.02)"
      }}
      className="group relative flex flex-col gap-6 p-8 border-l border-white/10 hover:border-white/60 transition-all duration-500 cursor-default"
    >
      <div className="absolute top-0 left-[-1px] w-[2px] h-0 bg-white group-hover:h-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      
      <div className="text-[10px] font-mono text-white/20 tracking-[0.4em]">{id} // IDENTITY_VERIFIED</div>
      
      <p className="font-display text-lg md:text-xl text-white/90 leading-relaxed italic tracking-wide group-hover:text-white transition-colors">
        "{quote}"
      </p>
      
      <div className="flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-white/70">
          {author}
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/30">
          {role}
        </span>
      </div>
    </motion.div>
  );
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tech: string[];
  icon: ReactNode;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, tech, icon, onClick }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
        }
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.2)"
      }}
      onClick={onClick}
      className="group flex flex-col gap-6 p-8 border border-white/5 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 rounded-sm cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="text-[10px] font-mono text-white/20 tracking-widest">{id}</div>
        <div className="text-white/30 group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl uppercase tracking-widest font-medium text-white/90 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-[12px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors font-light tracking-wide">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-auto">
        {tech.map((t) => (
          <span key={t} className="text-[9px] uppercase tracking-widest font-mono px-2 py-1 bg-white/5 text-white/30 group-hover:text-white/60 transition-colors">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-black/40 hover:bg-white hover:text-black rounded-full border border-white/10 transition-all group"
        >
          <X size={20} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Left Side: Image / Media */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />
          
          {/* Badge */}
          <div className="absolute bottom-8 left-8 flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
              {project.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Protocol</span>
              <span className="text-sm font-mono text-white tracking-widest">{project.id}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-orange-400/80 tracking-[0.4em] uppercase">
              <ShieldCheck size={12} /> Verification_Active
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest leading-tight">
              {project.title}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/20">Abstract // Summary</div>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light tracking-wide italic">
              "{project.fullDescription}"
            </p>
          </div>

          {/* Detailed Specs */}
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

          {/* Action Footer */}
          <div className="mt-auto pt-8 flex flex-wrap gap-4 items-center">
            <button className="flex-1 px-8 py-4 bg-white text-black text-[11px] uppercase tracking-[0.4em] font-mono font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-3 group">
              Launch Instance <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 border border-white/10 rounded text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

