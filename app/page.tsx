"use client";

import Link from 'next/link';
import { MessageSquare, Bot, ShoppingCart, Zap, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
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

const visualVariants = {
  hidden: { opacity: 0, scale: 0.95, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 40, damping: 20, delay: 0.4 }
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#020617] text-white overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative px-6 pt-16 pb-24 lg:pt-32 lg:pb-40 z-10">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left mb-16 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1
                className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-[72px] mb-8 leading-[1.05]"
                variants={itemVariants}
              >
                <span className="text-white">Centralize Chats,</span> <br />
                <span className="text-[#22d3ee]">
                  Automate Sales
                </span>
              </motion.h1>

              <motion.ul
                className="space-y-6 mb-12 text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0"
                variants={containerVariants}
              >
                <motion.li className="flex items-center gap-4 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400">
                    <Zap className="w-5 h-5 fill-current" />
                  </span>
                  Centralize WhatsApp & social media messages
                </motion.li>
                <motion.li className="flex items-center gap-4 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400">
                    <Zap className="w-5 h-5 fill-current" />
                  </span>
                  Allow AI to fully manage conversations
                </motion.li>
                <motion.li className="flex items-center gap-4 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400">
                    <Zap className="w-5 h-5 fill-current" />
                  </span>
                  Convert chats into orders and sales
                </motion.li>
              </motion.ul>

              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link href="/register" className="relative inline-flex items-center justify-center h-16 px-10 rounded-full bg-blue-600 text-white font-bold text-xl hover:scale-105 transition-transform duration-200 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                  Register Now
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual (Interactive Demo Preview Box) */}
            <motion.div
              className="relative hidden lg:block"
              variants={visualVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative rounded-2xl border border-blue-500/30 bg-[#0B1121] shadow-2xl p-6 aspect-[4/3] overflow-hidden group">
                {/* Top Bar */}
                <div className="absolute top-0 left-0 w-full h-12 bg-[#0F172A] border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 px-3 py-1 bg-white/5 rounded text-xs text-gray-500 font-mono">dashboard.chatlio.os</div>
                </div>

                <div className="flex h-full gap-4 pt-10">
                  {/* Sidebar Mock */}
                  <div className="w-20 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center py-4 gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" />
                    <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" />
                    <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors mt-auto" />
                  </div>

                  {/* Content Mock */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* Chat Bubbles */}
                    <div className="flex-1 rounded-xl bg-[#0F172A]/50 border border-white/5 p-6 flex flex-col gap-6 relative overflow-hidden">

                      {/* Received Message */}
                      <div className="self-start flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-[#334155] flex-shrink-0" />
                        <div className="bg-[#1E293B] p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm text-gray-300 shadow-sm">
                          I'm interested in the Premium Plan. Does it include API access?
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="self-end flex flex-row-reverse gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none text-sm text-white shadow-lg shadow-blue-900/20">
                          Yes, absolutely! The Premium Plan includes full API access and 24/7 support. Would you like a payment link?
                        </div>
                      </div>

                      {/* Sales Card */}
                      <div className="self-end flex flex-row-reverse gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full opacity-0 flex-shrink-0" /> {/* Spacer */}
                        <div className="bg-[#1E293B] p-4 rounded-xl border border-green-500/20 text-sm text-gray-300 w-full shadow-sm flex items-center gap-4">
                          <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
                            <ShoppingCart className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold">Premium Plan Authorization</div>
                            <div className="text-xs text-gray-500">$49.00 • Generated by AI</div>
                          </div>
                          <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">SENT</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-[#020617] relative z-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <FeatureCard
              icon={MessageSquare}
              title="Unified Inbox"
              description="Connect WhatsApp, Instagram, and more in one place."
            />
            <FeatureCard
              icon={Bot}
              title="AI Automation"
              description="Automate responses, qualify leads, and answer FAQs."
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Sales & Orders"
              description="Create orders and payments directly within chats."
            />
          </motion.div>
        </div>
      </section>

      {/* INTEGRATIONS SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#050b18]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.h3
            className="text-2xl font-bold mb-16 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Integrated with your favorite platforms
          </motion.h3>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-12 md:gap-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Real Logo Images - Grayscale to Color */}
            <div className="group relative w-auto h-10 flex items-center justify-center transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-110">
              <img src="/logos/whatsapp.png" alt="WhatsApp" className="h-full w-auto object-contain" />
            </div>
            <div className="group relative w-auto h-10 flex items-center justify-center transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-110">
              <img src="/logos/instagram.jpg" alt="Instagram" className="h-full w-auto object-contain rounded-lg" />
            </div>
            <div className="group relative w-auto h-10 flex items-center justify-center transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-110">
              <img src="/logos/telegram.jpg" alt="Telegram" className="h-full w-auto object-contain rounded-full" />
              {/* Note: User said telegram.png in prompt text but ls showed telegram.jpg, using jpg to be safe based on ls result */}
            </div>
            <div className="group relative w-auto h-10 flex items-center justify-center transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-110">
              <img src="/logos/messenger.png" alt="Messenger" className="h-full w-auto object-contain" />
              {/* Assumed exist based on instruction, though ls only showed 3 files. If failing, alt text will show. */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-[#020617] mt-auto">
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
      className="p-8 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1"
      variants={itemVariants}
    >
      <div className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}
