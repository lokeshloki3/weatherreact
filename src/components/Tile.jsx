import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import { Link, useNavigate } from "react-router-dom";
// import cross from "../assets/cross.png";

const Tile = ({ bookmark, handleRemove }) => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const { setText, setLatitude, setLongitude, setCountry } =
    useContext(MyContext);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${bookmark.latitude}&longitude=${bookmark.longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error(err.message);
        alert("Failed to fetch weather data");
      }
    };

    fetchWeatherData();
  }, [bookmark.latitude, bookmark.longitude]);

  const handleBookmarkClick = () => {
    setText(bookmark.city);
    setCountry(bookmark.country);
    setLatitude(bookmark.latitude);
    setLongitude(bookmark.longitude);
    navigate("/cities");
  };

  return (
    <div className="mb-4 pt-2 pb-2 pl-1 pr-1 md:p-2 border border-blue-200 rounded-xl bg-white">
      <div className="relative">
        <Link
          to="/cities"
          className="text-blue-500 hover:underline"
          onClick={handleBookmarkClick}
        >
          <h3 className="text-base md:text-lg font-semibold mx-auto cursor-pointer">
            {bookmark.city}, {bookmark.country}
          </h3>
        </Link>
        <div
          className="text-red-500 font-bold cursor-pointer absolute top-0 right-1 pl-2"
          onClick={() => handleRemove(bookmark)}
        >
          X
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm md:text-base font-semibold">
          Temp: {weatherData?.current.temperature_2m} °C
        </div>
        <div className="text-sm md:text-base font-semibold">
          Day: {weatherData?.current.is_day === 1 ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
};

export default Tile;
