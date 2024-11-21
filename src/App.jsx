
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Navbar from './components/Navbar';
import Bookmarks from './pages/Bookmarks';
import Cities from './pages/Cities';
import { MyContext } from './MyContext';
import { useState } from 'react';

const App = () => {
  const [text, setText] = useState("");
  return (
    <MyContext.Provider value={{ text, setText }}>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/cities" element={<Cities />} />
        </Routes>
      </div>
    </MyContext.Provider>
  );
};

export default App;
