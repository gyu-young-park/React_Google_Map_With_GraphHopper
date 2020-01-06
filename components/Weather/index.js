import React,{useState, useEffect} from 'react';
import WeatherWidget from './WeatherWidget';
import WeatherSearchForm from './WeatherSearchForm';
import axios from 'axios';

const WeatherApp = () => {
  const [city,setCity] = useState(undefined);
  const [country,setCountry] = useState(undefined);
  const [icon,setIcon] = useState(undefined);
  const [celsius,setcelsius] = useState(undefined)
  const [temp_max,setTempMax] = useState(undefined);
  const [temp_min,setTempMin] = useState(undefined);
  const [description,setDescription] = useState("");
  const [error,setError] = useState(false);

  const weatherIcons = {
    Thunderstorm: "wi-Thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  }

  useEffect(()=>{
    getDataWeather("seoul","kr");
  },[])

  const getDataWeather = async (cityName,countryName) => {
    const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&APPID=${process.env.REACT_APP_DEV_OPEN_WEATHER_API_KEY}`)
    setCity(res.data.name)
    setCountry(res.data.sys.country)
    setcelsius(calCelcius(res.data.main.temp))
    setTempMax(calCelcius(res.data.main.temp_max))
    setTempMin(calCelcius(res.data.main.temp_min))
    setIcon(getWeatherIcon(weatherIcons,res.data.weather[0].id));
    console.log(getWeatherIcon(weatherIcons,res.data.weather[0].id))
    setDescription(res.data.weather[0].description)
    setError(false);
  }

  const searchWeather = (e) => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    const countryName = e.target.elements.country.value;
    if(cityName && countryName){
      getDataWeather(cityName,countryName);
    }else{
      setError(true)
    }
  }

  const calCelcius =(temp) =>{
    let cell = Math.floor(temp-273.15)
    return cell;
  }

  const getWeatherIcon = (icons, id) => {
    switch(true){
      case id >= 200 && id <= 232:
        return icons.Thunderstorm;
      case id >= 300 && id <= 321:
        return icons.Drizzle;
      case id >= 500 && id <= 531:
        return icons.Rain
      case id >= 600 && id <= 622:
        return icons.Snow
      case id >= 700 && id <= 781:
        return icons.Atmosphere
      case id === 800:
        return icons.Clear
      case id >= 801 && id <= 804:
        return icons.Clouds
      default:
        return icons.Clouds
    }
  }
  return(
    <div>
      <WeatherSearchForm loadWeather={searchWeather} error={error}/>
      <WeatherWidget city={city} country={country} temp_celsius={celsius} temp_min={temp_min}
         temp_max={temp_max} description={description} weatherIcon={icon}/>
    </div>
  )
}

export default WeatherApp;
