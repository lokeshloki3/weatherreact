Created Weather Now App -

Features -
1) Allows users to search for a city as each character is entered in the input field.
2) Retrieves the latitude and longitude of the city by selecting it through an API call.
3) Fetches weather data for the selected city based on its latitude and longitude using a separate API call.
4) Provides an option to add or remove the city from Favourites.
5) Favourites are stored in local storage.
6) Displays up to 8 favourites on the homepage, showing basic current weather information for each.
7) When a favourite is clicked, the app shows detailed weather information.
8) Includes toast notifications when cities are added or removed from the Favourites list.
9) The web app is also mobile-responsive.

Steps -
npm create vite@latest projname
React -> JS
cd projname
npm install
npm run dev

Tailwind CSS -
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
add in tailwind.config.js -
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

add in index.css -
@tailwind base;
@tailwind components;
@tailwind utilities;

import in main.js
import './index.css'; // or './styles/tailwind.css'

npm install react-toastify

npm run dev