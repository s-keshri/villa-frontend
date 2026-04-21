'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef]">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/">
              <span className="text-2xl font-bold tracking-tight text-stone-900 cursor-pointer" style={{ fontFamily: 'Georgia, serif' }}>
                Aureo<span className="text-amber-600">Stays</span>
              </span>
            </Link>
            <p className="text-xs text-stone-400 tracking-widest uppercase mt-0.5">Curated Villa Experiences</p>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-stone-600">
            <Link href="/" className="hover:text-amber-600 transition-colors">Properties</Link>
            <Link href="/dashboard" className="hover:text-amber-600 transition-colors">Dashboard</Link>
            <Link href="/contact" className="text-amber-600 font-medium">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-stone-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Get in touch</p>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Shivam Keshri
          </h1>
          <p className="text-stone-400 text-base">
            Data Engineer · Full-Stack Developer · Builder of AureoStays
          </p>
        </div>
      </section>

      {/* Contact Card */}
      <section className="max-w-2xl mx-auto px-6 py-16">

        {/* About */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 mb-6">
          <h2 className="text-lg font-bold text-stone-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            About this project
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            AureoStays is a data engineering portfolio project demonstrating a production-grade ETL pipeline.
            Every booking flows through a FastAPI backend into a PostgreSQL database on Supabase,
            queryable live via the analytics dashboard. Built with Next.js, Tailwind CSS, Python, and Metabase.
          </p>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 mb-6">
          <h2 className="text-lg font-bold text-stone-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Contact Details
          </h2>

          <div className="space-y-5">
            {/* Email */}
            <a
              href="mailto:shivam.keshri0408@gmail.com"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                ✉
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                  shivam.keshri0408@gmail.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+919955582518"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                ☎
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Phone</p>
                <p className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                  +91 99555 82518
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shivam-keshri04/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                in
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
                <p className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                  linkedin.com/in/shivam-keshri04
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/s-keshri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0 font-bold text-xs">
                GH
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">GitHub</p>
                <p className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                  github.com/s-keshri
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-lg font-bold text-stone-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Project Links
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://villa-frontend.vercel.app"
              target="_blank"
              className="flex flex-col gap-1 border border-stone-200 hover:border-amber-400 rounded-xl p-4 transition-colors group"
            >
              <span className="text-xs text-stone-400 uppercase tracking-wider">Live Site</span>
              <span className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                villa-frontend.vercel.app
              </span>
            </a>
            <a
              href="https://villa-api-production-f7b1.up.railway.app/docs"
              target="_blank"
              className="flex flex-col gap-1 border border-stone-200 hover:border-amber-400 rounded-xl p-4 transition-colors group"
            >
              <span className="text-xs text-stone-400 uppercase tracking-wider">API Docs</span>
              <span className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                Swagger UI
              </span>
            </a>
            <a
              href="https://github.com/s-keshri/villa-frontend"
              target="_blank"
              className="flex flex-col gap-1 border border-stone-200 hover:border-amber-400 rounded-xl p-4 transition-colors group"
            >
              <span className="text-xs text-stone-400 uppercase tracking-wider">Frontend Repo</span>
              <span className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                github.com/s-keshri
              </span>
            </a>
            <Link
              href="/dashboard"
              className="flex flex-col gap-1 border border-stone-200 hover:border-amber-400 rounded-xl p-4 transition-colors group"
            >
              <span className="text-xs text-stone-400 uppercase tracking-wider">ETL Dashboard</span>
              <span className="text-sm font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                Live pipeline data
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-center py-10 text-sm mt-4">
        <p style={{ fontFamily: 'Georgia, serif' }} className="text-white text-lg mb-1">AureoStays</p>
        <p>© 2026 · Built as a data engineering portfolio project by Shivam Keshri</p>
      </footer>
    </main>
  );
}
