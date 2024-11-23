import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import { Link, useNavigate } from "react-router-dom";

const Tile = ({ bookmark }) => {
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
      <div className="cursor-pointer mb-4 pt-2 pb-2 pl-1 pr-1 md:p-2 border border-blue-200 rounded-xl">
        <Link
          to="/cities"
          className="text-blue-500 hover:underline"
          onClick={() => handleBookmarkClick(bookmark)}
        >
          <h3 className="text-lg font-semibold">
            {bookmark.city}, {bookmark.country}
          </h3>
        </Link>
        <div>{weatherData?.current.temperature_2m}</div>
        <button
          onClick={() =>
            handleRemoveBookmark(bookmark.latitude, bookmark.longitude)
          }
          className="text-red-500 hover:text-red-700 hover:underline"
        >
          Remove Bookmark
        </button>
      </div>
    </div>
  );
};

export default Tile;
