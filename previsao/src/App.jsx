import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherInformations from './components/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformation5Days'

function App() {

  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()
  const inputRef = useRef()

  const searchCity = async () => {
    const city = inputRef.current.value

    const key = '76414720d10a4b4df163886ad8278919'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    try {
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data); 
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
      <button onClick={searchCity}>Buscar</button>
      {weather ? <WeatherInformations weather={weather} /> : null}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  )
}

export default App
