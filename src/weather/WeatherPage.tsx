import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import rain from "../images/rain.jpg";
import clouds from "../images/clouds.jpg";
import drizzle from "../images/drizzle.jpg";
import clear from "../images/clear.jpg";
import atmosphere from "../images/atmosphere.jpg";
import snow from "../images/snow.jpg";
import thunderstorm from "../images/thunderstorm.jpg";

const WeatherPage = () => {
  const { geoname_id, name } = useParams<{
    geoname_id: string;
    name: string;
  }>();
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
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [geoname_id, name]);

  // Object mapping weather conditions to background image URLs
  const weatherBackgrounds: { [key: string]: string } = {
    Clear: clear,
    Clouds: clouds,
    Rain: rain,
    Thunderstorm: thunderstorm,
    Atmosphere: atmosphere,
    Drizzle: drizzle,
    Snow: snow,
    // Add more weather conditions and corresponding image URLs as needed
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat">
      <div
        className="bg-black bg-opacity-70 h-full flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            weatherData && weatherBackgrounds[weatherData.weather[0].main]
              ? `url(${weatherBackgrounds[weatherData.weather[0].main]})`
              : '',
        }}
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Weather for {name}
        </h1>
        {weatherData && (
          <div className="text-white">
            <p>Weather: {weatherData.weather[0].main}</p>
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
            <p>
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
            <p>Timezone: {weatherData.timezone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
