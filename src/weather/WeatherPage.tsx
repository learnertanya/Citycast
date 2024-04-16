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
  const [temperatureUnit, setTemperatureUnit] = useState<string>("kelvin"); // Default temperature unit

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
  };

  // Function to toggle temperature unit
  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === "kelvin" ? "celsius" : "kelvin"));
  };

  // Function to convert temperature to the selected unit
  const convertTemperature = (temp: number, unit: string) => {
    switch (unit) {
      case "celsius":
        return (temp - 273.15).toFixed(2) + "°C";
      case "kelvin":
      default:
        return temp + "K";
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-cover">
      <div
        className=" bg-cover h-full flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            weatherData && weatherBackgrounds[weatherData.weather[0].main]
              ? `url(${weatherBackgrounds[weatherData.weather[0].main]})`
              : "",
        }}
      >
        <h1 className="my-9 uppercase py-30 text-6xl font-bold font-serif  text-slate-700 mb-4">
          {name}
        </h1>
        {weatherData && (
          <div className="rounded-3xl max-w-80 py-8 bg-slate-50 text-slate bg-black bg-opacity-40 h-full flex flex-col justify-center items-center rounded-lg shadow-xl mb-10">
            <div className="max-w-md px-4 ">
              <p className="mb-2 text-xl font-semibold font-mono">
                Weather: {weatherData.weather[0].main}
              </p>

              <p className="mb-2 capitalize font-medium text-5xl font-mono">
                {convertTemperature(weatherData.main.temp, temperatureUnit)}
              </p>
              <p className="mb-5 text-base capitalize font-medium	font-sans ">
                {weatherData.weather[0].description}
              </p>
              <p className="mb-4 capitalize font-medium font-sans">
                {convertTemperature(weatherData.main.temp_min, temperatureUnit)}/
                {convertTemperature(weatherData.main.temp_max, temperatureUnit)} Feels
                Like {convertTemperature(weatherData.main.feels_like, temperatureUnit)}
              </p>
              <div className="flex flex-wrap justify-between">
                <div className="mb-4 capitalize font-bold text-lg  font-sans">
                  Visibility: {weatherData.visibility}%
                </div>
                <div className="mb-4 capitalize font-bold text-lg  font-sans">
                  Clouds: {weatherData.clouds.all}
                </div>
              </div>
              <div className="flex flex-wrap justify-between ">
                <div className="mb-4 capitalize font-bold text-lg font-sans pe-5">
                  Humidity: {weatherData.main.humidity}%
                </div>
                <div className="mb-4  font-bold  font-sans text-lg ">
                  Wind Speed: {weatherData.wind.speed} m/s
                </div>
              </div>
              <div>
                <div className="mb-4 capitalize font-bold text-lg  font-sans">
                  Sunrise:{" "}
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </div>
                <div className="mb-4 capitalize font-bold text-lg  font-sans">
                  Sunset:{" "}
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={toggleTemperatureUnit}
                className="px-4 py-2 mt-4 text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                {temperatureUnit === "kelvin" ? "°C" : "K"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
