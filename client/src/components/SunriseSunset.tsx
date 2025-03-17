import React, { useState, useEffect } from "react";
import axios from "axios";

const SunriseSunset: React.FC = () => {
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);
    const [sunData, setSunData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCoordinates = () => {
        const lat = localStorage.getItem("latitude");
        const lng = localStorage.getItem("longitude");

        if (lat && lng) {
            setLatitude(lat);
            setLongitude(lng);
        }
    };

    useEffect(() => {
        fetchCoordinates();
        const interval = setInterval(() => {
            if (!latitude || !longitude) {
                fetchCoordinates();
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchSunData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/sunrise-sunset?lat=${latitude}&lng=${longitude}`
                );
                setSunData(response.data.results);
            } catch (error) {
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        };

        fetchSunData();
    }, [latitude, longitude]);

    return (
        <div className="container mt-4">
            <h3 className="text-center small">Sunrise & Sunset Times</h3>
            {error && <p className="text-danger text-center small">{error}</p>}

            {!latitude || !longitude ? (
                <p className="text-center small">Waiting for city...</p>
            ) : sunData ? (
                <div className="table-responsive mt-3">
                    <table className="table table-sm table-bordered text-center">
                        <tbody>
                            <tr>
                                <td><strong>🌅 Sunrise</strong></td>
                                <td>{sunData.sunrise}</td>
                            </tr>
                            <tr>
                                <td><strong>🌇 Sunset</strong></td>
                                <td>{sunData.sunset}</td>
                            </tr>
                            <tr>
                                <td><strong>☀️ Solar Noon</strong></td>
                                <td>{sunData.solar_noon}</td>
                            </tr>
                            <tr>
                                <td><strong>⏳ Day Length</strong></td>
                                <td>{sunData.day_length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-muted small">Waiting for data...</p>
            )}
        </div>
    );
};

export default SunriseSunset;