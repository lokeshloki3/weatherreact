import React, { createContext, useState, useContext } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <MyContext.Provider value={{ text, setText, latitude, setLatitude, longitude, setLongitude }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
