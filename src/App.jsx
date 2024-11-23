import { Routes, Route } from "react-router-dom";
import Weather from "./pages/Weather";
import Cities from "./pages/Cities";
import { MyContextProvider } from "./MyContext";

const App = () => {
  return (
    <MyContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/cities" element={<Cities />} />
        </Routes>
      </div>
    </MyContextProvider>
  );
};

export default App;
