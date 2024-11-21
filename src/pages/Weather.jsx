import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";

const Weather = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const { text, setText } = useContext(MyContext);

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
        setError("No cities found");
      }
      // console.log(data);
    } catch (err) {
      setError("Failed to fetch city data");
    }
  };

  const selectedCity = () => {
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
                <div onClick={(e) => {selectedCity(city)
                setText(city.name)}} key={index}>
                  {city.name}, {city.country}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* <button type="submit" className='bg-pink-100'>
          Search
        </button> */}
      </div>
    </div>
  );
};

export default Weather;
