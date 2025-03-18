import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { WeatherForecastData, WeatherForecastProps } from "../types/WeatherForecastData";

const WeatherForecast: React.FC<WeatherForecastProps> = ({ city }) => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showForecast, setShowForecast] = useState<boolean>(false);

    const formatDateToWeekday = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { weekday: "long" });
    };

    useEffect(() => {
        if (city) {
            setSelectedCity(city);
        }
    }, [city]);

    useEffect(() => {
        if (!selectedCity) return;

        setLoading(true);
        setError(null);
        setShowForecast(false);

        axios.get(`http://localhost:8000/forecast?city=${selectedCity}`)
            .then((response) => {
                const forecasts = response.data.list;
                const uniqueDays = new Set<string>();
                const filteredForecast: typeof forecasts = [];

                for (const entry of forecasts) {
                    const day = entry.dt_txt.split(" ")[0];

                    if (!uniqueDays.has(day)) {
                        uniqueDays.add(day);
                        filteredForecast.push(entry);
                    }

                    if (uniqueDays.size === 5) break;
                }

                setForecast({ ...response.data, list: filteredForecast });
                setShowForecast(true);

                localStorage.setItem("latitude", response.data.city.coord.lat);
                localStorage.setItem("longitude", response.data.city.coord.lon);


            })
            .catch(() => setError("This is not a valid city name. Waiting for city..."))
            .finally(() => setLoading(false));
    }, [selectedCity]);

    return (
        <div className="container mt-4">
            {loading && <p className="text-center text-secondary small">Loading...</p>}
            {error && <p className="text-danger text-center small">{error}</p>}
            <div className="mt-3">
                <h3 className="title text-center small">Local Weather</h3>
                <h2 className="text-center small">
                    {selectedCity
                        ? `Weather forecast for ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`
                        : "Waiting for city..."}
                </h2>
                <div className="table-responsive weather-table-container">
                    <table className="table table-sm table-bordered text-nowrap weather-table">
                        <thead className="text-center small">
                            <tr>
                                <th>Day</th>
                                <th>Temp(°C)</th>
                                <th>Feels Like(°C)</th>
                                <th>Rain(mm)</th>
                                <th>Weather</th>
                            </tr>
                        </thead>
                        <tbody className="text-center small">
                            {showForecast && forecast ? (
                                forecast.list.map((day) => (
                                    <tr key={day.dt_txt}>
                                        <td>{formatDateToWeekday(day.dt_txt)}</td>
                                        <td>{Math.round(day.main.temp)}°C</td>
                                        <td>{Math.round(day.main.feels_like)}°C</td>
                                        <td>{day.rain ? day.rain["3h"] : 0} mm</td>
                                        <td>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                                alt="Weather icon"
                                                title={day.weather[0].description}
                                                className="weather-icon img-fluid"
                                                style={{ width: "30px", height: "30px" }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted small">
                                        Waiting for city...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;