"""
RAG Engine for TravelMate AI Service
Strictly grounds all answers in the 10 verified Delhi places, official helplines, and embassies.
Enforces the core design principle: Never invents facts. Always stamps confidence and source label.
"""

from typing import Dict, Any, Optional

VERIFIED_PLACES_KB = {
    "red-fort": {
        "name": "Red Fort (Lal Qila)",
        "hindi_name": "लाल किला",
        "category": "Heritage / UNESCO Site",
        "fee": {"indian": "₹35", "foreigner": "₹550", "saarc_bimstec": "₹35", "child": "Free under 15"},
        "timings": "09:30 - 16:30 (Closed on Mondays). Light & Sound show 18:00 - 21:00.",
        "ticket_source": "Official ASI Portal (asi.payumoney.com)",
        "official_source": "ASI (Archaeological Survey of India)",
        "safety_notes": "Beware of touts claiming the monument is closed. Purchase tickets only at official ASI kiosks or online portal."
    },
    "qutub-minar": {
        "name": "Qutub Minar",
        "hindi_name": "क़ुतुब मीनार",
        "category": "Heritage / UNESCO Site",
        "fee": {"indian": "₹35", "foreigner": "₹550", "saarc_bimstec": "₹35", "child": "Free under 15"},
        "timings": "07:00 - 17:00 (Open all days).",
        "ticket_source": "Official ASI Portal (asi.payumoney.com)",
        "official_source": "ASI (Archaeological Survey of India)",
        "safety_notes": "Keep valuables close around Iron Pillar courtyard. Use official e-ticket turnstiles directly."
    },
    "humayuns-tomb": {
        "name": "Humayun's Tomb",
        "hindi_name": "हुमायूँ का मक़बरा",
        "category": "Heritage / UNESCO Site",
        "fee": {"indian": "₹35", "foreigner": "₹550", "saarc_bimstec": "₹35", "child": "Free under 15"},
        "timings": "06:00 - 18:00 (Open all days).",
        "ticket_source": "Official ASI Portal (asi.payumoney.com)",
        "official_source": "ASI (Archaeological Survey of India)",
        "safety_notes": "Licensed tour guides carry laminated ASI photo ID cards. Clean drinking water available at interpretation center."
    },
    "jantar-mantar": {
        "name": "Jantar Mantar",
        "hindi_name": "जंतर मंतर",
        "category": "Observatory / Heritage",
        "fee": {"indian": "₹20", "foreigner": "₹250", "saarc_bimstec": "₹20", "child": "Free under 15"},
        "timings": "06:00 - 18:00 (Open all days).",
        "ticket_source": "Official ASI Portal",
        "official_source": "ASI (Archaeological Survey of India)",
        "safety_notes": "Located on Sansad Marg near Connaught Place; walk directly to avoid street touts."
    },
    "purana-qila": {
        "name": "Purana Qila (Old Fort)",
        "hindi_name": "पुराना क़िला",
        "category": "Heritage Monument",
        "fee": {"indian": "₹20", "foreigner": "₹250", "saarc_bimstec": "₹20", "child": "Free under 15"},
        "timings": "07:00 - 17:00 (Open all days).",
        "ticket_source": "Official ASI Portal",
        "official_source": "ASI (Archaeological Survey of India)",
        "safety_notes": "Archaeological museum is inside. Outer lake boating is managed separately."
    },
    "india-gate": {
        "name": "India Gate & Kartavya Path",
        "hindi_name": "इंडिया गेट",
        "category": "Memorial / Public Heritage",
        "fee": {"indian": "₹0 (Free)", "foreigner": "₹0 (Free)", "saarc_bimstec": "₹0 (Free)", "child": "Free"},
        "timings": "Open 24/7 (Illuminated 19:00 - 23:00).",
        "ticket_source": "No ticket required - Public War Memorial",
        "official_source": "Delhi Tourism / Central Public Works",
        "safety_notes": "Entry is completely free. Anyone asking for an entry fee is fraudulent."
    },
    "lotus-temple": {
        "name": "Lotus Temple (Bahá'í House of Worship)",
        "hindi_name": "कमल मंदिर",
        "category": "Architectural / Place of Worship",
        "fee": {"indian": "₹0 (Free)", "foreigner": "₹0 (Free)", "saarc_bimstec": "₹0 (Free)", "child": "Free"},
        "timings": "08:30 - 17:00 (Closed on Mondays).",
        "ticket_source": "No ticket required (bahaihouseofworship.in)",
        "official_source": "National Spiritual Assembly of Bahá'ís of India",
        "safety_notes": "Free admission for everyone. Silence inside prayer hall. Free shoe deposit counter."
    },
    "akshardham": {
        "name": "Swaminarayan Akshardham Temple",
        "hindi_name": "अक्षरधाम मंदिर",
        "category": "Cultural / Religious Complex",
        "fee": {"indian": "₹0 (Free entry)", "foreigner": "₹0 (Free entry)", "saarc_bimstec": "₹0", "child": "Free"},
        "timings": "09:30 - 19:00 (Closed on Mondays).",
        "ticket_source": "Complex entry free; exhibitions ticketed on-site only",
        "official_source": "BAPS Swaminarayan Sanstha",
        "safety_notes": "Mobile phones, cameras, power banks NOT allowed inside. Free cloakrooms available."
    },
    "jama-masjid": {
        "name": "Jama Masjid",
        "hindi_name": "जामा मस्जिद",
        "category": "Historic / Place of Worship",
        "fee": {"indian": "₹0 (Free entry)", "foreigner": "₹0 (Free entry)", "camera_fee": "₹300", "child": "Free"},
        "timings": "07:00 - 18:30 (Closed for non-Muslims during prayer times 12:00-13:30 & 16:00-17:00).",
        "ticket_source": "Entry is free; camera fee ticketed at gate",
        "official_source": "Delhi Waqf Board / Delhi Tourism",
        "safety_notes": "Modest clothing required. Remove shoes before stepping onto courtyard."
    },
    "gurudwara-bangla-sahib": {
        "name": "Gurudwara Bangla Sahib",
        "hindi_name": "गुरुद्वारा बंगला साहिब",
        "category": "Spiritual / Community",
        "fee": {"indian": "₹0 (Free)", "foreigner": "₹0 (Free)", "langar": "Free community meal 24/7", "child": "Free"},
        "timings": "Open 24 hours / 7 days.",
        "ticket_source": "Completely free open sanctuary",
        "official_source": "Delhi Sikh Gurdwara Management Committee (DSGMC)",
        "safety_notes": "Head covering required (free scarves provided). Foreign visitor assistance room near entrance."
    }
}

