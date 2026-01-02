"use client";

import Link from 'next/link';
import { MessageSquare, Bot, ShoppingCart, Zap, Layers, CheckCircle2, Star, Smartphone, Tablet, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 }
  }
};

const floatAnimation = {
  y: [-12, 12, -12],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// --- LOGO DATA ---
const logos = [
  { name: 'WhatsApp', src: '/logos/whatsapp.png' },
  { name: 'Instagram', src: '/logos/instagram.jpg' },
  { name: 'Telegram', src: '/logos/telegram.jpg' },
  { name: 'Messenger', src: '/logos/messenger.png', fallbackIcon: true },
];

export default function LandingPage() {
  return (
    // THEME: STRICT Deep Midnight Navy (#020617)
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">

      {/* GLOBAL BACKGROUND GLOWS Sourced from Şablon */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0">
        {/* Main Blue Radial behind Hero */}
        <div className="absolute top-[-10%] right-[-5%] w-[900px] h-[900px] bg-blue-900/20 rounded-full blur-[120px]" />
        {/* Secondary Cyan Glow bottom left */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>

      {/* --- HERO SECTION --- */}
      {/* SPACING: pt-6 (Extremely tight to navbar as requested, reducing from pt-10/16) */}
      <section className="relative px-6 pt-6 pb-20 lg:pt-12 lg:pb-32 z-10 w-full max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">

          {/* HERO TEXT */}
          <motion.div
            className="text-center lg:text-left mb-16 lg:mb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              v2.0 Now Available
            </motion.div>

            <motion.h1
              className="text-5xl font-black tracking-tight sm:text-6xl md:text-[80px] mb-6 leading-[1.05]"
              variants={itemVariants}
            >
              <span className="text-white drop-shadow-md">Centralize Chats.</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">
                Automate Sales.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-blue-100/70 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal"
              variants={itemVariants}
            >
              The all-in-one Micro-CRM unifies WhatsApp, Instagram, and Messenger. Increase efficiency and boost sales with verified AI automation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Link href="/register" className="relative inline-flex items-center justify-center h-14 px-8 rounded-full bg-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] z-20">
                Register Now
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg backdrop-blur-sm transition-colors z-20">
                View Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* HERO VISUAL (3D Stacked: Desktop, Mobile, Tablet) */}
          <motion.div
            className="relative hidden lg:block h-[600px] w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Perspective Container */}
            <div className="relative w-full h-full perspective-2000">
              <motion.div
                animate={floatAnimation}
                className="relative w-full h-full preserve-3d"
                style={{ rotateY: -12, rotateX: 6 }}
              >
                {/* Layer 3: Tablet (Back Left) */}
                <div className="absolute top-[20%] left-[-5%] w-[60%] h-[70%] rounded-2xl border border-white/10 bg-[#0B1121] shadow-2xl translate-z-[-100px] opacity-60 overflow-hidden transform group-hover:translate-x-[-20px] transition-transform">
                  <div className="h-full bg-[#0F172A] p-4">
                    <div className="w-1/3 h-4 bg-white/10 rounded mb-4" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/5 rounded" />
                      <div className="h-2 w-full bg-white/5 rounded" />
                      <div className="h-2 w-2/3 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>

                {/* Layer 2: Mobile (Back Right) */}
                <div className="absolute top-[10%] right-[-5%] w-[35%] h-[80%] rounded-[2.5rem] border border-cyan-500/20 bg-[#020617] shadow-xl translate-z-[-50px] overflow-hidden z-10">
                  <div className="h-full bg-gradient-to-b from-[#0F172A] to-[#020617] flex flex-col p-4 relative">
                    <div className="w-16 h-4 bg-black/40 rounded-full mx-auto mb-6" />
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-600/20 rounded-xl rounded-tl-none text-[10px] text-blue-200">New order received!</div>
                      <div className="p-3 bg-blue-600 rounded-xl rounded-tr-none text-[10px] text-white self-end">Processing now...</div>
                    </div>
                  </div>
                </div>

                {/* Layer 1: Desktop (Front Center) */}
                <div className="absolute top-0 left-[10%] w-[85%] h-[85%] rounded-2xl border border-blue-400/40 bg-[#020617]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col z-30 ring-1 ring-white/10">
                  {/* Header */}
                  <div className="h-12 bg-[#0F172A]/80 border-b border-white/5 flex items-center justify-between px-4">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    </div>
                    <div className="text-[10px] font-mono text-blue-400 opacity-70">DASHBOARD_main</div>
                  </div>
                  {/* Body */}
                  <div className="flex-1 flex">
                    <div className="w-16 bg-[#0B1121] border-r border-white/5 flex flex-col items-center py-4 gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30"><MessageSquare size={16} /></div>
                      <div className="w-8 h-8 rounded-lg bg-white/5" />
                      <div className="w-8 h-8 rounded-lg bg-white/5" />
                    </div>
                    <div className="flex-1 p-6 relative">
                      <div className="flex justify-between items-end mb-6">
                        <div>
                          <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Conversions</div>
                          <div className="text-3xl font-bold text-white">+2,850</div>
                        </div>
                        <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded text-xs font-bold">+42%</div>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-14 rounded-xl bg-[#0F172A] border border-white/5 hover:border-blue-500/40 transition-colors flex items-center px-4 gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-60" />
                            <div className="flex-1 h-2 bg-white/10 rounded" />
                            <div className="w-8 h-2 bg-white/10 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- INTEGRATIONS STRIP --- */}
      <section className="py-12 border-y border-white/5 bg-[#050b18]/50 backdrop-blur-sm z-10 overflow-hidden relative group">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-20" />

        {/* Marquee Content */}
        <div className="flex gap-16 animate-marquee w-max">
          {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 md:h-10 w-auto">
                {logo.fallbackIcon ? (
                  <div className="flex items-center gap-2 font-bold text-lg text-white"><MessageSquare className="w-6 h-6 text-blue-500" /> {logo.name}</div>
                ) : (
                  <img src={logo.src} alt={logo.name} className={`h-full w-auto object-contain ${logo.name === 'Telegram' || logo.name === 'Instagram' ? 'rounded-lg' : ''}`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 relative z-10 bg-[#020617]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">Power Your <span className="text-blue-500">Sales</span></h2>
            <p className="text-blue-100/60 text-lg">Everything you need to manage customer conversations and close deals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Unified Inbox"
              description="All your chats in one place. No more tab switching or missed messages from any channel."
            />
            <FeatureCard
              icon={Bot}
              title="AI Automation"
              description="Train your own AI agent to answer FAQs, qualify leads, and handle support instantly."
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Sales & Orders"
              description="Create product links, track orders, and accept payments directly within the chat window."
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (FLOW) --- */}
      <section className="py-24 bg-[#050b18] border-t border-white/5 z-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-24 text-center text-white">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-12 relative items-center">
            {/* Arrow Connections (Desktop only) */}
            <div className="hidden md:block absolute top-[40%] left-[20%] w-[60%] h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-0" />

            {[
              { step: "01", title: "Automate", icon: Zap, desc: "Connect your channels and set up AI automation rules." },
              { step: "02", title: "Manage", icon: Layers, desc: "Monitor active chats and track customer details." },
              { step: "03", title: "Convert", icon: CheckCircle2, desc: "Close deals with integrated checkout and payments." }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-[#0F172A] border border-white/5 shadow-2xl hover:border-blue-500/30 transition-all group"
              >
                <div className="w-18 h-18 text-4xl font-black text-slate-700/20 absolute top-4 right-6 pointer-events-none">{item.step}</div>

                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-8 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-blue-100/60 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROFESSIONAL TESTIMONIALS --- */}
      <section className="py-24 relative z-10 bg-[#020617]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-white">Trusted by Industry Leaders</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Specific Testimonial 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-10 rounded-3xl bg-[#0F172A]/80 border border-white/5 hover:border-blue-500/30 transition-all text-left relative overflow-hidden backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} className="fill-blue-500 text-blue-500" />)}
              </div>
              <p className="text-xl text-blue-100/90 mb-8 font-light leading-relaxed">"The AI automation cut our response time by 90% while doubling sales leads."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-lg">
                  TF
                </div>
                <div>
                  <div className="font-bold text-white">TechFlow</div>
                  <div className="text-xs text-blue-400 uppercase tracking-widest font-bold">CTO</div>
                </div>
              </div>
            </motion.div>

            {/* Specific Testimonial 2 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-10 rounded-3xl bg-[#0F172A]/80 border border-white/5 hover:border-cyan-500/30 transition-all text-left relative overflow-hidden backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} className="fill-cyan-500 text-cyan-500" />)}
              </div>
              <p className="text-xl text-blue-100/90 mb-8 font-light leading-relaxed">"Unifying all chats into one dashboard is the best CRM decision we've made."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-lg">
                  GR
                </div>
                <div>
                  <div className="font-bold text-white">Global Retail</div>
                  <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold">Founder</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-[#020617] mt-auto relative z-10 text-center md:text-left">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">© 2024 Chatlio. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-[#0F172A]/60 border border-white/5 hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300"
      whileHover={{ y: -8, boxShadow: "0 0 30px rgba(59,130,246,0.15)" }}
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">{title}</h3>
      <p className="text-blue-100/60 leading-relaxed">
        {description}
      </p>

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
        <Layers size={20} />
      </div>
    </motion.div>
  );
}
