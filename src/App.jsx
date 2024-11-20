
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Navbar from './components/Navbar';
import Bookmarks from './pages/Bookmarks';

const App = () => {
  return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
  );
};

export default App;
