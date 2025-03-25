import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Traffic.css";

interface TrafficIncident {
  description: string;
  severity: string;
  location: string;
  timestamp: string;
}

type TrafficIncidentsProps = {
  latitude: string;
  longitude: string;
};

const TrafficIncidentComponent = ({
  latitude,
  longitude,
}: TrafficIncidentsProps) => {
  const [trafficIncidents, setTrafficIncidents] = useState<TrafficIncident[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;
    setLoading(true);
    setError(null);
    axios
      .get(
        `http://localhost:8000/traffic-incidents?lat=${latitude}&lng=${longitude}`
      )
      .then((res) => {
        debugger;
        const deviations = res.data.RESPONSE.RESULT[0].Situation.map(
          (situation) => situation.Deviation
        );
        const trimmedDeviationInfo = deviations.map((deviation) => ({
          iconId: deviation[0].IconId,
          severityCode: deviation[0].SeverityCode,
          severityText: deviation[0].SeverityText,
          location: deviation[0].LocationDescriptor,
          timestamp: deviation[0].CreationTime,
        }));
        setTrafficIncidents(trimmedDeviationInfo);
      })
      .catch(() =>
        setError("Oops! Something went wrong while loading the data")
      )
      .finally(() => setLoading(false));
  }, [latitude, longitude]);

  // Function to get color based on severity
  const getSeverityColor = (severityCode: number): string => {
    if (severityCode === 5) {
      return "red";
    } else if (severityCode === 4) {
      return "orange";
    } else if (severityCode === 2) {
      return "green";
    }
    return "black"; // Default color
  };

  return (
    <div style={styles.container}>
      <h1>Traffic Updates</h1>
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
                    ? "#f0f8ff"
                    : index % 3 === 0
                    ? "#ffeb3b" // Yellow color for every third incident
                    : "#e0f7fa", // Default color
              }}
            >
              <h3>{incident.description}</h3>
              <p>
                <strong style={styles.boldText}>Severity: </strong>
                <span
                  style={{
                    fontWeight: "bold",
                    color: getSeverityColor(incident.severityCode),
                  }}
                >
                  {incident.severityText}
                </span>
              </p>
              <p>
                <strong style={styles.boldText}>Location:</strong>{" "}
                {incident.location}
              </p>
              <p>
                <strong style={styles.boldText}>End Time:</strong>{" "}
                {incident.timestamp}
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
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginRight: "10px",
    width: "300px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  error: { color: "red", marginTop: "10px" },
  incidentList: {
    marginTop: "20px",
    height: "400px" /* Set a fixed height for scrolling */,
    overflowY: "auto" /* Enable vertical scrolling */,
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "aqua",
    display: "flex",
    flexDirection: "column" /* Stack incidents vertically */,
  },
  incidentItem: {
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column" /* Arrange content vertically */,
    textAlign: "left",
  },
  boldText: {
    fontWeight: "bold",
    color: "green", // Green color for all bold text
  },
};

export default TrafficIncidentComponent;
