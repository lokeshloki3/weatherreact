import { Routes, Route } from 'react-router-dom';
import Weather from './pages/Weather';
import Navbar from './components/Navbar';
import Bookmarks from './pages/Bookmarks';
import Cities from './pages/Cities';
import { MyContextProvider } from './MyContext';

const App = () => {
  return (
    <MyContextProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/cities" element={<Cities />} />
        </Routes>
      </div>
    </MyContextProvider>
  );
};

export default App;
