import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from localStorage
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-3/4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Bookmarks</h2>

        {bookmarks.length > 0 ? (
          <div>
            {bookmarks.map((bookmark, index) => (
              <div key={index} className="mb-4 p-4 border-b border-gray-300">
                <Link
                  to={`/cities/${bookmark.latitude}/${bookmark.longitude}`}
                  className="text-blue-500 hover:underline"
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
