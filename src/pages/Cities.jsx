import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import loadingGif from "../assets/loading.gif";
import cloud from "../assets/cloud.png";
import day from "../assets/day.png";
import night from "../assets/night.png";
import temperature from "../assets/temperature.png";
import time from "../assets/time.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cities = () => {
  const { text, country, latitude, longitude } = useContext(MyContext);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        setLoading(true);
        setNoData(false);

        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }

          const data = await response.json();
          // console.log(data);
          // If no data or no current in the response
          if (!data || !data.current) {
            setNoData(true);
          } else {
            setWeatherData(data);
          }
        } catch (err) {
          setNoData(true);
          toast.error("Failed to fetch weather data");
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    } else {
      setNoData(true);
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const existingBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isBookmarkExist = existingBookmarks.some(
      (b) => b.latitude === latitude && b.longitude === longitude
    );
    setIsBookmarked(isBookmarkExist);
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
        toast.info("This city is already in your bookmarks!");
      } else {
        if (existingBookmarks.length >= 8) {
          toast.warning(
            "You can only have 8 bookmarks. Remove one to add a new city."
          );
        } else {
          existingBookmarks.push(bookmark);
          localStorage.setItem("bookmarks", JSON.stringify(existingBookmarks));
          toast.success("City added to bookmarks!");
          setIsBookmarked(true);
        }
      }
    } else {
      toast.error("Not added");
    }
  };

  const handleRemoveFromBookmarks = () => {
    const existingBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    const updatedBookmarks = existingBookmarks.filter(
      (b) => !(b.latitude === latitude && b.longitude === longitude)
    );

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    toast.success("City removed from bookmarks!");
    setIsBookmarked(false);
  };

  return (
    <div className="flex justify-center items-center p-6 bg-slate-200 h-screen">
      <div className="w-full md:w-3/4 bg-slate-200 p-0 md:p-8 rounded-xl">
        {noData ? (
          <div className="fixed inset-0 flex justify-center items-center bg-slate-200 bg-opacity-50 z-50">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                No Data Found
              </h2>
              <button
                onClick={() => navigate("/")}
                className="px-5 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none transition"
              >
                Go Home
              </button>
            </div>
          </div>
        ) : (
          <>
            {loading ? (

            ) : (
              <>
                {weatherData && weatherData.current && (
                  <h2 className="text-3xl font-semibold text-gray-800 text-center mb-14">
                    Current Weather for {text || "NA"}, {country || "NA"}
                  </h2>
                )}

                {weatherData && weatherData.current ? (
                  <div className="text-center text-gray-700 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44 bg-white">
                        <img
                          src={temperature}
                          className="w-1/3 h-auto mx-auto"
                        />
                        <p className="font-semibold">
                          Temperature: {weatherData.current.temperature_2m}
                          °C
                        </p>
                      </div>
                      <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-0 md:p-2 pb-1 min-w-44 bg-white">
                        <img src={wind} className="w-1/3 h-auto mx-auto" />
                        <p className="font-semibold">
                          Wind Speed: {weatherData.current.wind_speed_10m} km/h
                        </p>
                      </div>
                      <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44 bg-white">
                        <img src={cloud} className="w-1/3 h-auto mx-auto" />
                        <p className="font-semibold">
                          Cloud Cover: {weatherData.current.cloud_cover} %
                        </p>
                      </div>
                      <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44 bg-white">
                        <img src={humidity} className="w-1/3 h-auto mx-auto" />
                        <p className="font-semibold">
                          Humidity: {weatherData.current.relative_humidity_2m} %
                        </p>
                      </div>
                      <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44 bg-white">
                        <img
                          src={weatherData.current.is_day === 1 ? day : night}
                          className="w-1/3 h-auto mx-auto"
                        />
                        <p className="font-semibold">
                          {" "}
                          {weatherData.current.is_day === 1 ? "Day" : "Night"}
                        </p>
                      </div>
                      <div className="flex flex-col border border-blue-200 rounded-lg mx-auto p-2 pb-1 min-w-44 bg-white">
                        <img src={time} className="w-1/4 h-auto mx-auto" />
                        <p className="font-semibold text-sm">
                          Date & Time: <br />
                          {weatherData.current.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {weatherData && weatherData.current && (
                  <div className="flex justify-between gap-4 mt-8 flex-col md:flex-row">
                    <button
                      onClick={
                        isBookmarked
                          ? handleRemoveFromBookmarks
                          : handleAddToBookmarks
                      }
                      className="w-56 mx-auto py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
                    >
                      {isBookmarked
                        ? "Remove from Favourites"
                        : "Add to Favourites"}
                    </button>

                    <button
                      onClick={() => navigate("/")}
                      className="w-56 mx-auto py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none transition"
                    >
                      Back to Weather
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cities;
