// Comprehensive Delhi Tourist & Transit Gazetteer with Phonetic & Alias Matching
export const DELHI_GAZETTEER = [
  {
    names: ['chandni chowk', 'chandi chawk', 'chandani chowk', 'chandi chowk', 'chandni chawk', 'katra neel', 'dariba kalan'],
    name: 'Chandni Chowk, Old Delhi',
    lat: 28.6506,
    lng: 77.2303,
    category: 'Market / Heritage'
  },
  {
    names: ['red fort', 'lal qila', 'lal kila', 'laal quila', 'lahori gate'],
    name: 'Red Fort (Lal Qila)',
    lat: 28.6562,
    lng: 77.2410,
    category: 'UNESCO Heritage'
  },
  {
    names: ['new delhi railway station', 'ndls', 'ajmeri gate', 'paharganj side'],
    name: 'New Delhi Railway Station (NDLS)',
    lat: 28.6429,
    lng: 77.2195,
    category: 'Transit Hub'
  },
  {
    names: ['old delhi railway station', 'dli', 'purani dilli station'],
    name: 'Old Delhi Railway Station (DLI)',
    lat: 28.6619,
    lng: 77.2280,
    category: 'Transit Hub'
  },
  {
    names: ['india gate', 'kartavya path', 'rajpath'],
    name: 'India Gate, New Delhi',
    lat: 28.6129,
    lng: 77.2295,
    category: 'Memorial'
  },
  {
    names: ['connaught place', 'cp', 'rajiv chowk', 'inner circle', 'outer circle'],
    name: 'Connaught Place (CP)',
    lat: 28.6315,
    lng: 77.2167,
    category: 'Commercial Hub'
  },
  {
    names: ['qutub minar', 'qutab minar', 'kutub minar', 'mehrauli'],
    name: 'Qutub Minar, Mehrauli',
    lat: 28.5245,
    lng: 77.1855,
    category: 'UNESCO Heritage'
  },
  {
    names: ['lotus temple', 'bahai house of worship', 'kalkaji'],
    name: 'Lotus Temple (Baháʼí House of Worship)',
    lat: 28.5535,
    lng: 77.2588,
    category: 'Place of Worship'
  },
  {
    names: ['jama masjid', 'old delhi mosque'],
    name: 'Jama Masjid, Old Delhi',
    lat: 28.6507,
    lng: 77.2334,
    category: 'Heritage'
  },
  {
    names: ['akshardham', 'swaminarayan akshardham', 'akshardham temple'],
    name: 'Swaminarayan Akshardham Temple',
    lat: 28.6127,
    lng: 77.2773,
    category: 'Place of Worship'
  },
  {
    names: ['humayun tomb', 'humayun\'s tomb', 'nizamuddin'],
    name: 'Humayun\'s Tomb, Nizamuddin',
    lat: 28.5933,
    lng: 77.2507,
    category: 'UNESCO Heritage'
  },
  {
    names: ['delhi airport', 'igi', 'igi t3', 'terminal 3', 'indira gandhi airport', 'aerocity'],
    name: 'Indira Gandhi International Airport (IGI T3)',
    lat: 28.5562,
    lng: 77.1000,
    category: 'Airport'
  },
  {
    names: ['hauz khas', 'hauz khas village', 'hkv'],
    name: 'Hauz Khas Village',
    lat: 28.5494,
    lng: 77.2001,
    category: 'Cultural'
  },
  {
    names: ['karol bagh', 'gaffar market'],
    name: 'Karol Bagh Market',
    lat: 28.6524,
    lng: 77.1904,
    category: 'Commercial Hub'
  },
  {
    names: ['sarojini nagar', 'sarojini market'],
    name: 'Sarojini Nagar Market',
    lat: 28.5746,
    lng: 77.1983,
    category: 'Market'
  },
  {
    names: ['lajpat nagar', 'central market'],
    name: 'Lajpat Nagar (Central Market)',
    lat: 28.5700,
    lng: 77.2435,
    category: 'Market'
  },
  {
    names: ['paharganj', 'main bazaar'],
    name: 'Paharganj (Main Bazaar)',
    lat: 28.6435,
    lng: 77.2135,
    category: 'Tourist Hub'
  },
  {
    names: ['bangla sahib', 'gurudwara bangla sahib'],
    name: 'Gurudwara Bangla Sahib',
    lat: 28.6264,
    lng: 77.2091,
    category: 'Place of Worship'
  },
  {
    names: ['daryaganj', 'delhi gate', 'asaf ali road'],
    name: 'Daryaganj / Delhi Gate',
    lat: 28.6415,
    lng: 77.2405,
    category: 'Historic Ward'
  }
];

/**
 * Unbiased Multi-Tier Location Resolver:
 * - Supports all Indian cities and regions (Lucknow, Delhi, Mumbai, Agra, Jaipur, etc.)
 * - Proximity-biased to user's live GPS coordinates when provided (so "charbagh" resolves to Lucknow if user is in UP)
 * - Returns ranked candidate list for disambiguation
 */
