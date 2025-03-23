export interface ForecastEntry {
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    rain?: {
        "3h": number;
    };
}

export interface WeatherForecastData {
    list: ForecastEntry[];
    city: {
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
    };
}

export interface WeatherForecastProps {
    city: string;
    setLatitude: (lat: string) => void;
    setLongitude: (lng: string) => void;
}