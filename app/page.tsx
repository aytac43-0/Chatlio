"use client";

import Link from 'next/link';
import { MessageSquare, Bot, ShoppingCart, Zap, ArrowRight, CheckCircle2, Star } from 'lucide-react';
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
  const { scrollYProgress } = useScroll({ container: targetRef });

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#020617] text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-100">

      {/* GLOBAL BACKGROUND RADIALS */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative px-6 pt-20 pb-28 lg:pt-36 lg:pb-48 z-10">
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
                className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-[80px] mb-8 leading-[1.05]"
                variants={itemVariants}
              >
                <span className="text-white drop-shadow-sm">Centralize Chats,</span> <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">
                  Automate Sales
                </span>
              </motion.h1>

              <motion.p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light" variants={itemVariants}>
                Stop juggling apps. Turn every conversation into a revenue opportunity with our AI-powered Micro-CRM.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link href="/register" className="relative inline-flex items-center justify-center h-16 px-10 rounded-full bg-blue-600 text-white font-bold text-xl hover:scale-105 transition-transform duration-200 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] z-20">
                  Register Now
                </Link>
                <Link href="/login" className="inline-flex items-center justify-center h-16 px-10 rounded-full border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-100 font-semibold text-lg backdrop-blur-sm transition-colors z-20">
                  View Demo
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
                className="relative rounded-2xl border border-blue-500/20 bg-[#0B1121]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.15)] p-2"
              >
                {/* Mockup Container */}
                <div className="rounded-xl overflow-hidden bg-[#020617] relative aspect-[4/3]">
                  {/* Top Bar */}
                  <div className="h-10 bg-[#0f172a] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  {/* UI Mock content */}
                  <div className="flex h-full">
                    <div className="w-20 border-r border-white/5 bg-[#0f172a]/50 p-3 space-y-4 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-500 flex items-center justify-center"><MessageSquare size={20} /></div>
                      <div className="w-8 h-8 rounded-lg bg-white/5" />
                      <div className="w-8 h-8 rounded-lg bg-white/5" />
                    </div>
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-semibold text-white/90">Active Conversations</h3>
                        <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-mono">LIVE</span>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-80" />
                            <div className="flex-1 space-y-2">
                              <div className="h-2 w-24 bg-white/10 rounded" />
                              <div className="h-2 w-32 bg-white/5 rounded" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute bottom-6 right-6 px-4 py-3 bg-white text-[#020617] rounded-xl shadow-2xl font-bold flex items-center gap-3 z-20"
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
      <section className="py-10 border-y border-white/5 bg-[#050b18]/50 backdrop-blur-sm relative z-10 w-full overflow-hidden">
        <div className="flex items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {['whatsapp.png', 'instagram.jpg', 'telegram.jpg', 'messenger.png'].map((logo, i) => (
            <img key={i} src={`/logos/${logo}`} alt="Platform Logo" className="h-8 md:h-10 w-auto object-contain hover:scale-110 transition-transform duration-300" />
          ))}
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white"><span className="text-blue-500">Everything</span> in one place.</h2>
            <p className="text-blue-200/60 text-lg">Powerful tools designed to help you sell more effectively on every channel.</p>
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

      {/* --- HOW IT WORKS (NEW) --- */}
      <section className="py-32 bg-[#050b18] border-t border-white/5 relative overflow-hidden z-10">
        <div className="mx-auto max-w-7xl px-6 relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">How Chatlio Works</h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Arrow Connections (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[30%] w-[40%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 z-0" />

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
                className="relative z-10 p-8 rounded-2xl bg-[#0F172A]/50 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
              >
                <div className="text-6xl font-bold text-white/5 mb-6 absolute top-4 right-6 select-none">{item.step}</div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-blue-500/20">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (NEW) --- */}
      <section className="py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Trusted by Sellers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-sm text-gray-300 mb-6 italic">"Chatlio transformed how we handle customer support. A game changer!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                  <div className="text-xs">
                    <div className="font-bold text-white">User Name</div>
                    <div className="text-gray-500">Store Owner</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTE [Previous Implementation reused for consistency] */}
      <footer className="py-12 border-t border-white/5 bg-[#020617] mt-auto relative z-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">© 2024 Chatlio. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-[#0F172A]/40 border border-blue-500/10 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300"
      whileHover={{ boxShadow: "0 0 25px rgba(59,130,246,0.15)" }}
    >
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity">
        <Icon size={20} />
      </div>
      <div className="mt-4 mb-4 text-gray-500 font-mono text-xs uppercase tracking-wider">Feature</div>
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors">{title}</h3>
      <p className="text-blue-100/60 leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}
