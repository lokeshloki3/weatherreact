import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import loadingGif from "../assets/loading.gif";

const Cities = () => {
  const { text, country, latitude, longitude } = useContext(MyContext);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        setLoading(true);
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
        } finally {
          setLoading(false);
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

      const existingBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];

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
    <div className="flex justify-center items-center p-6">
      <div className="w-full md:w-3/4 lg:w-2/3 bg-white p-8 rounded-xl">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-14">
          Current Weather for {text || "NA"}, {country || "NA"}
        </h2>

        {loading ? (
          <div className="flex justify-center my-8">
            <img src={loadingGif} alt="Loading..." className="w-16 h-16" />
          </div>
        ) : (
          weatherData && weatherData.current_weather && (
            <div className="text-center text-gray-700 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44">
                  <img src={humidity} className="w-1/2 h-auto mx-auto" />
                  <p className="mb-2">
                    Temperature: {weatherData.current_weather.temperature}°C
                  </p>
                </div>
                <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44">
                  <img src={wind} className="w-1/2 h-auto mx-auto" />
                  <p className="mb-2">
                    Wind Speed: {weatherData.current_weather.windspeed} km/h
                  </p>
                </div>
                <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44">
                  <img src={humidity} className="w-1/2 h-auto mx-auto" />
                  <p className="mb-2">
                    Wind Direction: {weatherData.current_weather.winddirection}°
                  </p>
                </div>
                <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44">
                  <img src={humidity} className="w-1/2 h-auto mx-auto" />
                  <p className="mb-2">
                    Daytime:{" "}
                    {weatherData.current_weather.is_day === 1 ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {!loading && (
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={handleAddToBookmarks}
              className="w-full md:w-48 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
            >
              Add to Bookmarks
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full md:w-48 px-5 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none transition"
            >
              Back to Weather
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
