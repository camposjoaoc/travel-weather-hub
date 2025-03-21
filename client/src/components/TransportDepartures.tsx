import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface TransportDeparturesProps {
    latitude: string;
    longitude: string;
}

interface Departure {
    name: string;
    date: string;
    time: string;
    stop: string;
    direction: string;
    transportType: string;
}

const formatTransportTypes = (products: string) => {
    if (!products) return '-';
    const transportTypes: { [key: string]: string } = {
        'BLT': 'Local bus',
        'BRE': 'Regional bus',
        'BXB': 'Express bus',
        'BAX': 'Airport Express bus, such as Flygbussarna',
        'BBL': 'Bus',
        'BRB': 'Replacement bus',
        'FLT': 'Lokal ferry',
        'JAX': 'Airport Express Train, such as Arlanda Express',
        'JLT': 'Local train',
        'JRE': 'Regional train',
        'JIC': 'InterCity train',
        'JST': 'High speed train',
        'JEX': 'Express train',
        'JBL': 'Train',
        'JEN': 'EuroNight train',
        'JNT': 'Night train',
        'SLT': 'Tram',
        'TLT': 'Taxi',
        'ULT': 'Metro',
    };
    return transportTypes[products] || products;
};
const TransportDepartures: React.FC<TransportDeparturesProps> = ({ latitude, longitude }) => {

    console.log(latitude, longitude);
    const [departures, setDepartures] = useState<Departure[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stopLocationName, setStopLocationName] = useState<string | null>(null);
    useEffect(() => {
        fetchDepartures();
    }, [latitude, longitude]);

    const fetchDepartures = async () => {
        setIsLoading(true);
        setError(null);
        console.log(latitude, longitude);
        axios.get(`http://localhost:8000/transport-departures?lat=${latitude}&lng=${longitude}`)
            .then((response) => {
                const data = response.data;
                setStopLocationName(data.stopLocationName);
                const departureBoard = data.departureBoard.Departure || [];
                const departureList = departureBoard?.map((dep: any) => ({
                    name: dep.name || '',
                    date: dep.date || '',
                    time: dep.time || '',
                    stop: dep.stop || '',
                    direction: dep.direction || '',
                    transportType: dep.ProductAtStop.catOut || '',
                }));
                setDepartures(departureList);
            })
            .catch((error) => { setIsLoading(false); setError(error.response.data.error) })
            .finally(() => setIsLoading(false));
    }

    console.log(error);
    if (isLoading) {
        return <p className="text-center text-secondary small">Loading...</p>
    } else if (error) {
        return (
            <div className="container">
                <h4 className="text-center small">Transport Departures</h4>
                <p className="text-danger text-center small">{error}</p>
            </div>
        )
    } else if (departures.length === 0) {
        return (
            <div className="container">
                <h4 className="text-center small">Transport Departures</h4>
                <p className="text-danger text-center small">No departures found from {stopLocationName}</p>
            </div>
        )
    } else {

        return (
            <div className="container p-5">
                <h4 className="text-center small">Transport Departures</h4>
                <div className="table-responsive weather-table-container" style={{
                    maxHeight: '230px',
                    maxWidth: '900px',
                    overflowY: 'auto',
                    border: '1px solid #dee2e6',
                }}>

                    <table className="table table-sm table-striped table-bordered text-nowrap weather-table" style={{ width: '100%' }}>
                        <thead className="text-center small bg-gray-100 text-gray-700">
                            <tr>

                                <th className="border px-1 py-1">Departure Date-Time</th>
                                <th className="border px-1 py-1">Stop</th>
                                <th className="border px-1 py-1">Direction</th>
                                <th className="border px-1 py-1">Transport Type</th>
                                <th className="border px-1 py-1">Name</th>
                            </tr>
                        </thead>
                        <tbody className="text-center small">
                            {departures.map((departure, i) => (
                                <tr key={i}>
                                    <td className="border px-1 py-1">{departure.date} {departure.time}</td>
                                    <td className="border px-1 py-1">{departure.stop}</td>
                                    <td className="border px-1 py-1">{departure.direction}</td>
                                    <td className="border px-1 py-1">{formatTransportTypes(departure.transportType)}</td>
                                    <td className="border px-1 py-1">{departure.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
};

export default TransportDepartures;
