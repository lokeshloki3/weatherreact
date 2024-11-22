import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";

const Tile = ({ bookmark }) => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const {
    setText,
    setLatitude,
    setLongitude,
    setCountry,
  } = useContext(MyContext);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${bookmark.latitude}&longitude=${bookmark.longitude}&current_weather=true`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        // console.log(data);
        setWeatherData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchWeatherData();
  }, []);

  const handleBookmarkClick = (bookmark) => {
    setText(bookmark.city);
    setCountry(bookmark.country);
    setLatitude(bookmark.latitude);
    setLongitude(bookmark.longitude);
    navigate("/cities");
  };

  return (
    <div>
      <div
        className="cursor-pointer mb-4 p-2 border border-blue-200 rounded-xl hover:bg-blue-500"
        onClick={() => handleBookmarkClick(bookmark)}
      >
        {bookmark.city}, {bookmark.country},{" "}
        {weatherData?.current_weather.temperature}
      </div>
    </div>
  );
};

export default Tile;
