import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingBag, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* HERO SECTION */}
      <section className="relative px-6 pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden text-center lg:text-left">
        <div className="mx-auto max-w-6xl">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2 text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Centralize Chats <br />
                <span className="text-primary">Automate Sales</span>
              </h1>
              <ul className="space-y-3 mb-8 text-lg text-muted-foreground">
                <li className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Centralize WhatsApp & social media messages</li>
                <li className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Allow AI to fully manage conversations</li>
                <li className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Convert chats into orders and sales</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link href="/register" className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-primary-foreground font-semibold text-lg transition-transform hover:scale-105 shadow-lg shadow-primary/25">
                  Register Now
                </Link>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 lg:w-1/2 relative hidden lg:block">
              {/* Right: Image/Illustration (placeholder) */}
              <div className="relative rounded-xl border bg-card/50 backdrop-blur shadow-2xl p-6 aspect-video flex items-center justify-center text-muted-foreground bg-gradient-to-br from-card to-background">
                <div className="text-center p-8 border border-dashed rounded-lg bg-background/50">
                  <p className="font-semibold mb-2">Platform Dashboard</p>
                  <p className="text-sm opacity-70">Interactive Demo Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHATLIO SECTION */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Chatlio?</h2>
            <p className="text-muted-foreground text-lg">Built for serious sellers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageCircle}
              title="Unified Inbox"
              description="Centralize WhatsApp & social media messages into one stream."
            />
            <FeatureCard
              icon={Zap}
              title="AI Automation"
              description="Allow AI to fully manage conversations and answer queries."
            />
            <FeatureCard
              icon={ShoppingBag}
              title="Sales Conversion"
              description="Convert chats directly into orders and track post-sale process."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t mt-auto">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">© 2024 Chatlio Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-xl border bg-card hover:shadow-lg transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
