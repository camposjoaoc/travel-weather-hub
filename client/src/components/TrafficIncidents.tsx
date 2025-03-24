import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Traffic.css"

interface TrafficIncidentComponentProps {
  city: string;
}
interface TrafficIncident {
  description: string;
  severity: string;
  location: string;
  timestamp: string;
}

const TrafficIncidentComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trafficIncidents, setTrafficIncidents] = useState<TrafficIncident[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrafficData = async () => {
    if (!searchQuery) {
      setError('Please enter a city, address, or country.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch coordinates from OpenWeatherMap API
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=2eae3e4efd68112d3a7dc08749d5747d`
      );

      if (!geoResponse.data.coord) {
        setError('Location not found.');
        setLoading(false);
        return;
      }

      const { longitude,latitude } = geoResponse.data.coord;

      // Fetch traffic incidents using the coordinates from the server
      const response = await axios.get(
        `http://localhost:8001/api/traffic-incidents?lat=${latitude}&lng=${longitude}`
      );

      const incidents: TrafficIncident[] = response.data.Situations || [];

      setTrafficIncidents(incidents);
    } catch (err) {
      console.error('Error fetching traffic:', err);
      setError('Failed to fetch traffic incidents.');
    } finally {
      setLoading(false);
    }
  };
  

  // Function to get color based on severity
  const getSeverityColor = (severity: string): string => {
    if (severity === 'High') {
      return 'red';
    }
    if (severity === 'Medium') {
      return 'green';
    }
    return 'black'; // Default color
  };

  return (
    <div style={styles.container}>
      <h1>Traffic Updates</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter city, address, or country"
        style={styles.input}
      />
      <button onClick={fetchTrafficData} style={styles.button}>
        {loading ? 'Loading...' : 'Fetch Traffic Data'}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.incidentList}>
        {loading ? (
          <p>Loading incidents...</p>
        ) : trafficIncidents.length > 0 ? (
          trafficIncidents.map((incident, index) => (
            <div
              key={index}
              style={{
                ...styles.incidentItem,
                backgroundColor:
                  index % 2 === 0
                    ? '#f0f8ff'
                    : index % 3 === 0
                    ? '#ffeb3b' // Yellow color for every third incident
                    : '#e0f7fa', // Default color
              }}
            >
              <h3>{incident.description}</h3>
              <p>
                <strong style={styles.boldText}>Severity: </strong>
                <span style={{ fontWeight: 'bold', color: getSeverityColor(incident.severity) }}>
                  {incident.severity}
                </span>
              </p>
              <p>
                <strong style={styles.boldText}>Location:</strong> {incident.location}
              </p>
              <p>
                <strong style={styles.boldText}>End Time:</strong> {incident.timestamp}
              </p>
            </div>
          ))
        ) : (
          <p>No traffic incidents found for this location.</p>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { textAlign: 'center', padding: '20px', maxWidth: '800px', margin: '0 auto' },
  input: { padding: '10px', fontSize: '16px', marginRight: '10px', width: '300px' },
  button: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' },
  error: { color: 'red', marginTop: '10px' },
  incidentList: {
    marginTop: '20px',
    height: '400px', /* Set a fixed height for scrolling */
    overflowY: 'auto', /* Enable vertical scrolling */
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor:'white',
    display: 'flex',
    flexDirection: 'column', /* Stack incidents vertically */
  },
  incidentItem: {
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column', /* Arrange content vertically */
    textAlign: 'left',
    
    
  },
  boldText: {
    fontWeight: 'bold',
    color: 'green', // Green color for all bold text
  },
};

export default TrafficIncidentComponent;