export async function searchLocations(query, userLocation = null) {
  if (!query || query.trim() === '') return [];
  const cleanQ = query.trim();
  const lowerQ = cleanQ.toLowerCase();

  const candidates = [];

  // Tier 1: Check Local Gazetteer ONLY for explicit Delhi monuments/aliases
  const gazetteerMatch = DELHI_GAZETTEER.find(item =>
    item.names.some(n => lowerQ === n || lowerQ.startsWith(n + ' ') || lowerQ.endsWith(' ' + n))
  );
  if (gazetteerMatch) {
    candidates.push({
      lat: gazetteerMatch.lat,
      lng: gazetteerMatch.lng,
      name: gazetteerMatch.name,
      formattedAddress: `${gazetteerMatch.name}, Delhi, India`,
      category: gazetteerMatch.category,
      source: 'Verified Heritage Gazetteer'
    });
  }

  // Tier 2: Google Maps Geocoder (Client JS SDK with optional GPS bounding bias)
  if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.Geocoder) {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const request = {
        address: lowerQ.includes('india') ? cleanQ : `${cleanQ}, India`,
        componentRestrictions: { country: 'IN' }
      };

      // If user's current GPS is provided, bias results within ~100km radius
      if (userLocation && userLocation.lat && userLocation.lng) {
        const delta = 1.0;
        request.bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(userLocation.lat - delta, userLocation.lng - delta),
          new window.google.maps.LatLng(userLocation.lat + delta, userLocation.lng + delta)
        );
      }

      const googleResults = await new Promise((resolve) => {
        geocoder.geocode(request, (results, status) => {
          if (status === 'OK' && Array.isArray(results)) {
            resolve(results);
          } else {
            console.log('[MapResolver] Google Geocoder status:', status);
            resolve([]);
          }
        });
      });

      googleResults.slice(0, 5).forEach(item => {
        const loc = item.geometry.location;
        const lat = typeof loc.lat === 'function' ? loc.lat() : loc.lat;
        const lng = typeof loc.lng === 'function' ? loc.lng() : loc.lng;
        // Avoid duplicate coordinates
        if (!candidates.some(c => Math.abs(c.lat - lat) < 0.005 && Math.abs(c.lng - lng) < 0.005)) {
          candidates.push({
            lat,
            lng,
            name: item.formatted_address.split(',').slice(0, 2).join(', '),
            formattedAddress: item.formatted_address,
            category: item.types?.[0]?.replace(/_/g, ' ') || 'Location',
            source: 'Google Geocoding API'
          });
        }
      });
    } catch (err) {
      console.warn('[MapResolver] Google Geocoder exception:', err);
    }
  }

  // Tier 3: OpenStreetMap Nominatim with Proximity Bias (No Hardcoded City Restrictions)
  try {
    const searchTarget = lowerQ.includes('india') ? cleanQ : `${cleanQ}, India`;
    let nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTarget)}&countrycodes=in&limit=6`;

    if (userLocation && userLocation.lat && userLocation.lng) {
      // Proximity viewbox around user's live position
      const d = 1.5; // ~150km viewbox
      nominatimUrl += `&viewbox=${userLocation.lng - d},${userLocation.lat + d},${userLocation.lng + d},${userLocation.lat - d}&bounded=0`;
    }

    const res = await fetch(nominatimUrl, {
      headers: { 'Accept-Language': 'en', 'User-Agent': 'TravelMate-Geocoder/1.0' }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        data.forEach(item => {
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          if (!isNaN(lat) && !isNaN(lng)) {
            const isDuplicate = candidates.some(c => Math.abs(c.lat - lat) < 0.005 && Math.abs(c.lng - lng) < 0.005);
            if (!isDuplicate) {
              candidates.push({
                lat,
                lng,
                name: item.display_name.split(',').slice(0, 2).join(', '),
                formattedAddress: item.display_name,
                category: item.type || 'Landmark',
                source: 'OpenStreetMap'
              });
            }
          }
        });
      }
    }
  } catch (err) {
    console.warn('[MapResolver] Nominatim fallback search error:', err);
  }

  // Rank / Sort candidates by proximity to user's live coordinates (if available)
  if (userLocation && userLocation.lat && userLocation.lng) {
    candidates.forEach(c => {
      // Approximate Haversine distance in km
      const dLat = (c.lat - userLocation.lat) * (Math.PI / 180);
      const dLng = (c.lng - userLocation.lng) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(userLocation.lat * (Math.PI / 180)) * Math.cos(c.lat * (Math.PI / 180)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const dist = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      c.distanceKm = parseFloat(dist.toFixed(1));
    });

    candidates.sort((a, b) => (a.distanceKm || 9999) - (b.distanceKm || 9999));
  }

  return candidates;
}

/**
 * Resolves a single best location without Delhi bias.
 * Prioritizes closest match to userLocation.
 */
export async function resolveLocation(query, userLocation = null) {
  const matches = await searchLocations(query, userLocation);
  if (matches && matches.length > 0) {
    return matches[0];
  }

  // Fallback if network fails: bias around user location if provided, else fallback to Central Delhi
  if (userLocation && userLocation.lat && userLocation.lng) {
    return {
      lat: userLocation.lat + 0.02,
      lng: userLocation.lng + 0.02,
      name: query,
      formattedAddress: `${query} (Near Current Location)`,
      source: 'User Proximity Approximation'
    };
  }

  return {
    lat: 28.6506,
    lng: 77.2303,
    name: query,
    formattedAddress: `${query}, India`,
    source: 'Default Geo Fallback'
  };
}
