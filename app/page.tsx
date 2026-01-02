"use client";

import Link from 'next/link';
import { MessageSquare, Bot, ShoppingCart, Zap, Layers, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 }
  }
};

const floatAnimation = {
  y: [-15, 15, -15],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// --- LOGO DATA ---
// Using exact filenames from public/logos check: instagram.jpg, telegram.jpg, whatsapp.png. 
// Added messenger.png as fallback just in case, but relying on visual check.
const logos = [
  { name: 'WhatsApp', src: '/logos/whatsapp.png' },
  { name: 'Instagram', src: '/logos/instagram.jpg' },
  { name: 'Telegram', src: '/logos/telegram.jpg' },
  { name: 'Messenger', src: '/logos/messenger.png', fallbackIcon: true }, // Using flag for possible fallback
];

export default function LandingPage() {
  return (
    // THEME: Force Dark Mode Deep Navy (#020617) as primary.
    // Zero-gap layout relies on root layout padding removal.
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#020617] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">

      {/* GLOBAL BACKGROUND GLOWS */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px]" />
      </div>

      {/* --- HERO SECTION --- */}
      {/* Zero Gap: Using pt-16 to pull closer to navbar (h-14). +/- 2.5rem padding. */}
      <section className="relative px-6 pt-16 pb-24 lg:pt-20 lg:pb-32 z-10 w-full max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          {/* HERO TEXT */}
          <motion.div
            className="text-center lg:text-left mb-20 lg:mb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-5xl font-black tracking-tight sm:text-6xl md:text-[76px] mb-8 leading-[1.05]"
              variants={itemVariants}
              style={{ textShadow: "0 0 40px rgba(59,130,246,0.1)" }}
            >
              <span className="text-white">Centralize Chats.</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Automate Sales.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-blue-100/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              variants={itemVariants}
            >
              The all-in-one Micro-CRM that unifies WhatsApp, Instagram, and Messenger. Turn conversations into revenue with AI-powered automation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Link href="/register" className="relative inline-flex items-center justify-center h-16 px-10 rounded-full bg-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] z-20">
                Register Now
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center h-16 px-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg backdrop-blur-sm transition-colors z-20">
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* HERO VISUAL (3D Stacked Interface) */}
          <motion.div
            className="relative hidden lg:block h-[550px]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* 3D Container with Perspective */}
            <div className="relative w-full h-full perspective-2000">
              <motion.div
                animate={floatAnimation}
                className="relative w-full h-full preserve-3d"
                style={{ rotateY: -12, rotateX: 5 }}
              >
                {/* Back Layer (Mobile) */}
                <div className="absolute top-20 right-0 w-[50%] h-[80%] rounded-[2.5rem] border border-cyan-500/20 bg-[#0B1121] shadow-2xl translate-z-[-60px] overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-b from-[#0F172A] to-[#020617] flex flex-col items-center pt-8">
                    <div className="w-20 h-6 bg-black/50 rounded-full mb-8" />
                    <div className="w-full h-full p-4 space-y-4">
                      <div className="p-3 bg-blue-600/20 rounded-xl rounded-tl-none text-xs text-blue-200">Hi! Status on my order?</div>
                      <div className="self-end ml-auto p-3 bg-blue-600 rounded-xl rounded-tr-none text-xs text-white">Shipped! Here's the link.</div>
                    </div>
                  </div>
                </div>

                {/* Front Layer (Desktop Dashboard) */}
                <div className="absolute top-0 left-0 w-[90%] h-[80%] rounded-2xl border border-blue-400/30 bg-[#020617]/90 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.1)] overflow-hidden flex flex-col z-20 ring-1 ring-white/5">

                  {/* Header */}
                  <div className="h-14 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-mono tracking-wide">CHATLIO_V2</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex">
                    {/* Sidebar Mock */}
                    <div className="w-20 border-r border-white/5 bg-[#0B1121] flex flex-col items-center py-6 gap-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <MessageSquare size={20} />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/5" />
                      <div className="w-10 h-10 rounded-xl bg-white/5" />
                    </div>

                    {/* Main Area */}
                    <div className="flex-1 p-6 bg-[#020617]">
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Sales</div>
                          <div className="text-4xl font-bold text-white">$24,500.00</div>
                        </div>
                        <div className="h-10 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center text-sm font-semibold transition-colors cursor-pointer shadow-lg shadow-blue-600/20">
                          + Action
                        </div>
                      </div>

                      {/* Neon Cards */}
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="group p-4 rounded-xl bg-[#0F172A] border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.1)] transition-all flex items-center gap-4 cursor-default">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                            </div>
                            <div className="flex-1">
                              <div className="h-2.5 w-32 bg-white/10 rounded mb-2 group-hover:bg-cyan-500/20 transition-colors" />
                              <div className="h-2 w-20 bg-white/5 rounded" />
                            </div>
                            <div className="text-emerald-400 font-mono text-sm">+30%</div>
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

      {/* --- INTEGRATIONS MARQUEE --- */}
      <section className="py-12 border-y border-white/5 bg-[#050b18]/50 backdrop-blur-sm z-10 overflow-hidden relative group">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-20" />

        {/* Marquee Content */}
        <div className="flex gap-16 animate-marquee w-max">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="h-8 md:h-10 w-auto">
                {/* Using simple img or fallback icon */}
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
      <section className="py-32 relative z-10 bg-[#020617]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Everything you need.</h2>
            <p className="text-blue-100/60 text-lg">Powerful tools designed to help you sell more effectively on every channel.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Unified Inbox"
              description="All your chats in one place. No more tab switching or missed messages."
            />
            <FeatureCard
              icon={Bot}
              title="AI Automation"
              description="Auto-reply to FAQs and qualify leads instantly with custom logic."
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Sales & Orders"
              description="Create orders, generate links, and take payments inside the chat."
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (FLOW) --- */}
      <section className="py-32 bg-[#050b18] border-t border-white/5 z-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-24 text-center">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-12 relative items-center">
            {/* Arrow Connections (Desktop only) */}
            <div className="hidden md:block absolute top-[40%] left-[20%] w-[60%] h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-0" />

            {[
              { step: "01", title: "Automate", icon: Zap, desc: "Connect channels & set AI rules." },
              { step: "02", title: "Manage", icon: Layers, desc: "Track conversions in real-time." },
              { step: "03", title: "Convert", icon: CheckCircle2, desc: "Close deals and get paid." }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-[#0F172A] border border-white/5 shadow-2xl hover:border-cyan-500/30 transition-all group"
              >
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
      <section className="py-32 relative z-10 bg-[#020617]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-20 text-white">Trusted by Industry Leaders</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-[#0F172A]/50 border border-white/5 hover:border-blue-500/30 transition-all text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-blue-500 text-blue-500" />)}
              </div>
              <p className="text-lg text-blue-100/90 mb-8 font-light leading-relaxed">"The AI automation transformed our response time from hours to seconds. Essential for any scale operations."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full ring-2 ring-white/10 bg-white/10 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="CTO" />
                </div>
                <div>
                  <div className="font-bold text-white">James Carter</div>
                  <div className="text-xs text-blue-400 uppercase tracking-widest font-bold">CTO, Fintech Solution</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-[#0F172A]/50 border border-white/5 hover:border-blue-500/30 transition-all text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-cyan-500 text-cyan-500" />)}
              </div>
              <p className="text-lg text-blue-100/90 mb-8 font-light leading-relaxed">"Unifying our social chats into one dashboard increased our sales conversion by 40% in just two months."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full ring-2 ring-white/10 bg-white/10 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="Founder" />
                </div>
                <div>
                  <div className="font-bold text-white">Sarah Chen</div>
                  <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold">Founder, Global Retail</div>
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

      {/* Global Style for Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300"
      whileHover={{ y: -8, boxShadow: "0 0 40px rgba(59,130,246,0.15)" }}
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
