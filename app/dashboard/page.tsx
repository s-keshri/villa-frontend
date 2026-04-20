'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const API = 'https://villa-api-production-f7b1.up.railway.app';

type Booking = {
  id: number;
  booking_ref: string;
  property_name: string;
  property_location: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  checkin_date: string;
  checkout_date: string;
  num_nights: number;
  num_adults: number;
  num_kids: number;
  num_infants: number;
  total_guests: number;
  price_per_night: number;
  total_amount: number;
  status: string;
  special_requests: string;
  created_at: string;
};

const fmt = (n: number) =>
  '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const fmtTime = (d: string) =>
  new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(30);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API}/bookings/`);
      const data = await res.json();
      setBookings(data);
      setLastRefresh(new Date());
      setCountdown(30);
    } catch (e) {
      console.error('Failed to fetch bookings', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [lastRefresh]);

  // Metrics
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((s, b) => s + Number(b.total_amount), 0);
  const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

  // Revenue by property
  const revenueByProperty = bookings.reduce((acc, b) => {
    acc[b.property_name] = (acc[b.property_name] || 0) + Number(b.total_amount);
    return acc;
  }, {} as Record<string, number>);

  const maxRevenue = Math.max(...Object.values(revenueByProperty), 1);

  // Bookings by property
  const bookingsByProperty = bookings.reduce((acc, b) => {
    acc[b.property_name] = (acc[b.property_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const propertyColors: Record<string, string> = {
    'Velora Haven': '#d97706',
    'Azure Peaks Lodge': '#0ea5e9',
    'Casa Driftwood': '#10b981',
  };

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      {/* Header */}
      <header className="border-b border-stone-800 sticky top-0 z-50 bg-stone-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              Aureo<span className="text-amber-500">Stays</span>
            </Link>
            <span className="text-stone-600">|</span>
            <span className="text-stone-400 text-sm">Live ETL Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live · refreshes in {countdown}s
            </div>
            <button
              onClick={fetchBookings}
              className="text-xs text-amber-500 hover:text-amber-400 border border-stone-700 hover:border-amber-500 px-3 py-1.5 rounded-lg transition-all"
            >
              Refresh now
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ETL Pipeline Explainer */}
        <div className="bg-stone-900 border border-stone-700 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="text-2xl">⚡</div>
            <div>
              <h2 className="text-white font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                How the ETL Pipeline Works
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Every booking on <a href="https://villa-frontend.vercel.app" target="_blank" className="text-amber-500 hover:underline">villa-frontend.vercel.app</a> triggers a single atomic database transaction.
                Make a booking there and watch a new row appear in the table below within seconds.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  '1. Guest submits booking form',
                  '2. API validates availability',
                  '3. Guest upserted into DB',
                  '4. Booking written atomically',
                  '5. Inventory dates blocked',
                  '6. Confirmation email sent',
                ].map((step, i) => (
                  <span key={i} className="bg-stone-800 border border-stone-700 text-stone-300 px-3 py-1.5 rounded-full">
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Bookings', value: totalBookings.toString(), sub: 'confirmed reservations', icon: '📋' },
            { label: 'Total Revenue', value: fmt(totalRevenue), sub: 'across all properties', icon: '💰' },
            { label: 'Avg Booking Value', value: fmt(avgBookingValue), sub: 'per reservation', icon: '📊' },
          ].map((m) => (
            <div key={m.label} className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="text-2xl mb-3">{m.icon}</div>
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">{m.label}</p>
              <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>{m.value}</p>
              <p className="text-stone-500 text-xs">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Revenue by Property */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Revenue by Property
            </h3>
            <div className="space-y-4">
              {Object.entries(revenueByProperty)
                .sort(([, a], [, b]) => b - a)
                .map(([name, revenue]) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-300">{name}</span>
                      <span className="text-white font-semibold">{fmt(revenue)}</span>
                    </div>
                    <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(revenue / maxRevenue) * 100}%`,
                          backgroundColor: propertyColors[name] || '#d97706',
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Bookings by Property
            </h3>
            <div className="space-y-4">
              {Object.entries(bookingsByProperty)
                .sort(([, a], [, b]) => b - a)
                .map(([name, count]) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: propertyColors[name] || '#d97706' }}
                      />
                      <span className="text-stone-300 text-sm">{name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: count }).map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-sm"
                            style={{ backgroundColor: propertyColors[name] || '#d97706', opacity: 0.8 }}
                          />
                        ))}
                      </div>
                      <span className="text-white font-bold text-sm ml-2">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Live Bookings Table */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Live Bookings Feed
              </h3>
              <p className="text-stone-500 text-xs mt-1">
                {totalBookings} total · last updated {fmtTime(lastRefresh.toISOString())}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-stone-500 text-xs uppercase tracking-wider border-b border-stone-800">
                    <th className="text-left px-6 py-3">Booking Ref</th>
                    <th className="text-left px-6 py-3">Guest</th>
                    <th className="text-left px-6 py-3">Property</th>
                    <th className="text-left px-6 py-3">Check-in</th>
                    <th className="text-left px-6 py-3">Nights</th>
                    <th className="text-left px-6 py-3">Guests</th>
                    <th className="text-left px-6 py-3">Amount</th>
                    <th className="text-left px-6 py-3">Booked At</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr
                      key={b.id}
                      className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-amber-500 font-mono text-xs font-bold">{b.booking_ref}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{b.guest_name}</p>
                        <p className="text-stone-500 text-xs">{b.guest_email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: propertyColors[b.property_name] || '#d97706' }}
                          />
                          <div>
                            <p className="text-stone-300 text-xs">{b.property_name}</p>
                            <p className="text-stone-600 text-xs">{b.property_location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-300 text-xs">{fmtDate(b.checkin_date)}</td>
                      <td className="px-6 py-4 text-stone-300 text-xs">{b.num_nights}n</td>
                      <td className="px-6 py-4 text-stone-300 text-xs">{b.total_guests}</td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">{fmt(Number(b.total_amount))}</span>
                      </td>
                      <td className="px-6 py-4 text-stone-500 text-xs">{fmtTime(b.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SQL Transparency Section */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-10">
          <h3 className="text-white font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            The SQL Behind This Dashboard
          </h3>
          <p className="text-stone-400 text-sm mb-4">
            This data is queried live from PostgreSQL on Supabase. Here's the exact query powering the bookings table above:
          </p>
          <pre className="bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs text-stone-300 overflow-x-auto leading-relaxed">
{`SELECT
    b.booking_ref,
    p.name        AS property_name,
    p.location    AS property_location,
    g.full_name   AS guest_name,
    g.email       AS guest_email,
    b.checkin_date,
    b.checkout_date,
    (b.checkout_date - b.checkin_date)             AS num_nights,
    (b.num_adults + b.num_kids)                    AS total_guests,
    (b.checkout_date - b.checkin_date)
        * b.price_per_night                        AS total_amount,
    b.status,
    b.created_at
FROM bookings b
JOIN properties p ON p.id = b.property_id
JOIN guests    g ON g.id  = b.guest_id
ORDER BY b.created_at DESC;`}
          </pre>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-stone-400 text-sm mb-4">
            Want to see the pipeline in action? Make a booking and watch it appear above.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Book a Villa →
          </Link>
        </div>

      </div>

      <footer className="border-t border-stone-800 py-8 text-center text-stone-600 text-xs">
        AureoStays · Data Engineering Portfolio · Built by Shivam Keshri
      </footer>
    </main>
  );
}