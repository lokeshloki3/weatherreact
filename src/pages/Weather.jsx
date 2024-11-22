import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

const Weather = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setCity("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (newCity) => {
    if (!newCity) {
      setCities([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=15&language=en&format=json`
      );
      const data = await response.json();
      if (data.results) {
        setCities(data.results);
        setShowDropdown(true);
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
    setShowDropdown(false);
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
        <h1 className="text-4xl m-8">Weather App</h1>
        <div className="flex flex-col w-[100%] md:w-[60%] mx-auto">
          <input
            type="text"
            placeholder="Search for City"
            className="p-2 border border-blue-200 rounded-xl"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              handleSearch(e.target.value);
            }}
          />

          {showDropdown && cities.length > 0 && (
            <div
              ref={dropdownRef}
              className="border border-blue-200 shadow-lg rounded-lg"
            >
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => selectedCity(city)}
                >
                  <div className="grid grid-cols-[100px_1fr_30px] w-[80%] mx-auto text-center ml-0 md:ml-auto">
                    <div>{city.name}</div>
                    <div>{city.country}</div>
                    <div>{city.country_code}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {bookmarks.length > 0 && (
          <div className="mt-24 w-3/4 mx-auto">
            <h2 className="text-xl font-semibold mb-6">Your Favourites</h2>
            <p className="text-base text-center mb-4">Click to see current Weather</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {bookmarks.slice(0, 4).map((bookmark, index) => (
                <div
                  key={index}
                  className="cursor-pointer mb-4 p-2 border border-blue-200 rounded-xl"
                  onClick={() => handleBookmarkClick(bookmark)}
                >
                  {bookmark.city}, {bookmark.country}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                to="/bookmarks"
                className="border border-blue-200 p-2 pl-4 pr-4 hover:bg-blue-500 w-full md:w-96 mx-auto rounded-xl font-semibold cursor-pointer"
              >
                Click here for more than 4
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
