"use client";

import Link from 'next/link';
import { MessageSquare, Bot, ShoppingCart, Zap, CheckCircle2, Star, Play, Layers } from 'lucide-react';
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

export default function LandingPage() {
  return (
    // THEME: Default Dark Navy (#020617) with support for light mode fallback if absolutely needed, but optimized for Dark.
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white dark:bg-[#020617] text-slate-900 dark:text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 transition-colors duration-300">

      {/* GLOBAL BACKGROUND GLOWS (DARK MODE) */}
      <div className="hidden dark:block fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px]" />
      </div>

      {/* --- HERO SECTION --- */}
      {/* Reduced padding-top to pt-20 as requested for tight layout */}
      <section className="relative px-6 pt-20 pb-24 lg:pt-24 lg:pb-32 z-10">
        <div className="mx-auto max-w-7xl">
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
                <span className="text-slate-900 dark:text-white">Centralize Chats.</span> <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                  Automate Sales.
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 dark:text-blue-200/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
                variants={itemVariants}
              >
                The all-in-one Micro-CRM that unifies WhatsApp, Instagram, and Messenger. Turn conversations into revenue with AI-powered automation.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link href="/register" className="relative inline-flex items-center justify-center h-16 px-10 rounded-full bg-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] z-20">
                  Register Now
                </Link>
                <Link href="/login" className="inline-flex items-center justify-center h-16 px-10 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-semibold text-lg backdrop-blur-sm transition-colors z-20">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* HERO VISUAL (3D Stacked Interface) */}
            <motion.div
              className="relative hidden lg:block h-[500px]"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* 3D Container */}
              <div className="relative w-full h-full perspective-2000">
                <motion.div
                  animate={floatAnimation}
                  className="relative w-full h-full preserve-3d"
                  style={{ rotateY: -10, rotateX: 5 }}
                >
                  {/* Back Layer (Tablet/Mobile representation) */}
                  <div className="absolute top-10 right-10 w-[80%] h-[80%] rounded-2xl border border-blue-500/30 bg-[#0B1121] shadow-2xl opacity-60 translate-z-[-50px] overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-blue-900/10 to-transparent" />
                  </div>

                  {/* Front Layer (Main Dashboard) */}
                  <div className="absolute top-0 left-0 w-[90%] h-[90%] rounded-2xl border border-blue-400/50 bg-[#020617]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col z-20">

                    {/* Header */}
                    <div className="h-14 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-mono">v2.4.0</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex">
                      {/* Sidebar Mock */}
                      <div className="w-20 border-r border-white/5 bg-[#0B1121] flex flex-col items-center py-6 gap-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                          <MessageSquare size={20} />
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5" />
                        <div className="w-10 h-10 rounded-xl bg-white/5" />
                        <div className="w-10 h-10 rounded-xl bg-white/5 mt-auto" />
                      </div>

                      {/* Main Area */}
                      <div className="flex-1 p-6 bg-[#020617]">
                        <div className="flex justify-between items-end mb-8">
                          <div>
                            <div className="text-gray-400 text-sm mb-1">Total Revenue</div>
                            <div className="text-3xl font-bold text-white">$12,450.00</div>
                          </div>
                          <div className="h-10 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center text-sm font-semibold transition-colors cursor-pointer">
                            + New Order
                          </div>
                        </div>

                        {/* Neon Cards */}
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="group p-4 rounded-xl bg-[#0F172A] border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-80" />
                              <div className="flex-1">
                                <div className="h-2.5 w-32 bg-white/20 rounded mb-2" />
                                <div className="h-2 w-20 bg-white/10 rounded" />
                              </div>
                              <div className="text-emerald-400 font-mono text-sm">+$120</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Decoration */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -right-4 top-[20%] p-4 bg-[#0F172A] border border-cyan-500/30 rounded-xl shadow-2xl z-30"
                  >
                    <Bot className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- INTEGRATIONS STRIP --- */}
      <section className="py-10 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#050b18]/50 backdrop-blur-sm z-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Integrated with your favorite platforms
          </div>
          <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {/* WHATSAPP */}
            <div className="h-8 md:h-10 relative group">
              <img src="/logos/whatsapp.png" alt="WhatsApp" className="h-full w-auto object-contain" />
            </div>
            {/* INSTAGRAM */}
            <div className="h-8 md:h-10 relative group">
              <img src="/logos/instagram.jpg" alt="Instagram" className="h-full w-auto object-contain rounded-lg" />
            </div>
            {/* TELEGRAM */}
            <div className="h-8 md:h-10 relative group">
              <img src="/logos/telegram.jpg" alt="Telegram" className="h-full w-auto object-contain rounded-full" />
            </div>
            {/* MESSENGER (Text Fallback since image missing) */}
            <div className="flex items-center gap-2 font-bold text-lg text-slate-700 dark:text-slate-300">
              <MessageSquare className="w-6 h-6 text-blue-500" /> Messenger
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 relative z-10 bg-white dark:bg-[#020617]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Unified Inbox"
              description="All your chats in one place. No more tab switching."
            />
            <FeatureCard
              icon={Bot}
              title="AI Automation"
              description="Auto-reply to FAQs and qualify leads instantly."
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Sales & Orders"
              description="Create orders and take payments inside the chat."
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (FLOW) --- */}
      <section className="py-24 bg-slate-50 dark:bg-[#050b18] border-t border-slate-200 dark:border-white/5 z-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-20 text-center text-slate-900 dark:text-white">How it Works</h2>

          <div className="grid md:grid-cols-3 gap-12 relative items-center">
            {/* Arrow Connections (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2 z-0" />

            {[
              { step: "01", title: "Automate with AI", icon: Zap },
              { step: "02", title: "Manage Chats", icon: Layers },
              { step: "03", title: "Convert Sales", icon: CheckCircle2 }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">Step {item.step} description placeholder text for flow.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Circular Avatars) --- */}
      <section className="py-24 relative z-10 bg-white dark:bg-[#020617]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-slate-900 dark:text-white">Trusted by Sellers</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-white/10 mb-4 p-1 border-2 border-transparent hover:border-cyan-500 transition-colors cursor-pointer">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" className="w-full h-full rounded-full" />
                </div>
                <div className="font-bold text-slate-900 dark:text-white">Alex Doe</div>
                <div className="text-xs text-blue-500 uppercase tracking-widest font-bold mb-2">CEO, Brand</div>
                <p className="text-sm text-slate-500 dark:text-gray-400 italic">"Incredible tool for our sales team."</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#020617] mt-auto relative z-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 dark:text-gray-500">© 2024 Chatlio. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-gray-400">
            <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-white dark:bg-[#0F172A]/60 border border-slate-200 dark:border-blue-500/20 hover:border-cyan-500/50 backdrop-blur-sm transition-all duration-300"
      whileHover={{ y: -5, boxShadow: "0 0 30px rgba(34,211,238,0.15)" }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-slate-600 dark:text-blue-100/60 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}
