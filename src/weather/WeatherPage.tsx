// WeatherPage.tsx
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WeatherPage = () => {
  const { geoname_id,name } = useParams<{geoname_id: string; name: string }>();
  const [weatherData, setWeatherData] = useState<any>(null); // State to hold weather data

  useEffect(() => {
    // Fetch weather data for the city
    const fetchWeatherData = async () => {
      try {
        const apiKey = "3296a596703aff699e71fc55d44d5477"; // Replace with your OpenWeatherMap API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
        );
        const data = await response.json();
        setWeatherData(data);
        console.log("Weather data:", data);
        console.log("City name:", name);
        console.log("Geoname ID:", geoname_id);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [geoname_id,name]);

  return (
    <div>
      <h1>Weather for {name}</h1>
      {weatherData && (
        <div className="">
          <p> Weather:{weatherData.weather[0].main}</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}K</p>
          <p>Feels Like: {weatherData.main.feels_like}K</p>
          <p>Minimum Temperature: {weatherData.main.temp_min}K</p>
          <p>Maximum Temperature: {weatherData.main.temp_max}K</p>
          <p>Visibility: {weatherData.visibility}%</p>
          <p>clouds:{weatherData.clouds.all}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Country: {weatherData.sys.country}</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p>Timezone: {weatherData.timezone}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
