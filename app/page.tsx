"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Bot, ShoppingCart, Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#020617] text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative px-6 pt-16 pb-24 lg:pt-32 lg:pb-40">
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
                className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 leading-[1.1]"
                variants={itemVariants}
              >
                <span className="text-white">Centralize Chats,</span> <br />
                <span className="text-blue-500">
                  Automate Sales
                </span>
              </motion.h1>

              <motion.ul
                className="space-y-5 mb-10 text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0"
                variants={containerVariants}
              >
                <motion.li className="flex items-center gap-4 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500">
                    <Zap className="w-4 h-4 fill-current" />
                  </span>
                  Centralize WhatsApp & social media messages
                </motion.li>
                <motion.li className="flex items-center gap-4 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500">
                    <Zap className="w-4 h-4 fill-current" />
                  </span>
                  Allow AI to fully manage conversations
                </motion.li>
                <motion.li className="flex items-center gap-4 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500">
                    <Zap className="w-4 h-4 fill-current" />
                  </span>
                  Convert chats into orders and sales
                </motion.li>
              </motion.ul>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link href="/register" className="relative inline-flex items-center justify-center h-14 px-8 rounded-full bg-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)]">
                  Register Now
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual (Glassmorphism Dashboard Mockup) */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Glass Container */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-4 md:p-6 aspect-[4/3] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />

                <div className="flex h-full gap-4">
                  {/* Sidebar Mock */}
                  <div className="w-16 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center py-4 gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20" />
                    <div className="w-8 h-8 rounded-lg bg-white/10 mt-4" />
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                  </div>

                  {/* Content Mock */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* Header Mock */}
                    <div className="h-14 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between">
                      <div className="w-32 h-3 rounded-full bg-white/10" />
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                    </div>

                    {/* Chat Area Mock */}
                    <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col gap-3 relative overflow-hidden">
                      <div className="self-start p-3 rounded-2xl rounded-tl-none bg-blue-500/20 text-blue-100 text-sm max-w-[80%] border border-blue-500/10">
                        Is this item available in stock?
                      </div>
                      <div className="self-end p-3 rounded-2xl rounded-tr-none bg-emerald-500/20 text-emerald-100 text-sm max-w-[80%] border border-emerald-500/10 flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        Yes! We have 3 left in stock.
                      </div>
                      <div className="self-end p-3 rounded-2xl rounded-tr-none bg-emerald-500/20 text-emerald-100 text-sm max-w-[80%] border border-emerald-500/10">
                        Would you like to place an order?
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soft Background Glows */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/20 rounded-full blur-[80px] -z-10" />
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-[#020617] relative z-10">
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
            className="text-2xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Integrated with your favorite platforms
          </motion.h3>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Real Logo Images */}
            <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
              <img src="/logos/whatsapp.svg" alt="WhatsApp" className="w-full h-full object-contain" />
            </div>
            <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
              <img src="/logos/instagram.svg" alt="Instagram" className="w-full h-full object-contain" />
            </div>
            <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
              <img src="/logos/telegram.svg" alt="Telegram" className="w-full h-full object-contain" />
            </div>
            <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
              <img src="/logos/messenger.svg" alt="Messenger" className="w-full h-full object-contain" />
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
      className="p-8 rounded-xl border border-white/5 bg-[#050b18] hover:border-blue-500/30 transition-colors group"
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
