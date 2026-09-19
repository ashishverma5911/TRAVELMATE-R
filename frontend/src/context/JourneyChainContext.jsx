import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTraveler } from './TravelerContext';

const JourneyChainContext = createContext(null);

const DEFAULT_DEMO_TIMELINE = [
  {
    id: 'evt-1',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    type: 'created',
    stage: 'PREPARE',
    module: 'SafePass & Chain ID',
    title: 'Smart Journey Chain Created',
    description: 'Generated cryptographic Journey ID TM-DEL-2026-X89K linked to tourist profile with 7-day emergency pass.',
    actionPath: '/my-journey',
    actionLabel: 'View SafePass',
    status: 'Verified',
    badgeColor: 'emerald'
  },
  {
    id: 'evt-2',
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    type: 'destination',
    stage: 'DISCOVER',
    module: 'Discover Places',
    title: 'Destinations Selected for Itinerary',
    description: 'Added Red Fort (Lal Qila), Qutub Minar, and Humayun\'s Tomb to planned heritage route.',
    actionPath: '/discover',
    actionLabel: 'Explore Monuments',
    status: 'Saved',
    badgeColor: 'cyan'
  },
  {
    id: 'evt-3',
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    type: 'planner',
    stage: 'PREPARE',
    module: 'Trip Planner',
    title: 'Custom 1-Day Heritage Itinerary Synced',
    description: 'Optimized metro route starting from New Delhi Railway Station (NDLS) to Chandni Chowk & Red Fort.',
    actionPath: '/planner',
    actionLabel: 'Open Route Plan',
    status: 'Optimized',
    badgeColor: 'indigo'
  },
  {
    id: 'evt-4',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    type: 'fare',
    stage: 'PREPARE',
    module: 'Fair Fare Meter',
    title: 'Auto-Rickshaw Fare Calculated',
    description: 'Official tariff verified: ₹123.50 for 10 km journey (Base ₹30 for 1.5 km + ₹11/km) from Connaught Place to Red Fort.',
    actionPath: '/fare-meter',
    actionLabel: 'Check Fare Meter',
    status: 'Tariff Verified',
    badgeColor: 'amber'
  },
  {
    id: 'evt-5',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    type: 'evidence',
    stage: 'TRAVEL',
    module: 'Evidence Vault',
    title: 'Vehicle Plate Logged in Evidence Vault',
    description: 'Auto-rickshaw license plate DL 1R B 4429 recorded with GPS timestamp for transit accountability.',
    actionPath: '/vault',
    actionLabel: 'View Evidence Record',
    status: 'Secured on Device',
    badgeColor: 'teal'
  },
  {
    id: 'evt-6',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    type: 'translate',
    stage: 'TRAVEL',
    module: 'Bhashini Translator',
    title: 'Voice Translation Used with Driver',
    description: 'Translated "Please take me to Red Fort ASI ticket counter and run the meter" from English to Hindi.',
    actionPath: '/bhashini-translator',
    actionLabel: 'Open Translator',
    status: 'Voice Played',
    badgeColor: 'blue'
  },
  {
    id: 'evt-7',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    type: 'navigation',
    stage: 'TRAVEL',
    module: 'Safe Journey',
    title: 'Safe Transit Tracking Active',
    description: 'Real-time GPS route monitoring enabled. Vehicle on expected route along Netaji Subhash Marg.',
    actionPath: '/safe-journey',
    actionLabel: 'Live Transit Monitor',
    status: 'Live & On Route',
    badgeColor: 'emerald'
  }
];

const INITIAL_JOURNEYS = [
  {
    id: 'TM-DEL-2026-X89K',
    title: 'Delhi Heritage & Capital Discovery',
    destination: 'Delhi, National Capital Region, India',
    origin: 'New Delhi Railway Station (NDLS)',
    currentLocation: 'Connaught Place & Old Delhi Corridor',
    startDate: '2026-09-18',
    endDate: '2026-09-25',
    status: 'active',
    stage: 'TRAVEL',
    safetyStatus: 'Live Tracking Active • Route Verified',
    safetyScore: 98,
    timeline: DEFAULT_DEMO_TIMELINE,
    records: {
      fareChecks: [
        { id: 'f-1', from: 'Connaught Place', to: 'Red Fort', distance: 10, fare: 123.50, mode: 'Auto-Rickshaw', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() }
      ],
      evidenceList: [
        { id: 'ev-1', plateNumber: 'DL 1R B 4429', vehicleType: 'Auto-Rickshaw', location: 'Connaught Place Circle', timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString() }
      ],
      visitedPlaces: [
        { id: 'vp-1', name: 'India Gate', category: 'Monument', visitedAt: '2026-09-18' }
      ],
      translations: [
        { id: 'tr-1', fromText: 'Please turn on the meter', toText: 'कृपया मीटर चालू करें', lang: 'hi', timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString() }
      ],
      reports: []
    }
  },
  {
    id: 'TM-AGR-2026-4N2P',
    title: 'Agra Golden Triangle Extension',
    destination: 'Agra, Uttar Pradesh, India',
    origin: 'Delhi Hazrat Nizamuddin (NZM)',
    currentLocation: 'Taj Mahal East Gate',
    startDate: '2026-09-26',
    endDate: '2026-09-28',
    status: 'planned',
    stage: 'PREPARE',
    safetyStatus: 'Planned Journey • SafePass Issued',
    safetyScore: 100,
    timeline: [
      {
        id: 'evt-agr-1',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        type: 'created',
        stage: 'PREPARE',
        module: 'SafePass',
        title: 'Upcoming Journey Registered',
        description: 'Gatimaan Express schedule and Taj Mahal sunrise slot reserved with ASI foreign pass.',
        actionPath: '/my-journey',
        actionLabel: 'View Trip',
        status: 'Scheduled',
        badgeColor: 'indigo'
      }
    ],
    records: {
      fareChecks: [],
      evidenceList: [],
      visitedPlaces: [],
      translations: [],
      reports: []
    }
  }
];

