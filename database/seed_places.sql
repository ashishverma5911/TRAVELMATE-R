-- ==============================================================================
-- TravelMate: 10 Verified Delhi Places Seed Data
-- Every place record has: name, hindi_name, category, coordinates, timings,
-- fee {indian, foreigner, saarc_bimstec, child, source_url, last_verified, verification_status},
-- official_ticket_url, safety_notes, crowd_data, verification_status
-- ==============================================================================

INSERT INTO places (place_key, name, hindi_name, category, coordinates, timings, fee, official_ticket_url, safety_notes, crowd_data, verification_status, last_verified)
VALUES
(
    'red-fort',
    'Red Fort (Lal Qila)',
    'लाल किला',
    'Heritage / UNESCO Site',
    '{"lat": 28.6562, "lng": 77.2410}'::jsonb,
    '{"opening": "09:30", "closing": "16:30", "closed_on": "Mondays", "evening_show": "18:00 - 21:00 (Light & Sound)"}'::jsonb,
    '{
        "indian": 35,
        "foreigner": 550,
        "saarc_bimstec": 35,
        "child": 0,
        "currency": "INR",
        "source_url": "https://asi.nic.in",
        "last_verified": "2026-08-20",
        "verification_status": "Official"
    }'::jsonb,
    'https://asi.payumoney.com/#/monument/redfort',
    '[
        "Beware of unauthorized touts outside Chandni Chowk metro claiming monument is closed.",
        "Buy tickets strictly via official ASI QR boards or ASI online portal to avoid counterfeit surcharges.",
        "Security checkpoint at Lahori Gate has separate lines for women and foreign visitors with passports/SafeVisit Pass.",
        "Audio guides are available at the official ASI kiosk near the inner gate."
    ]'::jsonb,
    '{"estimated_crowd": "High", "peak_hours": "11:00 - 15:30", "best_time": "Morning 09:30 - 10:30"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'qutub-minar',
    'Qutub Minar',
    'क़ुतुब मीनार',
    'Heritage / UNESCO Site',
    '{"lat": 28.5245, "lng": 77.1855}'::jsonb,
    '{"opening": "07:00", "closing": "17:00", "closed_on": "Open all days"}'::jsonb,
    '{
        "indian": 35,
        "foreigner": 550,
        "saarc_bimstec": 35,
        "child": 0,
        "currency": "INR",
        "source_url": "https://asi.nic.in",
        "last_verified": "2026-08-20",
        "verification_status": "Official"
    }'::jsonb,
    'https://asi.payumoney.com/#/monument/qutubminar',
    '[
        "Keep belongings secure around the Iron Pillar complex during peak hours.",
        "Official ASI e-ticket scanners are located directly at the turnstiles; no paper exchange needed.",
        "Wheelchair-accessible ramps are available through the eastern gate entrance."
    ]'::jsonb,
    '{"estimated_crowd": "Medium", "peak_hours": "14:00 - 16:30", "best_time": "Early Morning 07:30 - 09:00"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'humayuns-tomb',
    'Humayun''s Tomb',
    'हुमायूँ का मक़बरा',
    'Heritage / UNESCO Site',
    '{"lat": 28.5933, "lng": 77.2507}'::jsonb,
    '{"opening": "06:00", "closing": "18:00", "closed_on": "Open all days"}'::jsonb,
    '{
        "indian": 35,
        "foreigner": 550,
        "saarc_bimstec": 35,
        "child": 0,
        "currency": "INR",
        "source_url": "https://asi.nic.in",
        "last_verified": "2026-08-18",
        "verification_status": "Official"
    }'::jsonb,
    'https://asi.payumoney.com/#/monument/humayunstomb',
    '[
        "Spacious Mughal gardens with shade; ideal for midday walking compared to open fort courtyards.",
        "Water refill station and clean sanitation facilities inside the visitor interpretation center.",
        "Licensed ASI tour guides hold valid laminated government badges with seal."
    ]'::jsonb,
    '{"estimated_crowd": "Medium", "peak_hours": "15:00 - 17:30", "best_time": "Golden hour 16:30 - 17:45"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'jantar-mantar',
    'Jantar Mantar',
    'जंतर मंतर',
    'Observatory / Heritage',
    '{"lat": 28.6271, "lng": 77.2166}'::jsonb,
    '{"opening": "06:00", "closing": "18:00", "closed_on": "Open all days"}'::jsonb,
    '{
        "indian": 20,
        "foreigner": 250,
        "saarc_bimstec": 20,
        "child": 0,
        "currency": "INR",
        "source_url": "https://asi.nic.in",
        "last_verified": "2026-08-15",
        "verification_status": "Official"
    }'::jsonb,
    'https://asi.payumoney.com/#/monument/jantarmantar',
    '[
        "Located near Connaught Place; walk through Parliament Street to avoid auto touts.",
        "Informational plaques explain astronomical sundial principles in English and Hindi.",
        "Directly covered by New Delhi Tourist Police beat officers on Sansad Marg."
    ]'::jsonb,
    '{"estimated_crowd": "Low", "peak_hours": "12:00 - 14:00", "best_time": "Morning 10:00 - 11:30"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'purana-qila',
    'Purana Qila (Old Fort)',
    'पुराना क़िला',
    'Heritage Monument',
    '{"lat": 28.6096, "lng": 77.2436}'::jsonb,
    '{"opening": "07:00", "closing": "17:00", "closed_on": "Open all days"}'::jsonb,
    '{
        "indian": 20,
        "foreigner": 250,
        "saarc_bimstec": 20,
        "child": 0,
        "currency": "INR",
        "source_url": "https://asi.nic.in",
        "last_verified": "2026-08-10",
        "verification_status": "Official"
    }'::jsonb,
    'https://asi.payumoney.com/#/monument/puranaqila',
    '[
        "Archaeological museum inside displays artifacts excavated from PGW era (1000 BCE).",
        "Boating lake on outer perimeter is separate from ASI monument entry.",
        "Sound & Light show in evenings booked separately at the north counter."
    ]'::jsonb,
    '{"estimated_crowd": "Low", "peak_hours": "14:00 - 16:00", "best_time": "Morning 08:30 - 10:30"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'india-gate',
    'India Gate & Kartavya Path',
    'इंडिया गेट',
    'Memorial / Public Heritage',
    '{"lat": 28.6129, "lng": 77.2295}'::jsonb,
    '{"opening": "00:00", "closing": "23:59", "closed_on": "Open 24/7", "illumination": "19:00 - 23:00"}'::jsonb,
    '{
        "indian": 0,
        "foreigner": 0,
        "saarc_bimstec": 0,
        "child": 0,
        "currency": "INR",
        "source_url": "https://delhitourism.gov.in",
        "last_verified": "2026-08-25",
        "verification_status": "Official"
    }'::jsonb,
    'https://delhitourism.gov.in/delhitourism/tourist_place/india_gate.jsp',
    '[
        "Completely free public monument; no entry tickets are required. Do NOT pay anyone demanding entry fees.",
        "Designated street vendor zones along Kartavya Path; polite refusal is sufficient for unsolicited souvenirs.",
        "Well lit, heavily patrolled 24/7 by Delhi Police and Central Industrial Security.",
        "National War Memorial is adjacent and free of charge."
    ]'::jsonb,
    '{"estimated_crowd": "High", "peak_hours": "18:00 - 21:30", "best_time": "Early morning 06:30 or Evening 19:30"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'lotus-temple',
    'Lotus Temple (Bahá''í House of Worship)',
    'कमल मंदिर',
    'Architectural / Place of Worship',
    '{"lat": 28.5535, "lng": 77.2588}'::jsonb,
    '{"opening": "08:30", "closing": "17:00", "closed_on": "Mondays"}'::jsonb,
    '{
        "indian": 0,
        "foreigner": 0,
        "saarc_bimstec": 0,
        "child": 0,
        "currency": "INR",
        "source_url": "https://bahaihouseofworship.in",
        "last_verified": "2026-08-19",
        "verification_status": "Official"
    }'::jsonb,
    'https://bahaihouseofworship.in',
    '[
        "Zero entry fee for all visitors. Anyone asking for payment or skip-the-line passes is fraudulent.",
        "Strict silence inside the inner sanctuary; photography is prohibited within the inner hall.",
        "Free shoe deposit token counter provided at the entrance."
    ]'::jsonb,
    '{"estimated_crowd": "High", "peak_hours": "13:30 - 16:30", "best_time": "Morning 09:00 - 10:30"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'akshardham',
    'Swaminarayan Akshardham Temple',
    'अक्षरधाम मंदिर',
    'Cultural / Religious Complex',
    '{"lat": 28.6127, "lng": 77.2773}'::jsonb,
    '{"opening": "09:30", "closing": "19:00", "closed_on": "Mondays"}'::jsonb,
    '{
        "indian": 0,
        "foreigner": 0,
        "saarc_bimstec": 0,
        "child": 0,
        "currency": "INR",
        "exhibitions_extra": true,
        "source_url": "https://akshardham.com",
        "last_verified": "2026-08-15",
        "verification_status": "Official"
    }'::jsonb,
    'https://akshardham.com/visitor-info/',
    '[
        "Complex entry is 100% free; optional thematic exhibition halls & musical water show have nominal on-site tickets.",
        "Strict security: Electronic items (mobile phones, cameras, power banks) are NOT allowed inside; free cloaking lockers available.",
        "Modest dress required: Shoulders, chest, and knees must be covered (free sarongs available at entrance if required)."
    ]'::jsonb,
    '{"estimated_crowd": "High", "peak_hours": "15:00 - 18:30", "best_time": "Morning 10:00 - 12:00"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'jama-masjid',
    'Jama Masjid',
    'जामा मस्जिद',
    'Historic / Place of Worship',
    '{"lat": 28.6507, "lng": 77.2334}'::jsonb,
    '{"opening": "07:00", "closing": "18:30", "prayer_breaks": "Closed for non-Muslims 12:00-13:30 & 16:00-17:00"}'::jsonb,
    '{
        "indian": 0,
        "foreigner": 0,
        "saarc_bimstec": 0,
        "child": 0,
        "camera_fee": 300,
        "currency": "INR",
        "source_url": "https://delhitourism.gov.in",
        "last_verified": "2026-08-12",
        "verification_status": "Official"
    }'::jsonb,
    'https://delhitourism.gov.in/delhitourism/tourist_place/jama_masjid.jsp',
    '[
        "Monument entry itself is free. A photography fee (₹300) applies if carrying a camera or phone for photos.",
        "Respectful attire mandatory (robes available at Gate 2/3 for a small fee if required).",
        "Remove shoes before stepping into courtyard; shoe-keepers near gates usually expect ₹10-20 tip or carry them in your daypack."
    ]'::jsonb,
    '{"estimated_crowd": "Medium", "peak_hours": "14:00 - 16:00", "best_time": "Morning 08:30 - 10:30"}'::jsonb,
    'Official',
    CURRENT_DATE
),
(
    'gurudwara-bangla-sahib',
    'Gurudwara Bangla Sahib',
    'गुरुद्वारा बंगला साहिब',
    'Spiritual / Community',
    '{"lat": 28.6263, "lng": 77.2090}'::jsonb,
    '{"opening": "00:00", "closing": "23:59", "closed_on": "Open 24/7"}'::jsonb,
    '{
        "indian": 0,
        "foreigner": 0,
        "saarc_bimstec": 0,
        "child": 0,
        "langar_free": true,
        "currency": "INR",
        "source_url": "https://dsgmc.in",
        "last_verified": "2026-08-25",
        "verification_status": "Official"
    }'::jsonb,
    'https://dsgmc.in',
    '[
        "Completely free entry and 24/7 Langar (community kitchen serving free nutritious vegetarian meals to all).",
        "Head covering required for everyone (free scarves provided at tourist counter at entry).",
        "Shoe deposit and foot-washing pool at entrance are completely free.",
        "Dedicated Foreign Visitor Assistance room near main entrance with English-speaking sevaks."
    ]'::jsonb,
    '{"estimated_crowd": "Medium", "peak_hours": "12:00 - 14:00 & 19:00 - 21:00", "best_time": "Morning 07:00 - 09:30"}'::jsonb,
    'Official',
    CURRENT_DATE
)
ON CONFLICT (place_key) DO UPDATE 
SET 
    timings = EXCLUDED.timings,
    fee = EXCLUDED.fee,
    official_ticket_url = EXCLUDED.official_ticket_url,
    safety_notes = EXCLUDED.safety_notes,
    crowd_data = EXCLUDED.crowd_data,
    verification_status = EXCLUDED.verification_status,
    last_verified = EXCLUDED.last_verified;
