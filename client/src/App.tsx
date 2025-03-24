import { useState } from "react";
import '../src/styles/App.css'
import UserInput from './components/UserInput'
import WeatherForecast from './components/WeatherForecast'
import SunriseSunset from './components/SunriseSunset'
import TrafficIncident from './components/TrafficIncidents'; // Import your TrafficIncident component
import ErrorBoundary from './components/ErrorBoundry'; // Import the ErrorBoundary component
import Footer from './components/Footer'
import TransportDepartures from "./components/TransportDepartures";

function App() {
  const [city, setCity] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  return (
    <>
      <div className="container">
        {/* Section 1 - Logo & Input */}
        <section>
          <UserInput onCityChange={setCity} setLatitude={setLatitude} setLongitude={setLongitude} />
        </section>
        {/* Section 2 - Traffic & Weather Forecast */}
        <section className="flex-container flex-container-normal">
          <div className="container-box">
            {/* Traffic Component here */}
            <TransportDepartures latitude={latitude} longitude={longitude} />
          </div>

          <div className="container-box">
            <WeatherForecast city={city} setLatitude={setLatitude} setLongitude={setLongitude} />
          </div>
        </section>

        {/* Section 3 - SunriseSunset & Traffic Updates */}
        <section className="flex-container flex-container-reverse">
          <div className="container-box">
            {/* SunriseSunset here */}
            <SunriseSunset latitude={latitude} longitude={longitude} city={city} />
          </div>

          <div className="container-box">
            {/* Traffic Updates Component here */}
            <ErrorBoundary>
      <TrafficIncident />
    </ErrorBoundary>
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
