import React, { useState, useEffect } from "react";
import axios from "axios";
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
        <div className="max-w-full overflow-x-auto ">
            {loading && <p className="text-center text-gray-500 text-sm">Loading...</p>}
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            <div className="mt-1">
                <h3 className="font-sketch text-[1.5rem] text-center">Local Weather</h3>
                <h4 className="text-[0.9rem] text-center">
                    {selectedCity
                        ? `Weather forecast for ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`
                        : "Waiting for city..."}
                </h4>
                <div className="max-w-full overflow-x-auto">
                    <table className="text-[0.85rem] w-full border border-gray-300 text-center text-xs leading-tight">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border px-1 py-1">Day</th>
                                <th className="border px-1 py-1">Temp(°C)</th>
                                <th className="border px-2 py-1">Feels Like(°C)</th>
                                <th className="border px-1 py-1">Rain(mm)</th>
                                <th className="border px-1 py-1">Weather</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showForecast && forecast ? (
                                forecast.list.map((day) => (
                                    <tr key={day.dt_txt} className="border-t">
                                        <td className="border px-2 py-1">{formatDateToWeekday(day.dt_txt)}</td>
                                        <td className="border px-2 py-1">{Math.round(day.main.temp)}°C</td>
                                        <td className="border px-2 py-1">{Math.round(day.main.feels_like)}°C</td>
                                        <td className="border px-2 py-1">{day.rain ? day.rain["3h"] : 0} mm</td>
                                        <td className="border px-1 py-0.5 leading-none">
                                            <img
                                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                                alt="Weather icon"
                                                title={day.weather[0].description}
                                                style={{ width: "30px", height: "30px", maxWidth: "30px", maxHeight: "30px", display: "inline-block" }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-400 py-2">
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