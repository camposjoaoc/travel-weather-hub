import { create } from 'zustand';  // Change to named import

// Define the interface for your store state
interface StoreState {
  coordinates: { lat: number; lon: number };
  setCoordinates: (lat: number, lon: number) => void;
  trafficIncidents: TrafficIncident[];
  setTrafficIncidents: (incidents: TrafficIncident[]) => void;
}

// Define TrafficIncident type
interface TrafficIncident {
  description: string;
  severity: string;
  location: string;
  timestamp: string;
}

// Create the store with typed set function
const useStore = create<StoreState>((set) => ({
  coordinates: { lat: 0, lon: 0 },
  setCoordinates: (lat: number, lon: number): void =>
    set(() => ({ coordinates: { lat, lon } })),  // No need to reference 'state'
  trafficIncidents: [],
  setTrafficIncidents: (incidents: TrafficIncident[]): void =>
    set(() => ({ trafficIncidents: incidents })),  // No need to reference 'state'
}));

export default useStore;