OFFICIAL_CONTACTS = {
    "police_emergency": {"number": "112", "service": "National Emergency Response Support System (ERSS)"},
    "tourist_helpline": {"number": "1363", "toll_free": "1800-11-1363", "service": "Ministry of Tourism 24x7 Multi-lingual Helpdesk"},
    "tourist_police": {"number": "+91 11 2336 5359", "service": "Delhi Police Tourist Police Unit (Paharganj / CP)"}
}

def find_place_context(query: str) -> Optional[Dict[str, Any]]:
    q = query.lower()
    for key, data in VERIFIED_PLACES_KB.items():
        if key in q or data["name"].lower() in q or data["hindi_name"] in q:
            return data
    # Check partials
    if "red fort" in q or "lal qila" in q: return VERIFIED_PLACES_KB["red-fort"]
    if "qutub" in q or "qutab" in q: return VERIFIED_PLACES_KB["qutub-minar"]
    if "humayun" in q: return VERIFIED_PLACES_KB["humayuns-tomb"]
    if "jantar" in q: return VERIFIED_PLACES_KB["jantar-mantar"]
    if "purana" in q: return VERIFIED_PLACES_KB["purana-qila"]
    if "india gate" in q: return VERIFIED_PLACES_KB["india-gate"]
    if "lotus" in q or "bahai" in q: return VERIFIED_PLACES_KB["lotus-temple"]
    if "akshardham" in q: return VERIFIED_PLACES_KB["akshardham"]
    if "jama masjid" in q: return VERIFIED_PLACES_KB["jama-masjid"]
    if "bangla sahib" in q or "gurudwara" in q: return VERIFIED_PLACES_KB["gurudwara-bangla-sahib"]
    return None
