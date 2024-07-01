import "./App.css";
import Movies from "./routes/movies/movies";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import SingleMovie from "./routes/single/SingleMovie";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/single-movie/:id" element={<SingleMovie />} />
      </Routes>
    </>
  );
}

export default App;
