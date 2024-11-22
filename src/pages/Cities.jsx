import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext";

const Cities = () => {
  const { text, country, latitude, longitude } = useContext(MyContext);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          console.error(err.message);
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

      const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      
      const isBookmarkExist = existingBookmarks.some(
        (b) => b.latitude === latitude && b.longitude === longitude
      );

      if (isBookmarkExist) {
        alert("This city is already in your bookmarks!");
      } else {
        existingBookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(existingBookmarks));
        alert("City added to bookmarks!");
      }
    } else {
      alert("Not added");
    }
  };

  return (
    <div>
      <h2>
        Weather for {text || "NA"}, {country || "NA"}
      </h2>

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
