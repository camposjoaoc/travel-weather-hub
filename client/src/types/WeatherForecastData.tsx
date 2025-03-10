export interface WeatherForecastData {
    list: {
        dt_txt: string;
        main: {
            temp: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
        rain?: { "3h": number };
    }[];
    city: {
        name: string;
    };
}

export interface WeatherForecastProps {
    city: string;
}