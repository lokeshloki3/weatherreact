import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../MyContext";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  // Destructure context values
  const { setCountry, setLatitude, setLongitude, setText } = useMyContext();

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
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-3/4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Bookmarks</h2>

        {bookmarks.length > 0 ? (
          <div>
            {bookmarks.map((bookmark, index) => (
              <div key={index} className="mb-4 p-4 border-b border-gray-300">
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
                  className="text-red-500 hover:text-red-700 mt-2"
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
