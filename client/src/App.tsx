import { useState } from "react";
import '../src/styles/App.css'
import UserInput from './components/UserInput'
import WeatherForecast from './components/WeatherForecast'

function App() {
  const [city, setCity] = useState<string>("");
  return (
    <>
    <div className="container">
      <UserInput onCityChange={setCity} />
      <WeatherForecast city={city} /> 
    </div>
    </>
  )
}

export default App
