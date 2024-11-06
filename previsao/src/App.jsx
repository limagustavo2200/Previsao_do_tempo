import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherInformations from './components/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformation5Days'
import Footer from './components/Footer'

function App() {
  const [weather, setWeather] = useState(null)
  const [weather5Days, setWeather5Days] = useState(null)
  const [status, setStatus] = useState(0)
  const [error, setError] = useState(null)
  const inputRef = useRef()

  const searchCity = async () => {
    const city = inputRef.current.value
    const keyApi = '76414720d10a4b4df163886ad8278919'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyApi}&lang=pt_br&units=metric`

    try {
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data);
      setStatus(preStatus => preStatus + 1);
      setError(null);

    } catch (error) {
      setError("Nome não encontrado");
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <div className='inputWithButton'>
        <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
        <button onClick={searchCity}>Buscar</button>
      </div>

      {error && <p>{error}</p>} 

      {weather && (
        <div key={`weather-${status}`} className="slide-in-left">
          <WeatherInformations weather={weather} />
        </div>
      )}
      {weather5Days && (
        <div key={`weather5Days-${status}`} className="slide-in-right">
          <WeatherInformations5Days weather5Days={weather5Days} />
        </div>
      )}
      {/* <Footer /> */}
    </div>

  )
}

export default App
