// Weather.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

const Weather = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const { text, setText, latitude, setLatitude, longitude, setLongitude, country, setCountry } = useContext(MyContext);

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
      </div>
    </div>
  );
};

export default Weather;
