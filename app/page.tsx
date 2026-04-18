'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = 'https://villa-api-production-f7b1.up.railway.app/';

const AMENITY_ICONS: Record<string, string> = {
  private_pool: '🏊',
  indoor_pool: '🏊',
  shared_pool: '🏊',
  bar: '🍸',
  terrace: '🌅',
  loungers: '🛋️',
  wifi: '📶',
  lift: '🛗',
  parking: '🚗',
  jacuzzi: '🛁',
  fireplace: '🔥',
  barbeque: '🍖',
  nature_trail: '🌿',
  bonfire: '🪵',
  kitchen: '🍳',
  air_conditioning: '❄️',
  private_beach_access: '🏖️',
};

const AMENITY_LABELS: Record<string, string> = {
  private_pool: 'Private Pool',
  indoor_pool: 'Indoor Pool',
  shared_pool: 'Shared Pool',
  bar: 'Bar Lounge',
  terrace: 'Terrace',
  loungers: 'Sun Loungers',
  wifi: 'High-Speed WiFi',
  lift: 'Elevator',
  parking: 'Free Parking',
  jacuzzi: 'Jacuzzi',
  fireplace: 'Fireplace',
  barbeque: 'Barbeque',
  nature_trail: 'Nature Trail',
  bonfire: 'Bonfire Area',
  kitchen: 'Kitchen',
  air_conditioning: 'Air Conditioning',
  private_beach_access: 'Private Beach Access',
};

type Property = {
  id: number;
  name: string;
  slug: string;
  location: string;
  description: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  max_guests: number;
  price_per_night: number;
  is_pet_friendly: boolean;
  amenities: string[];
  photos: string[];
};

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
  'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=800&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
];

export default function ListingPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [carouselIndex, setCarouselIndex] = useState<Record<number, number>>({});

  useEffect(() => {
    fetch(`${API}/properties`)
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not connect to API. Make sure uvicorn is running on port 8000.');
        setLoading(false);
      });
  }, []);

  const getImages = (p: Property) =>
    p.photos && p.photos.length > 0 ? p.photos : PLACEHOLDER_IMAGES;

  const nextImage = (e: React.MouseEvent, id: number, total: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % total }));
  };

  const prevImage = (e: React.MouseEvent, id: number, total: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) - 1 + total) % total }));
  };

  return (
    <main className="min-h-screen bg-[#f7f4ef]">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold tracking-tight text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
              Aureo<span className="text-amber-600">Stays</span>
            </span>
            <p className="text-xs text-stone-400 tracking-widest uppercase mt-0.5">Curated Villa Experiences</p>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-stone-600">
            <a href="#" className="hover:text-amber-600 transition-colors">Properties</a>
            <a href="#" className="hover:text-amber-600 transition-colors">About</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-stone-900 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d97706 0%, transparent 50%), radial-gradient(circle at 80% 20%, #92400e 0%, transparent 40%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Hand-picked luxury villas</p>
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Find Your Perfect Escape
          </h1>
          <p className="text-stone-300 text-lg">
            Private villas across India's most coveted destinations — Goa, Kasauli, Bengaluru and beyond.
          </p>
        </div>
      </section>

      {/* Properties */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
              Our Properties
            </h2>
            <p className="text-stone-500 text-sm mt-1">{properties.length} villas available</p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => {
            const images = getImages(p);
            const currentIdx = carouselIndex[p.id] || 0;

            return (
              <Link key={p.id} href={`/properties/${p.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                  {/* Carousel */}
                  <div className="relative h-56 overflow-hidden">
                    {images.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`${p.name} photo ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          currentIdx === idx ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}

                    {/* Prev arrow */}
                    <button
                      onClick={(e) => prevImage(e, p.id, images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-stone-800 text-lg font-bold shadow"
                    >
                      ‹
                    </button>

                    {/* Next arrow */}
                    <button
                      onClick={(e) => nextImage(e, p.id, images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-stone-800 text-lg font-bold shadow"
                    >
                      ›
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`rounded-full transition-all duration-300 ${
                            currentIdx === idx ? 'bg-white w-4 h-1.5' : 'bg-white/50 w-1.5 h-1.5'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Pet friendly badge */}
                    {p.is_pet_friendly && (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-stone-700 font-medium z-10">
                        🐾 Pet Friendly
                      </span>
                    )}

                    {/* Price badge */}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 z-10">
                      <span className="text-amber-700 font-bold text-sm">₹{p.price_per_night.toLocaleString('en-IN')}</span>
                      <span className="text-stone-500 text-xs">/night</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-amber-600 font-medium tracking-wide uppercase mb-1">📍 {p.location}</p>
                    <h3 className="text-lg font-bold text-stone-900 mb-3 leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                      {p.name}
                    </h3>

                    {/* Stats */}
                    <div className="flex gap-4 text-xs text-stone-500 mb-4 pb-4 border-b border-stone-100">
                      <span>🛏 {p.bedrooms} Bed</span>
                      <span>🚿 {p.bathrooms} Bath</span>
                      <span>👥 {p.max_guests} Guests</span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.amenities?.slice(0, 4).map((a) => (
                        <span key={a} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                          {AMENITY_ICONS[a] || '✦'} {AMENITY_LABELS[a] || a.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {p.amenities?.length > 4 && (
                        <span className="text-xs text-amber-600 px-2 py-1">+{p.amenities.length - 4} more</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">{p.description?.slice(0, 60)}...</span>
                      <span className="text-amber-600 text-sm font-medium group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-center py-10 text-sm mt-16">
        <p style={{ fontFamily: 'Georgia, serif' }} className="text-white text-lg mb-1">AureoStays</p>
        <p>© 2026 · Built as a data engineering portfolio project</p>
      </footer>
    </main>
  );
}