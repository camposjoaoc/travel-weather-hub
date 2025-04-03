import React, { useState, useEffect } from "react";
import axios from "axios";
import { WeatherForecastData, WeatherForecastProps } from "../types/WeatherForecastData";

const WeatherForecast: React.FC<WeatherForecastProps> = ({ city, setLatitude,
    setLongitude }) => {
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
                setLatitude(response.data.city.coord.lat.toString());
                setLongitude(response.data.city.coord.lon.toString());
            })
            .catch(() => setError("City not found. Please enter another one to continue."))
            .finally(() => setLoading(false));
    }, [selectedCity]);

    //If there is no city, it does not render anything.
    if (!selectedCity) return null;

    return (
        <div className="container max-w-full overflow-x-auto p-4 bg-white rounded-lg">
            {loading && <p className="text-center text-gray-500 text-sm">Loading...</p>}
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            <div>
                <h3 className="font-sketch text-[1.5rem] text-center">Local Weather</h3>
            </div>
            <div className="mt-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="text-[0.90rem] w-full border border-gray-300 text-center leading-tight p-0">
                        <thead className="bg-[rgb(176,242,213)] text-gray-700">
                            <tr>
                                <th className="border px-1 py-1">Day</th>
                                <th className="border px-1 py-1">Temp(°C)</th>
                                <th className="border px-1 py-1">Feels(°C)</th>
                                <th className="border px-1 py-1">Rain(mm)</th>
                                <th className="border px-1 py-1">Weather</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showForecast && forecast ? (
                                forecast.list.map((day) => (
                                    <tr key={day.dt_txt} className="border-t">
                                        <td className="border px-2 py-1 font-semibold">{formatDateToWeekday(day.dt_txt)}</td>
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
                                        Hang tight — weather info is on the way!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-2">
                    <h4 className="text-[1rem] text-center text-[rgb(37,136,93)]">
                        {selectedCity
                            ? `Weather forecast for ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`
                            : "..."}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;