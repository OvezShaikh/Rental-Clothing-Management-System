import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css"; // Ensure Tailwind CSS is imported
// import Register from "./pages/Register";
import About from "./pages/About";
import FAQ from "./pages/faq";
import { FaQ } from "react-icons/fa6";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import MyRentals from "./pages/MyRentals";
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop component
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import ProductPage from "./pages/ProductPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component
import Logout from "./pages/Logout"; // Import Logout component
import ContactPage from "./pages/ContactPage"; // Import ContactPage component
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import Settings from "./pages/Settings"; // Import Settings component
import TrackOrder from "./pages/TrackOrder"; // Import TrackOrder component
import AdminDashboard from "./pages/AdminDashboard"; // Import AdminDashboard component

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:parentSlug" element={<Catalog />} />
        <Route path="/myrentals" element={<MyRentals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/track-order/:orderId" element={<TrackOrder />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
