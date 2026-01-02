"use client";

import Link from 'next/link';
import { MessageSquare, Bot, ShoppingCart, Zap, ArrowRight, CheckCircle2, Star, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white dark:bg-[#020617] text-slate-900 dark:text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-600 dark:selection:text-blue-100 transition-colors duration-300">

      {/* GLOBAL BACKGROUND RADIALS (DARK MODE ONLY) */}
      <div className="hidden dark:block fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative px-6 pt-20 pb-20 lg:pt-32 lg:pb-32 z-10">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">

            {/* HERO TEXT */}
            <motion.div
              className="text-center lg:text-left mb-20 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1
                className="text-5xl font-black tracking-tight sm:text-6xl md:text-[72px] mb-8 leading-[1.05]"
                variants={itemVariants}
              >
                <span className="text-slate-900 dark:text-white drop-shadow-sm">Centralize Chats,</span> <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 drop-shadow-lg">
                  Automate Sales
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 dark:text-blue-100/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
                variants={itemVariants}
              >
                Stop juggling apps. Turn every conversation into a revenue opportunity with our AI-powered Micro-CRM that unifies WhatsApp, Instagram, and more.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link href="/register" className="relative inline-flex items-center justify-center h-14 px-8 rounded-full bg-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] z-20">
                  Register Now
                </Link>
                <Link href="/login" className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-slate-200 dark:border-blue-500/20 bg-white dark:bg-blue-500/5 hover:bg-slate-50 dark:hover:bg-blue-500/10 text-slate-700 dark:text-blue-100 font-semibold text-lg backdrop-blur-sm transition-colors z-20 shadow-sm">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* HERO VISUAL (FLOATING MOCKUP) */}
            <motion.div
              className="relative hidden lg:block perspective-1000"
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                animate={floatAnimation}
                className="relative rounded-2xl border border-slate-200 dark:border-blue-500/20 bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-xl shadow-2xl dark:shadow-[0_0_50px_rgba(59,130,246,0.15)] p-2"
              >
                {/* Mockup Container */}
                <div className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#020617] relative aspect-[4/3]">
                  {/* Top Bar */}
                  <div className="h-10 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-white/5 flex items-center px-4 gap-2">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                  {/* UI Mock content */}
                  <div className="flex h-full">
                    <div className="w-20 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#0f172a]/50 p-3 space-y-4 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-500 flex items-center justify-center"><MessageSquare size={20} /></div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5" />
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5" />
                    </div>
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-slate-800 dark:text-white/90">Active Conversations</h3>
                        <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-green-500/10 text-emerald-600 dark:text-green-500 text-xs font-mono font-bold">LIVE</span>
                      </div>

                      {/* Floating Chat Bubbles */}
                      <div className="relative space-y-4">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="p-3 rounded-2xl rounded-tl-none bg-blue-600 text-white text-sm shadow-lg max-w-[80%]"
                        >
                          Is the enterprise plan available?
                        </motion.div>
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="self-end ml-auto p-3 rounded-2xl rounded-tr-none bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-blue-100 text-sm shadow-sm max-w-[80%] border border-slate-200 dark:border-white/5"
                        >
                          Yes! We can set you up with a demo.
                        </motion.div>
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.5 }}
                          className="p-3 rounded-2xl rounded-tl-none bg-purple-600 text-white text-sm shadow-lg max-w-[80%] flex items-center gap-2"
                        >
                          <Bot size={14} /> AI Agent handling support...
                        </motion.div>
                      </div>

                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="absolute bottom-6 right-6 px-4 py-3 bg-white text-slate-900 rounded-xl shadow-xl dark:shadow-2xl border border-slate-100 dark:border-none font-bold flex items-center gap-3 z-20"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={18} /></div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Revenue</div>
                      <div className="text-lg leading-none">+$1,250.00</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PLATFORMS STRIP --- */}
      <section className="py-12 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#050b18]/50 backdrop-blur-sm relative z-10 w-full overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center mb-8">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Integrated with your favorite platforms</h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {['whatsapp.png', 'instagram.jpg', 'telegram.jpg'].map((logo, i) => (
            <img key={i} src={`/logos/${logo}`} alt="Platform Logo" className="h-8 md:h-10 w-auto object-contain hover:scale-110 transition-transform duration-300" />
          ))}
          {/* Text Fallback for Messenger if image missing, or just icon */}
          <div className="flex items-center gap-2 font-bold text-xl text-slate-700 dark:text-slate-300"><MessageSquare className="w-6 h-6" /> Messenger</div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 relative z-10 bg-white dark:bg-[#020617] transition-colors">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white"><span className="text-blue-600">Everything</span> in one place.</h2>
            <p className="text-slate-600 dark:text-blue-200/60 text-lg">Powerful tools designed to help you sell more effectively on every channel.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Unified Inbox"
              description="Connect WhatsApp, Instagram, and more into a single, clutter-free stream."
            />
            <FeatureCard
              icon={Bot}
              title="AI Automation"
              description="Train our AI to answer FAQs, qualify leads, and handle support 24/7."
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Sales & Orders"
              description="Generate payment links and track orders directly within the chat window."
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (FLOW) --- */}
      <section className="py-24 bg-slate-50 dark:bg-[#050b18] border-t border-slate-200 dark:border-white/5 relative overflow-hidden z-10 transition-colors">
        <div className="mx-auto max-w-7xl px-6 relative">
          <h2 className="text-3xl md:text-5xl font-black mb-20 text-center text-slate-900 dark:text-white">How Chatlio Works</h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Arrow Connections (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[30%] w-[40%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 z-0" />

            {[
              { step: "01", title: "Automate", desc: "Set up AI rules to handle incoming messages instantly." },
              { step: "02", title: "Manage", desc: "Organize chats and track customer details in the CRM." },
              { step: "03", title: "Convert", desc: "Turn conversations into paid orders automatically." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 p-8 rounded-2xl bg-white dark:bg-[#0F172A]/50 border border-slate-200 dark:border-white/5 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-blue-500/30 transition-colors"
              >
                <div className="text-6xl font-black text-slate-100 dark:text-white/5 mb-6 absolute top-4 right-6 select-none">{item.step}</div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-xl font-bold mb-6 text-white shadow-lg shadow-blue-500/20">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-blue-100/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 relative z-10 bg-white dark:bg-[#020617] transition-colors">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center text-slate-900 dark:text-white">Trusted by Sellers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-6 italic">"Chatlio transformed how we handle customer support. A game changer!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="text-xs">
                    <div className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</div>
                    <div className="text-slate-500 dark:text-gray-500">Store Owner</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#020617] mt-auto relative z-10 transition-colors">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 dark:text-gray-500">© 2024 Chatlio. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-gray-400">
            <Link href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-[#0F172A]/40 border border-slate-200 dark:border-blue-500/10 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300"
      whileHover={{ boxShadow: "0 0 25px rgba(59,130,246,0.15)" }}
    >
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-cyan-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity">
        <Icon size={20} />
      </div>
      <div className="mt-4 mb-4 text-slate-400 dark:text-gray-500 font-mono text-xs uppercase tracking-wider">Feature</div>
      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">{title}</h3>
      <p className="text-slate-600 dark:text-blue-100/60 leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}
