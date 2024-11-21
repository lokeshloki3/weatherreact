import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext";

const Cities = () => {
  const { text, latitude, longitude } = useContext(MyContext);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=13.6978&longitude=123.4892&current_weather=true`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [latitude, longitude]);

  return (
    <div>
      <h2>
        Weather for {text || "NA"}
      </h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      
      {weatherData && weatherData.current_weather && (
        <div>
          <h3>Current Weather:</h3>
          <p>Temperature: {weatherData.current_weather.temperature}°C</p>
          <p>Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
          <p>Wind Direction: {weatherData.current_weather.winddirection}°</p>
          <p>Daytime: {weatherData.current_weather.is_day === 1 ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Cities;
