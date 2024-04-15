import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import WeatherPage from "./weather/WeatherPage"
import Page from "./app/cities/page";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/city/:geoname_id/:name" element={< WeatherPage/>} /> {/* Variable path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
