import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  // Destructure context values
  const { setCountry, setLatitude, setLongitude, setText } = useMyContext();
  const navigate = useNavigate();

  // Set context values
  const handleBookmarkClick = (bookmark) => {
    setText(bookmark.city);
    setCountry(bookmark.country);
    setLatitude(bookmark.latitude);
    setLongitude(bookmark.longitude);
  };

  // Fetch bookmarks
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const handleRemoveBookmark = (latitude, longitude) => {
    const existingBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    // Filter out (based on latitude and longitude)
    const updatedBookmarks = existingBookmarks.filter(
      (bookmark) =>
        bookmark.latitude !== latitude && bookmark.longitude !== longitude
    );

    // Update in localStorage
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

    // Update state to reflect change
    setBookmarks(updatedBookmarks);
  };

  return (
    <div className="w-3/4 mx-auto mt-10">
      <div>
        <h2 className="text-2xl text-center font-bold mb-4">Your Bookmarks</h2>
        <p className="text-lg text-center font-semibold mb-4">
          Click to see current Weather
        </p>
        <div className="flex justify-center md:justify-end w-full mb-4">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none transition"
          >
            Back to Weather
          </button>
        </div>

        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6 mr-6">
            {bookmarks.map((bookmark, index) => (
              <div
                key={index}
                className="mb-4 p-3 md:p-4 border border-blue-200 rounded-xl text-center"
              >
                <Link
                  to="/cities"
                  className="text-blue-500 hover:underline"
                  onClick={() => handleBookmarkClick(bookmark)}
                >
                  <h3 className="text-xl font-semibold">
                    {bookmark.city}, {bookmark.country}
                  </h3>
                </Link>
                {/* <p>Latitude: {bookmark.latitude}</p>
                <p>Longitude: {bookmark.longitude}</p> */}

                <button
                  onClick={() =>
                    handleRemoveBookmark(bookmark.latitude, bookmark.longitude)
                  }
                  className="text-red-500 hover:text-red-700 mt-2 hover:underline"
                >
                  Remove Bookmark
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No bookmarks available.</p>
            <Link to="/weather">
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Search for Weather
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