export const JourneyChainProvider = ({ children }) => {
  const { journey } = useTraveler();

  const [journeys, setJourneys] = useState(() => {
    try {
      const saved = localStorage.getItem('tm_all_journeys');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load journeys from localStorage:', e);
    }
    return INITIAL_JOURNEYS;
  });

  const [activeJourneyId, setActiveJourneyId] = useState(() => {
    return journey?.journey_code || 'TM-DEL-2026-X89K';
  });

  // Sync if TravelerContext changes journey
  useEffect(() => {
    if (journey?.journey_code && journey.journey_code !== activeJourneyId) {
      // Check if exists
      const found = journeys.find(j => j.id === journey.journey_code);
      if (!found) {
        const newJ = {
          id: journey.journey_code,
          title: 'Custom Delhi Journey',
          destination: 'Delhi, India',
          origin: 'New Delhi Railway Station (NDLS)',
          currentLocation: 'Central Delhi',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
          status: 'active',
          stage: 'TRAVEL',
          safetyStatus: 'Secure • Monitored',
          safetyScore: 100,
          timeline: DEFAULT_DEMO_TIMELINE,
          records: {
            fareChecks: [],
            evidenceList: [],
            visitedPlaces: [],
            translations: [],
            reports: []
          }
        };
        setJourneys(prev => [newJ, ...prev]);
      }
      setActiveJourneyId(journey.journey_code);
    }
  }, [journey]);

  // Persist journeys to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tm_all_journeys', JSON.stringify(journeys));
    } catch (e) {
      console.warn('Failed to save journeys:', e);
    }
  }, [journeys]);

  const activeJourney = journeys.find(j => j.id === activeJourneyId) || journeys[0];

  const switchJourney = (id) => {
    if (journeys.some(j => j.id === id)) {
      setActiveJourneyId(id);
    }
  };

  const createNewJourney = ({ title, destination, origin, startDate, endDate }) => {
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const prefix = destination.toLowerCase().includes('delhi') ? 'TM-DEL-2026' : 'TM-IND-2026';
    const newId = `${prefix}-${randomCode}`;

    const newJourney = {
      id: newId,
      title: title || 'New Exploratory Trip',
      destination: destination || 'Delhi, India',
      origin: origin || 'Indira Gandhi International Airport (DEL)',
      currentLocation: origin || 'Transit Hub',
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: 'active',
      stage: 'DISCOVER',
      safetyStatus: 'New Journey • SafePass Issued',
      safetyScore: 100,
      timeline: [
        {
          id: `evt-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'created',
          stage: 'DISCOVER',
          module: 'SafePass',
          title: 'Smart Journey Chain Registered',
          description: `Initialized new trip to ${destination}. SafePass reference generated.`,
          actionPath: '/my-journey',
          actionLabel: 'View Journey',
          status: 'Active',
          badgeColor: 'emerald'
        }
      ],
      records: {
        fareChecks: [],
        evidenceList: [],
        visitedPlaces: [],
        translations: [],
        reports: []
      }
    };

    setJourneys(prev => [newJourney, ...prev]);
    setActiveJourneyId(newId);
    return newJourney;
  };

  const addTimelineEvent = (eventData) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === activeJourneyId) {
        const newEvent = {
          id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          timestamp: new Date().toISOString(),
          status: 'Recorded',
          badgeColor: 'emerald',
          ...eventData
        };
        return {
          ...j,
          timeline: [newEvent, ...j.timeline]
        };
      }
      return j;
    }));
  };

  const recordFareCheck = (fareData) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === activeJourneyId) {
        const fareItem = {
          id: `fare-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...fareData
        };
        const updatedRecords = {
          ...j.records,
          fareChecks: [fareItem, ...(j.records?.fareChecks || [])]
        };
        const newTimelineEvent = {
          id: `evt-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'fare',
          stage: 'PREPARE',
          module: 'Fair Fare Meter',
          title: `Fare Verified: ₹${fareData.fare || fareData.estimatedFare} (${fareData.mode || 'Auto'})`,
          description: `Route: ${fareData.from} ➔ ${fareData.to} (${fareData.distance} km). Official Delhi tariff confirmed.`,
          actionPath: '/fare-meter',
          actionLabel: 'Check Fare',
          status: 'Tariff Checked',
          badgeColor: 'amber'
        };
        return {
          ...j,
          records: updatedRecords,
          timeline: [newTimelineEvent, ...j.timeline]
        };
      }
      return j;
    }));
  };

  const recordEvidence = (evidenceData) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === activeJourneyId) {
        const item = {
          id: `ev-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...evidenceData
        };
        const updatedRecords = {
          ...j.records,
          evidenceList: [item, ...(j.records?.evidenceList || [])]
        };
        const newTimelineEvent = {
          id: `evt-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'evidence',
          stage: 'TRAVEL',
          module: 'Evidence Vault',
          title: `Vehicle Plate Recorded: ${evidenceData.plateNumber}`,
          description: `${evidenceData.vehicleType || 'Vehicle'} logged with cryptographic timestamp at ${evidenceData.location || 'Current Location'}.`,
          actionPath: '/vault',
          actionLabel: 'Open Vault',
          status: 'Secured on Device',
          badgeColor: 'teal'
        };
        return {
          ...j,
          records: updatedRecords,
          timeline: [newTimelineEvent, ...j.timeline]
        };
      }
      return j;
    }));
  };

  const recordVisitedPlace = (placeData) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === activeJourneyId) {
        const item = {
          id: `vp-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...placeData
        };
        const updatedRecords = {
          ...j.records,
          visitedPlaces: [item, ...(j.records?.visitedPlaces || [])]
        };
        const newTimelineEvent = {
          id: `evt-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'destination',
          stage: 'DISCOVER',
          module: 'Discover Places',
          title: `Checked In: ${placeData.name}`,
          description: `Monument visit verified with ASI QR pass. Location: ${placeData.location || 'Delhi'}.`,
          actionPath: `/discover?place=${placeData.slug || ''}`,
          actionLabel: 'Place Details',
          status: 'Visited',
          badgeColor: 'cyan'
        };
        return {
          ...j,
          records: updatedRecords,
          timeline: [newTimelineEvent, ...j.timeline]
        };
      }
      return j;
    }));
  };

  const recordTranslation = (transData) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === activeJourneyId) {
        const item = {
          id: `tr-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...transData
        };
        const updatedRecords = {
          ...j.records,
          translations: [item, ...(j.records?.translations || [])]
        };
        return {
          ...j,
          records: updatedRecords
        };
      }
      return j;
    }));
  };

  const recordReport = (reportData) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === activeJourneyId) {
        const item = {
          id: `rep-${Date.now()}`,
          timestamp: new Date().toISOString(),
          status: 'Under Review by Tourist Police',
          ...reportData
        };
        const updatedRecords = {
          ...j.records,
          reports: [item, ...(j.records?.reports || [])]
        };
        const newTimelineEvent = {
          id: `evt-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'incident',
          stage: 'RESOLVE',
          module: 'Incident Resolution',
          title: `Incident Report Lodged: ${reportData.category || 'Travel Issue'}`,
          description: `Case reference #${item.id.slice(-6).toUpperCase()} registered with Delhi Tourist Police. Status: Under Review.`,
          actionPath: '/user-portal',
          actionLabel: 'Track in User Portal',
          status: 'Filed with Police',
          badgeColor: 'crimson'
        };
        return {
          ...j,
          records: updatedRecords,
          timeline: [newTimelineEvent, ...j.timeline]
        };
      }
      return j;
    }));
  };

  const updateJourneyStage = (newStage) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === activeJourneyId) {
        return { ...j, stage: newStage };
      }
      return j;
    }));
  };

  return (
    <JourneyChainContext.Provider value={{
      activeJourney,
      activeJourneyId,
      allJourneys: journeys,
      switchJourney,
      createNewJourney,
      addTimelineEvent,
      recordFareCheck,
      recordEvidence,
      recordVisitedPlace,
      recordTranslation,
      recordReport,
      updateJourneyStage
    }}>
      {children}
    </JourneyChainContext.Provider>
  );
};

export const useJourneyChain = () => {
  const context = useContext(JourneyChainContext);
  if (!context) {
    throw new Error('useJourneyChain must be used within a JourneyChainProvider');
  }
  return context;
};
