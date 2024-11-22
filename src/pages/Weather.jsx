// Weather.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

const Weather = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const {
    text,
    setText,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    country,
    setCountry,
  } = useContext(MyContext);

  // Get the list of bookmarks from localStorage
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const handleSearch = async (newCity) => {
    if (!newCity) {
      setCities([]);
      return;
    }
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=15&language=en&format=json`
      );
      const data = await response.json();
      if (data.results) {
        setCities(data.results);
      } else {
        console.log("No cities found");
      }
    } catch (err) {
      console.log("Failed to fetch city data");
    }
  };

  const selectedCity = (city) => {
    setText(city.name);
    setCountry(city.country);
    setLatitude(city.latitude);
    setLongitude(city.longitude);
    navigate("/cities");
  };

  const handleBookmarkClick = (bookmark) => {
    setText(bookmark.city);
    setCountry(bookmark.country);
    setLatitude(bookmark.latitude);
    setLongitude(bookmark.longitude);
    navigate("/cities");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-3/4 text-center">
        <h1>Weather</h1>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Search for City"
            className="border"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          {cities.length ? (
            <div className="border mt-5 shadow-lg">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => selectedCity(city)}
                >
                  {city.country_code}, {city.name}, {city.country}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {bookmarks.length > 0 && (
          <div className="mt-32">
            <h2 className="text-xl font-semibold mb-8">Your Bookmarks</h2>
            <div className="grid grid-cols-4 gap-4">
              {bookmarks.map((bookmark, index) => (
                <div
                  key={index}
                  className="cursor-pointer mb-2 p-2 border border-blue-200 rounded-xl"
                  onClick={() => handleBookmarkClick(bookmark)}
                >
                  {bookmark.city}, {bookmark.country}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                to="/bookmarks"
                className="border border-blue-200 p-2 hover:bg-blue-500 w-96 mx-auto rounded-lg font-semibold cursor-pointer"
              >
                Click here to see more than 10 bookmarks
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
