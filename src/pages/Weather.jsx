import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
      );
      const data = await response.json();
      if (data.results) {
        setCities(data.results);
      } else {
        setError('No cities found');
      }
      console.log(data);
    } catch (err) {
      setError('Failed to fetch city data');
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-3/4 text-center">
        <h1>Weather</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for City"
            className="border"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className='bg-pink-100'>
            Search
          </button>
        </form>
      </div>

      <div>
        {cities.map((city, index) => (
          <p key={index}>
            {city.name}, {city.country}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Weather;
