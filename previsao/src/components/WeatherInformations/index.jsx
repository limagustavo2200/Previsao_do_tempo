import './WeatherInformations.css'
export default function WeatherInformations(props) {
    

    
    console.log(props.weather)
    return (
        <div className="weather-container">
            <h2>{props.weather.name}</h2>
            <div className="weather-info">
                <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0]?.icon}.png`} alt="Ícone do clima" />
                <p className="temperature">{Math.round(props.weather.main?.temp)}°C</p>
            </div>
            <p className="description">{props.weather.weather[0].description}</p>
            <div className="details">
                <p>Sensação térmica: {Math.round(props.weather.main.feels_like)}°C</p>
                <p>Umidade: {props.weather.main.humidity}%</p>
                <p>Pressão: {props.weather.main.pressure}</p>
            </div>
        </div>
    )
}
