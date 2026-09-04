import React, { createContext, useContext, useState, useEffect } from 'react';

const TravelerContext = createContext(null);

export const TravelerProvider = ({ children }) => {
  const [traveler, setTraveler] = useState(() => {
    const saved = localStorage.getItem('tm_traveler');
    return saved ? JSON.parse(saved) : {
      name: 'Sarah Jenkins',
      nationality: 'United Kingdom',
      preferred_language: 'en',
      emergency_contact: '+44 7700 900077'
    };
  });

  const [journey, setJourney] = useState(() => {
    const saved = localStorage.getItem('tm_journey');
    return saved ? JSON.parse(saved) : {
      journey_code: 'TM-DEL-2026-X89K',
      status: 'active',
      current_lat: 28.6139,
      current_lng: 77.2090,
      expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString()
    };
  });

  const [emergencyAlertActive, setEmergencyAlertActive] = useState(false);

  useEffect(() => {
    if (traveler) localStorage.setItem('tm_traveler', JSON.stringify(traveler));
  }, [traveler]);

  useEffect(() => {
    if (journey) localStorage.setItem('tm_journey', JSON.stringify(journey));
  }, [journey]);

  const updateProfile = (profileData, journeyData) => {
    setTraveler(profileData);
    if (journeyData) setJourney(journeyData);
  };

  const clearSession = () => {
    localStorage.removeItem('tm_traveler');
    localStorage.removeItem('tm_journey');
    setTraveler(null);
    setJourney(null);
  };

  const concludeJourney = () => {
    if (journey) {
      const expiredJourney = { ...journey, status: 'expired', concluded_at: new Date().toISOString() };
      setJourney(expiredJourney);
      localStorage.setItem('tm_journey', JSON.stringify(expiredJourney));
    }
    if (traveler) {
      const purgedTraveler = { ...traveler, name: '[PURGED - TRAVELER CONCLUDED]', emergency_contact: '[PURGED]' };
      setTraveler(purgedTraveler);
      localStorage.setItem('tm_traveler', JSON.stringify(purgedTraveler));
    }
  };

  return (
    <TravelerContext.Provider value={{
      traveler,
      journey,
      updateProfile,
      clearSession,
      concludeJourney,
      emergencyAlertActive,
      setEmergencyAlertActive
    }}>
      {children}
    </TravelerContext.Provider>
  );
};

export const useTraveler = () => {
  const context = useContext(TravelerContext);
  if (!context) throw new Error('useTraveler must be used within a TravelerProvider');
  return context;
};
