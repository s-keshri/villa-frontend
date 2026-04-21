'use client';

import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/about" className="text-amber-600 font-medium">About</Link>
            <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-stone-900 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Shivam Keshri
          </h1>
          <p className="text-stone-400 text-base mb-6">
            Data Analyst · Aspiring Data Engineer · Builder of AureoStays
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a href="mailto:shivam.keshri0408@gmail.com" className="text-amber-400 hover:text-amber-300 transition-colors">
              shivam.keshri0408@gmail.com
            </a>
            <span className="text-stone-600">·</span>
            <a href="https://www.linkedin.com/in/shivam-keshri04/" target="_blank" className="text-amber-400 hover:text-amber-300 transition-colors">
              LinkedIn
            </a>
            <span className="text-stone-600">·</span>
            <a href="https://github.com/s-keshri" target="_blank" className="text-amber-400 hover:text-amber-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">

        {/* Work Experience */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-lg font-bold text-stone-900 mb-6 pb-3 border-b border-stone-100" style={{ fontFamily: 'Georgia, serif' }}>
            Work Experience
          </h2>
          <div>
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-base font-bold text-stone-900">Business Analyst</h3>
                <p className="text-amber-600 text-sm font-medium">Elivaas</p>
              </div>
              <span className="text-xs text-stone-400 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full whitespace-nowrap">
                Aug 2025 – Present
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                'Developed and automated a Daily Business Health Tracker for key business channels (B2B, B2C, Supply, Website) using Google Apps Script, delivering timely executive-ready reporting that enabled data-driven decision-making for senior management.',
                'Designed and maintained monthly performance dashboards for B2B and B2C channels, translating complex operational data into clear, compelling management presentations — contributing to a 2.8x revenue increase from September to December.',
                'Organised and presented property- and location-level performance analyses to cross-functional stakeholders, closing revenue gaps and driving a 42% property-level and 35% location-level revenue increase between September and December.',
                'Managed end-to-end pricing operations by maintaining and updating property rate plans in PostgreSQL, ensuring data accuracy and competitive positioning across all platforms.',
                'Executed targeted promotional campaigns and tracked conversion metrics, improving direct channel revenue by 18% over a quarter through structured analysis and iterative recommendation cycles.',
              ].map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-600 leading-relaxed">
                  <span className="text-amber-500 mt-1 flex-shrink-0">▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-lg font-bold text-stone-900 mb-6 pb-3 border-b border-stone-100" style={{ fontFamily: 'Georgia, serif' }}>
            Education
          </h2>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">B.Tech, Electrical Engineering</h3>
              <p className="text-amber-600 text-sm font-medium mt-0.5">National Institute of Technology, Jaipur</p>
            </div>
            <span className="text-xs text-stone-400 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full whitespace-nowrap">
              2021 – 2025
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-lg font-bold text-stone-900 mb-6 pb-3 border-b border-stone-100" style={{ fontFamily: 'Georgia, serif' }}>
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: 'Data & Analytics Tools',
                items: ['SQL / PostgreSQL', 'Power BI', 'Metabase', 'Redash', 'Mixpanel', 'Google Analytics'],
              },
              {
                category: 'Presentation & Reporting',
                items: ['PowerPoint', 'Excel (Pivot Tables, Advanced Formulas)', 'Google Sheets', 'Dashboards'],
              },
              {
                category: 'Collaboration & PM Tools',
                items: ['SharePoint', 'Google Apps Script', 'Jupyter Notebook'],
              },
              {
                category: 'Business Analysis',
                items: ['KPI Tracking', 'Funnel Analysis', 'Cohort Analysis', 'A/B Testing', 'Business Performance Reporting'],
              },
              {
                category: 'Languages',
                items: ['Python', 'SQL'],
              },
              {
                category: 'Project Management',
                items: ['Executive Ad-hoc Reporting', 'Cross-functional Coordination', 'Process Improvement', 'Documentation'],
              },
            ].map((skill) => (
              <div key={skill.category}>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">{skill.category}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="text-xs bg-stone-50 border border-stone-200 text-stone-700 px-2.5 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-lg font-bold text-stone-900 mb-6 pb-3 border-b border-stone-100" style={{ fontFamily: 'Georgia, serif' }}>
            Projects
          </h2>
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">AureoStays — Villa Booking Platform</h3>
                <p className="text-amber-600 text-sm font-medium mt-0.5">Data Engineering Portfolio Project</p>
              </div>
              <span className="text-xs text-stone-400 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full">
                2026
              </span>
            </div>
            <ul className="space-y-3 mb-4">
              {[
                'Built a production-grade ETL pipeline where every guest booking flows through a FastAPI backend into a structured PostgreSQL database with atomic transactions and double-booking prevention.',
                'Designed a 4-table schema (properties, inventory, guests, bookings) with generated columns, price snapshotting, and inventory-based availability tracking.',
                'Built a live analytics dashboard at /dashboard showing real-time revenue, occupancy, and booking data — demonstrating the full Extract → Transform → Load cycle.',
                'Deployed frontend on Vercel, API on Railway, and database on Supabase with transactional email via Resend.',
              ].map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-600 leading-relaxed">
                  <span className="text-amber-500 mt-1 flex-shrink-0">▸</span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Next.js', 'FastAPI', 'PostgreSQL', 'Python', 'Supabase', 'Tailwind CSS', 'Metabase', 'Railway', 'Vercel'].map((tech) => (
                <span key={tech} className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="https://villa-frontend.vercel.app" target="_blank"
                className="text-xs text-stone-500 hover:text-amber-600 border border-stone-200 hover:border-amber-400 px-3 py-1.5 rounded-lg transition-colors">
                Live Site →
              </a>
              <a href="https://github.com/s-keshri/villa-frontend" target="_blank"
                className="text-xs text-stone-500 hover:text-amber-600 border border-stone-200 hover:border-amber-400 px-3 py-1.5 rounded-lg transition-colors">
                GitHub →
              </a>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-lg font-bold text-stone-900 mb-6 pb-3 border-b border-stone-100" style={{ fontFamily: 'Georgia, serif' }}>
            Achievements
          </h2>
          <div className="flex gap-3">
            <span className="text-amber-500 mt-1 flex-shrink-0">▸</span>
            <p className="text-sm text-stone-600 leading-relaxed">
              <span className="font-semibold text-stone-800">All India Rank 13,000</span> in JEE Mains 2021,
              competing with approximately 1 million students nationwide.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-center py-10 text-sm mt-4">
        <p style={{ fontFamily: 'Georgia, serif' }} className="text-white text-lg mb-1">AureoStays</p>
        <p>© 2026 · Built as a data engineering portfolio project by Shivam Keshri</p>
      </footer>
    </main>
  );
}
