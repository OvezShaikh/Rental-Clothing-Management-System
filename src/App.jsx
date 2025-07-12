import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"; // Ensure Tailwind CSS is imported
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import About from "./pages/About";
import FAQ from "./pages/faq";
import { FaQ } from "react-icons/fa6";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import MyRentals from "./pages/MyRentals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/myrentals" element={<MyRentals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
