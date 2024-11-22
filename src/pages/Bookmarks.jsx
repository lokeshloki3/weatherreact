import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../MyContext";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { setCountry, setLatitude, setLongitude, setText } = useMyContext(); // Destructure context values

  // Fetch bookmarks from localStorage
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  // Handle bookmark click to set context values
  const handleBookmarkClick = (bookmark) => {
    setText(bookmark.city);
    setCountry(bookmark.country);
    setLatitude(bookmark.latitude);
    setLongitude(bookmark.longitude);
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
                  onClick={() => handleBookmarkClick(bookmark)} // Set context when clicked
                >
                  <h3 className="text-xl font-semibold">
                    {bookmark.city}, {bookmark.country}
                  </h3>
                </Link>
                <h3 className="text-xl font-semibold">
                  {bookmark.city}, {bookmark.country}
                </h3>
                <p>Latitude: {bookmark.latitude}</p>
                <p>Longitude: {bookmark.longitude}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookmarks available.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
