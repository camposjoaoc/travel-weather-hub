import { useState } from "react";
import '../src/styles/App.css'
import UserInput from './components/UserInput'
import WeatherForecast from './components/WeatherForecast'
import SunriseSunset from './components/SunriseSunset'

function App() {
  const [city, setCity] = useState<string>("");

  window.addEventListener("load", () => {
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
  });
  return (
    <>
      <div className="container">
        {/* Section 1 - Logo & Input */}
        <section>
          <UserInput onCityChange={setCity} />
        </section>
        {/* Section 2 - Traffic & Weather Forecast */}
        <section className="flex-container flex-container-normal">
          <div className="container-box">
            {/* Traffic Component here */}
            <h2>Traffic Component</h2>
          </div>

          <div className="container-box">
            <WeatherForecast city={city} />
          </div>
        </section>

        {/* Section 3 - SunriseSunset & Traffic Updates */}
        <section className="flex-container flex-container-reverse">
          <div className="container-box">
            {/* SunriseSunset here */}
            <SunriseSunset />
          </div>

          <div className="container-box">
            {/* Traffic Updates Component here */}
            <h2>Traffic Updates</h2>
          </div>
        </section>

      </div>
    </>
  )
}

export default App
