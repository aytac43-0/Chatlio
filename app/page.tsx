import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-3xl text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Transform your customer chats into revenue.</h1>
        <p className="text-lg text-muted-foreground mb-6">Connect WhatsApp and social media to Chatlio. Automate responses and manage orders in one place.</p>
        <Link href="/register">
          <a className="inline-block px-6 py-3 bg-primary text-white rounded shadow hover:opacity-95">Get Started</a>
        </Link>
      </div>
    </div>
  );
}
