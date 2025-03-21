const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p className="font-oxygen text-center text-sm text-gray-500">Created by João, Mahmoud, Nikita & Pinar </p>
            <p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} Local Travel & Weather Dashboard. All rights reserved.</p>
            <p className="text-center text-sm text-gray-500">Powered by OpenWeatherMap API,Google Maps API, OpenWeather API, SunriseSunsteAPI & TrafikverketsAPI.</p>

        </footer>
    );
};

export default Footer;