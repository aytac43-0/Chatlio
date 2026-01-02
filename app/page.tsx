"use client";

import Link from 'next/link';
import { MessageSquare, Bot, ShoppingCart, Send, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

// Mockups for social icons if Lucide doesn't have exact matches for all specific brands.
// Using text/custom SVGs as placeholders for brands not in Lucide regular set if needed, 
// but Lucide has general shapes. I'll use simple representations or text for clarity.

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
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative px-6 pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left mb-12 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1
                className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 leading-[1.1]"
                variants={itemVariants}
              >
                Centralize Chats, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Automate Sales
                </span>
              </motion.h1>

              <motion.ul
                className="space-y-4 mb-10 text-lg text-zinc-100 max-w-2xl mx-auto lg:mx-0"
                variants={containerVariants}
              >
                <motion.li className="flex items-center gap-3 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">⚡</span>
                  Centralize WhatsApp & social media messages
                </motion.li>
                <motion.li className="flex items-center gap-3 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">⚡</span>
                  Allow AI to fully manage conversations
                </motion.li>
                <motion.li className="flex items-center gap-3 justify-center lg:justify-start" variants={itemVariants}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">⚡</span>
                  Convert chats into orders and sales
                </motion.li>
              </motion.ul>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link href="/register" className="relative group inline-flex items-center justify-center h-14 px-8 rounded-full bg-blue-600 text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]">
                  <span className="relative z-10">Register Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual (Glassmorphism Card) */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 aspect-[4/3] overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500" />

                {/* Mock Dashboard Representation */}
                <div className="flex h-full gap-4">
                  {/* Sidebar Mock */}
                  <div className="w-16 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center py-4 gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20" />
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                    <div className="w-8 h-1 bg-white/10 mt-auto" />
                  </div>
                  {/* Main Content Mock */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="h-12 rounded-lg bg-white/5 border border-white/5 flex items-center px-4">
                      <div className="w-32 h-3 rounded-full bg-white/10" />
                    </div>
                    <div className="flex-1 rounded-lg bg-white/5 border border-white/5 p-4 flex flex-col gap-3">
                      <div className="self-start p-3 rounded-2xl rounded-tl-none bg-blue-600/20 text-blue-100 text-sm max-w-[80%]">
                        Is this item available in stock?
                      </div>
                      <div className="self-end p-3 rounded-2xl rounded-tr-none bg-emerald-600/20 text-emerald-100 text-sm max-w-[80%] flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        Yes! We have 3 left in stock.
                      </div>
                      <div className="self-end p-3 rounded-2xl rounded-tr-none bg-emerald-600/20 text-emerald-100 text-sm max-w-[80%]">
                        Would you like to place an order?
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-background relative z-10">
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
              delay={0}
            />
            <FeatureCard
              icon={Bot}
              title="AI Automation"
              description="Automate responses, qualify leads, and answer FAQs."
              delay={0.1}
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Sales & Orders"
              description="Create orders and payments directly within chats."
              delay={0.2}
            />
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-20 border-t border-white/5 bg-background/50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-xl text-muted-foreground mb-10 font-medium">Integrated with your favorite platforms</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple representations using text/icons for clarity as per "clean, monochrome" request */}
            <div className="flex items-center gap-2 font-semibold text-xl"><MessageSquare className="w-6 h-6" /> WhatsApp</div>
            <div className="flex items-center gap-2 font-semibold text-xl"><Instagram className="w-6 h-6" /> Instagram</div>
            <div className="flex items-center gap-2 font-semibold text-xl"><Send className="w-6 h-6" /> Telegram</div>
            <div className="flex items-center gap-2 font-semibold text-xl"><Facebook className="w-6 h-6" /> Messenger</div>
            <div className="flex items-center gap-2 font-bold text-xl">n8n</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t mt-auto bg-black/20">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">© 2024 Chatlio. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  return (
    <motion.div
      className="p-8 rounded-2xl border border-white/5 bg-[#0f172a] hover:border-blue-500/30 transition-colors group"
      variants={itemVariants}
    >
      <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
