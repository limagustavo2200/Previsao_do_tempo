import './WeatherInformations5Days.css';

export default function WeatherInformations5Days(props) {
    let dailyForecast = {};

    for (let forecast of props.weather5Days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast;
        }
    }

    const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);

    function converteDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long' });
        return newDate
    }

    return (
        <div className="weather-forecast">
            <h3>Previsão Próximos 5 Dias</h3>
            <div className='weather-list'>
                {next5DaysForecast.map((forecast, index) => (
                    <div key={index} className="weather-item">
                        <p className='forecast-day'>{converteDate(forecast)}</p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Ícone do clima" />
                        <p className='forecast-description'>{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)}°C min / {Math.round(forecast.main.temp_max)}°C máx</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
