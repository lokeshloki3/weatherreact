import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import Tile from "../components/Tile";

const Weather = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
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

  const handleBlur = () => {
    if (!city) {
      setShowDropdown(false);
      setCity("");
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleSearch = async (newCity) => {
    if (!newCity || newCity.length <= 1) {
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
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {showDropdown && cities.length > 0 && (
            <div className="border border-blue-200 shadow-lg rounded-lg">
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
            <p className="text-base text-center mb-4">
              Click to see more info of current Weather
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {bookmarks.map((bookmark, index) => (
                <Tile key={index} bookmark={bookmark} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
