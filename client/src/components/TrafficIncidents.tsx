import React, { useEffect, useState } from "react";
import axios from "axios";

interface TrafficIncident {
  description: string;
  severity: string;
  location: string;
  timestamp: string;
}

interface TrafficIncidentsProps {
  city: string;
}

const TrafficIncidents: React.FC<TrafficIncidentsProps> = ({ city }) => {
  const [trafficIncidents, setTrafficIncidents] = useState<TrafficIncident[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrafficData = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);

      try {
        // Step 1: Get coordinates of the city
        const geocodeResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2eae3e4efd68112d3a7dc08749d5747d`
        );

        if (!geocodeResponse.data.coord) {
          setError("City not found. Please check the city name.");
          setLoading(false);
          return;
        }

        const { lat, lon } = geocodeResponse.data.coord;

        // Step 2: Fetch traffic data using your backend
        const response = await axios.get(
          `http://localhost:8000/api/traffic-incidents?lat=${lat}&lng=${lon}`
        );

        const incidents: TrafficIncident[] = response.data.Situations || [];
        setTrafficIncidents(incidents);
      } catch (err) {
        setError("Failed to fetch traffic incidents. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrafficData();
  }, [city]);

  return (
    <div className="mt-4">
      <h3 className="text-center">Traffic Updates</h3>
      {loading && <p className="text-center">Loading traffic data...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && trafficIncidents.length > 0 ? (
        trafficIncidents.map((incident, index) => (
          <div
            key={index}
            className="p-3 mb-3 bg-light rounded shadow-sm border"
          >
            <h5>{incident.description}</h5>
            <p><strong>Severity:</strong> {incident.severity}</p>
            <p><strong>Location:</strong> {incident.location}</p>
            <p><strong>Timestamp:</strong> {incident.timestamp}</p>
          </div>
        ))
      ) : !loading ? (
        <p className="text-center">No traffic incidents found.</p>
      ) : null}
    </div>
  );
};

export default TrafficIncidents;
