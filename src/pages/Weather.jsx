import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import Tile from "../components/Tile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Weather = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const { setText, setLatitude, setLongitude, setCountry } =
    useContext(MyContext);

  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from localStorage
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const handleRemove = (bookmark) => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const updatedBookmarks = storedBookmarks.filter(
      (b) =>
        b.latitude !== bookmark.latitude || b.longitude !== bookmark.longitude
    );

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

    setBookmarks(updatedBookmarks);

    toast.success(`${bookmark.city} removed from bookmarks!`);
  };

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
    if (!newCity || newCity.length <= 1) {
      setCities([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${newCity}&count=6&language=en&format=json`
      );
      const data = await response.json();
      if (data.results) {
        setCities(data.results);
        setShowDropdown(true);
      }
    } catch (err) {
      toast.error("Failed to fetch city data");
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
    <div className="flex justify-center bg-slate-200 h-screen">
      <div className="w-[90%] md:w-3/4 text-center">
        <h1 className="text-4xl mb-8 mt-20">Weather App</h1>
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
              className="border border-blue-200 shadow-lg p-1 rounded-lg fixed bg-white z-10 w-[90%] md:w-[45%] transform translate-y-11"
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
          <div className="mt-16 w-full md:w-3/4 mx-auto">
            <h2 className="text-xl font-semibold mb-6">Your Favourites</h2>
            <p className="text-base text-center mb-4">
              Click to see more info of current Weather
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
              {bookmarks.map((bookmark, index) => (
                <Tile
                  key={index}
                  bookmark={bookmark}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Weather;
