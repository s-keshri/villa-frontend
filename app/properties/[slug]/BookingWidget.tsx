'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API = 'https://villa-api-production-f7b1.up.railway.app';

type Property = {
  slug: string;
  price_per_night: number;
  max_guests: number;
};

type GuestType = 'adults' | 'kids' | 'infants';

type BookingResult = {
  booking_ref: string;
  num_nights: number;
  total_amount: number;
};

export default function BookingWidget({ property }: { property: Property }) {
  const [checkin, setCheckin] = useState<Date | null>(null);
  const [checkout, setCheckout] = useState<Date | null>(null);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState({ adults: 1, kids: 0, infants: 0 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const totalGuests = guests.adults + guests.kids;
  const nights = checkin && checkout
    ? Math.round((checkout.getTime() - checkin.getTime()) / 86400000)
    : 0;
  const total = nights * property.price_per_night;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];
        const res = await fetch(
          `${API}/properties/${property.slug}/availability?checkin=${startDate}&checkout=${endDate}`
        );
        const data = await res.json();
        if (data.blocked_dates) {
          setBlockedDates(data.blocked_dates.map((d: string) => new Date(d + 'T00:00:00')));
        }
      } catch {
        console.error('Could not fetch availability');
      }
    };
    fetchBlockedDates();
  }, [property.slug]);

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(
      (bd) => bd.toDateString() === date.toDateString()
    );
  };

  const hasBlockedDateInRange = (start: Date, end: Date) => {
    const blocked = [];
    const current = new Date(start);
    while (current < end) {
      if (isDateBlocked(current)) {
        blocked.push(new Date(current).toLocaleDateString('en-IN'));
      }
      current.setDate(current.getDate() + 1);
    }
    return blocked;
  };

  const adjustGuest = (type: GuestType, delta: number) => {
    setGuests((prev) => {
      const next = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      if (type === 'adults' && next.adults < 1) next.adults = 1;
      if (next.adults + next.kids > property.max_guests) return prev;
      return next;
    });
  };

  const handleCheckinChange = (date: Date | null) => {
    setCheckin(date);
    setCheckout(null);
    setError('');
    setShowForm(false);
  };

  const handleCheckoutChange = (date: Date | null) => {
    setCheckout(date);
    setError('');
    setShowForm(false);
    if (date && checkin) {
      const blocked = hasBlockedDateInRange(checkin, date);
      if (blocked.length > 0) {
        setError(`These dates are already booked: ${blocked.join(', ')}`);
      }
    }
  };

  const handleReserve = () => {
    if (!checkin || !checkout) { setError('Please select check-in and check-out dates.'); return; }
    if (nights < 1) { setError('Check-out must be after check-in.'); return; }
    if (error) return;
    setShowForm(true);
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const handleSubmit = async () => {
    if (!guestName || !guestEmail) { setError('Name and email are required.'); return; }
    if (!checkin || !checkout) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_slug: property.slug,
          checkin_date: formatDate(checkin),
          checkout_date: formatDate(checkout),
          num_adults: guests.adults,
          num_kids: guests.kids,
          num_infants: guests.infants,
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          special_requests: specialRequests,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Booking failed');
      setResult(data);
      setShowForm(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (result) return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100 sticky top-24">
      <div className="text-center py-4">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-stone-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Booking Confirmed!
        </h3>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <p className="text-xs text-amber-600 uppercase tracking-wider mb-1">Booking Reference</p>
          <p className="text-2xl font-bold text-amber-700">{result.booking_ref}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-stone-600 mb-6">
          <div className="bg-stone-50 rounded-lg p-3">
            <p className="text-xs text-stone-400 mb-1">Nights</p>
            <p className="font-bold text-stone-900">{result.num_nights}</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-3">
            <p className="text-xs text-stone-400 mb-1">Total Paid</p>
            <p className="font-bold text-stone-900">₹{result.total_amount.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <p className="text-xs text-stone-400">Save your reference number.</p>
        <button
          onClick={() => { setResult(null); setCheckin(null); setCheckout(null); setGuests({ adults: 1, kids: 0, infants: 0 }); }}
          className="mt-4 text-sm text-amber-600 underline hover:text-amber-700"
        >
          Make another booking
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100 sticky top-24">
      <style>{`
        .react-datepicker { font-family: inherit; border: 1px solid #e7e5e4; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
        .react-datepicker__header { background: #fff; border-bottom: 1px solid #f5f5f4; border-radius: 12px 12px 0 0; padding-top: 12px; }
        .react-datepicker__current-month { color: #1c1917; font-weight: 600; font-size: 14px; }
        .react-datepicker__day--selected, .react-datepicker__day--in-range { background-color: #d97706 !important; color: white !important; }
        .react-datepicker__day--in-selecting-range { background-color: #fde68a !important; color: #92400e !important; }
        .react-datepicker__day:hover { background-color: #fef3c7 !important; color: #92400e !important; }
        .react-datepicker__day--disabled { color: #d1d5db !important; text-decoration: line-through; background-color: #f9fafb !important; cursor: not-allowed !important; }
        .react-datepicker__day--keyboard-selected { background-color: #d97706 !important; color: white !important; }
        .react-datepicker__navigation-icon::before { border-color: #78716c; }
      `}</style>

      {/* Price */}
      <div className="mb-5">
        <span className="text-3xl font-bold text-stone-900">₹{property.price_per_night.toLocaleString('en-IN')}</span>
        <span className="text-stone-400 text-sm ml-1">/ night</span>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Check-in</label>
          <DatePicker
            selected={checkin}
            onChange={handleCheckinChange}
            selectsStart
            startDate={checkin}
            endDate={checkout}
            minDate={today}
            excludeDates={blockedDates}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Check-out</label>
          <DatePicker
            selected={checkout}
            onChange={handleCheckoutChange}
            selectsEnd
            startDate={checkin}
            endDate={checkout}
            minDate={checkin || today}
            excludeDates={blockedDates}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Guest Picker */}
      <div className="mb-4 relative">
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Guests</label>
        <button
          onClick={() => setShowGuestPicker(!showGuestPicker)}
          className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-800 text-left flex justify-between items-center hover:border-amber-400 transition-colors"
        >
          <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}{guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : ''}</span>
          <span className="text-stone-400">{showGuestPicker ? '▲' : '▼'}</span>
        </button>

        {showGuestPicker && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-xl z-20 p-4">
            {([
              { type: 'adults' as GuestType, label: 'Adults', sub: 'Age 13+' },
              { type: 'kids' as GuestType, label: 'Children', sub: 'Ages 2–12' },
              { type: 'infants' as GuestType, label: 'Infants', sub: "Under 2 · Don't count toward max" },
            ]).map(({ type, label, sub }) => (
              <div key={type} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-stone-800">{label}</p>
                  <p className="text-xs text-stone-400">{sub}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => adjustGuest(type, -1)}
                    disabled={type === 'adults' ? guests[type] <= 1 : guests[type] <= 0}
                    className="w-8 h-8 rounded-full border border-stone-300 text-stone-600 flex items-center justify-center hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                  >−</button>
                  <span className="text-sm font-semibold text-stone-800 w-4 text-center">{guests[type]}</span>
                  <button
                    onClick={() => adjustGuest(type, 1)}
                    disabled={type !== 'infants' && totalGuests >= property.max_guests}
                    className="w-8 h-8 rounded-full border border-stone-300 text-stone-600 flex items-center justify-center hover:border-amber-500 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                  >+</button>
                </div>
              </div>
            ))}
            <p className="text-xs text-stone-400 mt-2">Max {property.max_guests} guests (excluding infants)</p>
            <button onClick={() => setShowGuestPicker(false)} className="mt-3 w-full text-sm text-amber-600 font-medium hover:text-amber-700">Done</button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      {nights > 0 && !error && (
        <div className="bg-stone-50 rounded-xl p-4 mb-4 text-sm">
          <div className="flex justify-between text-stone-600 mb-2">
            <span>₹{property.price_per_night.toLocaleString('en-IN')} × {nights} night{nights > 1 ? 's' : ''}</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-stone-900">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mb-3 bg-red-50 p-2 rounded-lg">⚠️ {error}</p>}

      {/* Guest Form */}
      {showForm && (
        <div className="mb-4 space-y-3">
          <hr className="border-stone-100" />
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Your Details</p>
          <input type="text" placeholder="Full name *" value={guestName} onChange={(e) => setGuestName(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <input type="email" placeholder="Email address *" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <input type="tel" placeholder="Phone number" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <textarea placeholder="Special requests (optional)" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)}
            rows={2} className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
        </div>
      )}

      {/* CTA */}
      {!showForm ? (
        <button onClick={handleReserve} disabled={!!error}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm tracking-wide">
          Reserve Now
        </button>
      ) : (
        <div className="flex gap-2">
          <button onClick={() => { setShowForm(false); setError(''); }}
            className="flex-1 border border-stone-200 text-stone-600 font-medium py-3.5 rounded-xl text-sm hover:bg-stone-50 transition-colors">
            Back
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      )}

      <p className="text-xs text-stone-400 text-center mt-3">No payment charged · Instant confirmation</p>
    </div>
  );
}