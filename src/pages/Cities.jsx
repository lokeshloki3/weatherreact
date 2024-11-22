import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";

const Cities = () => {
  const { text, country } = useContext(MyContext);
  const { latitude, longitude } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        // setLoading(true);
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
          // setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [latitude, longitude]);

  const handleAddToBookmarks = () => {
    if (latitude && longitude && country && text) {
      const bookmark = {
        city: text,
        country: country,
        latitude: latitude,
        longitude: longitude,
      };

      // Get existing bookmarks from localStorage
      const existingBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];

      // Add the new bookmark to the existing bookmarks array
      existingBookmarks.push(bookmark);

      // Save the updated array back to localStorage
      localStorage.setItem("bookmarks", JSON.stringify(existingBookmarks));

      alert("City added to bookmarks!");
    } else {
      alert("Incomplete information to bookmark the city.");
    }
  };

  return (
    <div>
      <h2>
        Weather for {text || "NA"}, {country || "NA"}
      </h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>

      {weatherData && weatherData.current_weather && (
        <div>
          <h3>Current Weather:</h3>
          <p>Temperature: {weatherData.current_weather.temperature}°C</p>
          <p>Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
          <p>Wind Direction: {weatherData.current_weather.winddirection}°</p>
          <p>
            Daytime: {weatherData.current_weather.is_day === 1 ? "Yes" : "No"}
          </p>
        </div>
      )}

      <button onClick={handleAddToBookmarks}>Add to Bookmarks</button>
    </div>
  );
};

export default Cities;
