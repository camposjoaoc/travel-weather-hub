// src/components/SunriseSunset.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { SunriseSunsetProps } from "../types/SunriseSunsetData";

const SunriseSunset: React.FC<SunriseSunsetProps> = ({ latitude, longitude, city }) => {
    const [sunData, setSunData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!latitude || !longitude) return;
        setLoading(true);
        setError(null);
        axios
            .get(`http://localhost:8000/sunrise-sunset?lat=${latitude}&lng=${longitude}`)
            .then((res) => setSunData(res.data.results))
            .catch(() => setError("Oops! Something went wrong while loading the data"))
            .finally(() => setLoading(false));
    }, [latitude, longitude]);

    return (
        <div className="max-w-[600px] mx-auto p-2.5">
            <h3 className="font-sketch text-[1.5rem] text-center mb-2">Sunrise & Sunset Times</h3>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            {!latitude || !longitude ? (
                <p className="text-center text-sm"> Hang tight — Sunrise and Sunset info is on the way!</p>
            ) : loading ? (
                <p className="text-center text-sm">Loading...</p>
            ) : sunData ? (
                <div className="max-w-full overflow-x-auto">
                    <table className="text-[0.85rem] w-full border border-gray-300 text-center ">
                        <tbody>
                            <tr className="border-t">
                                <td className="border p-1 m-0 text-center font-semibold  bg-gray-100 text-gray-700">🌅 Sunrise</td>
                                <td className="border p-1 m-0">{sunData.sunrise}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="border p-1 m-0 text-center font-semibold  bg-gray-100 text-gray-700">🟠 Golden Hour</td>
                                <td className="border p-1 m-0">{sunData.golden_hour}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="border p-1 m-0 text-center font-semibold  bg-gray-100 text-gray-700">🌇 Sunset</td>
                                <td className="border p-1 m-0">{sunData.sunset}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="border p-1 m-0 text-center font-semibold  bg-gray-100 text-gray-700">☀️ Solar Noon</td>
                                <td className="border p-1 m-0">{sunData.solar_noon}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="border p-1 m-0 text-center font-semibold  bg-gray-100 text-gray-700">⏳ Day Length</td>
                                <td className="border p-1 m-0">{sunData.day_length}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="border p-1 m-0 text-center font-semibold  bg-gray-100 text-gray-700">🌄 Dawn</td>
                                <td className="border p-1 m-0">{sunData.dawn}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="border p-1 m-0 text-center font-semibold  bg-gray-100 text-gray-700">🌆 Dusk</td>
                                <td className="border p-1 m-0">{sunData.dusk}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="p-2">
                        {city && (
                            <h4 className="text-[1rem] text-center text-blue-400 mb-2">
                                Sunrise and Sunset for {city.charAt(0).toUpperCase() + city.slice(1)}
                            </h4>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-xs">Waiting for data...</p>
            )}
        </div>
    );
};

export default SunriseSunset;