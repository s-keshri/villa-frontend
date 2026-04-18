'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BookingWidget from './BookingWidget';

const API = 'https://villa-api-production-f7b1.up.railway.app';

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

const PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
];

type Property = {
  id: number; name: string; slug: string; location: string;
  description: string; bedrooms: number; beds: number; bathrooms: number;
  max_guests: number; price_per_night: number; is_pet_friendly: boolean;
  amenities: string[]; photos: string[];
};

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    fetch(`${API}/properties/${slug}`)
      .then((r) => r.json())
      .then((data) => { setProperty(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!property) return (
    <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center text-stone-600">
      Property not found. <Link href="/" className="text-amber-600 ml-2 underline">Go back</Link>
    </div>
  );

  const photos = property.photos?.length ? property.photos : PLACEHOLDERS;

  return (
    <main className="min-h-screen bg-[#f7f4ef]">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold tracking-tight text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
              Aureo<span className="text-amber-600">Stays</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-stone-500 hover:text-amber-600 transition-colors flex items-center gap-1">
            ← All Properties
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Photo Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[480px] mb-10 rounded-2xl overflow-hidden">
          <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => setActivePhoto(0)}>
            <img src={photos[0]} alt="main" className="w-full h-full object-cover hover:brightness-90 transition-all" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative cursor-pointer overflow-hidden" onClick={() => setActivePhoto(i)}>
              <img
                src={photos[i] || PLACEHOLDERS[i]}
                alt={`photo ${i}`}
                className="w-full h-full object-cover hover:brightness-90 transition-all hover:scale-105"
              />
              {i === 4 && photos.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold">+{photos.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content + Booking Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            {/* Title */}
            <div className="mb-6">
              <p className="text-amber-600 text-sm font-medium tracking-wide mb-2">📍 {property.location}</p>
              <h1 className="text-4xl font-bold text-stone-900 mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                {property.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm text-stone-600">
                <span className="flex items-center gap-2">🛏 <strong>{property.bedrooms}</strong> Bedrooms</span>
                <span className="flex items-center gap-2">🛌 <strong>{property.beds}</strong> Beds</span>
                <span className="flex items-center gap-2">🚿 <strong>{property.bathrooms}</strong> Bathrooms</span>
                <span className="flex items-center gap-2">👥 Up to <strong>{property.max_guests}</strong> guests</span>
                {property.is_pet_friendly && <span className="flex items-center gap-2">🐾 Pet Friendly</span>}
              </div>
            </div>

            <hr className="border-stone-200 mb-6" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                About this property
              </h2>
              <p className="text-stone-600 leading-relaxed">{property.description}</p>
            </div>

            <hr className="border-stone-200 mb-6" />

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities?.map((a) => (
                  <div key={a} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                    <span className="text-xl">{AMENITY_ICONS[a] || '✦'}</span>
                    <span className="text-sm text-stone-700 font-medium">{AMENITY_LABELS[a] || a.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-stone-200 mb-6" />

            {/* Meals */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Meals
              </h2>
              <p className="text-stone-600 leading-relaxed mb-3">
                Enjoy a selection of veg and non-veg meals during your stay.
              </p>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-center gap-2">✓ Chef-on-call available upon request for personalised dining</li>
                <li className="flex items-center gap-2">✓ Both vegetarian and non-vegetarian cuisines available</li>
                <li className="flex items-center gap-2">✓ Guests are welcome to access the kitchen for cooking</li>
              </ul>
            </div>
          </div>

          {/* Right: Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget property={property} />
          </div>
        </div>
      </div>

      <footer className="bg-stone-900 text-stone-400 text-center py-10 text-sm mt-16">
        <p style={{ fontFamily: 'Georgia, serif' }} className="text-white text-lg mb-1">AureoStays</p>
        <p>© 2026 · Built as a data engineering portfolio project</p>
      </footer>
    </main>
  );
}
