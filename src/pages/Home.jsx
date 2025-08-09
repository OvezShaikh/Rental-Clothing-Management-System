import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import CategoryIcons from "../components/CategoryIcons";
import FlashSaleSection from "../components/FlashSaleSection";
import TodaysForYouSection from "../components/TodaysForYouSection";
import GenderCategorySection from "../components/GenderCategorySection";
import ServiceHighlights from "../components/ServiceHighlights";
import RentalProcess from "../components/RentalProcess";
import Gallery from "../components/Gallery";
// import ProductCard from "../components/ProductCard"; // Can be used for later sections
// import ProductQuickView from "../components/ProductQuickView";
// import BentoGrid from "../components/BentoGrid";

const Home = () => {
  // Placeholder for later (like Quick View)
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const hoverTimer = useRef(null);

  const handleMouseEnter = (product) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setActiveProduct(product);
      setQuickViewOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setQuickViewOpen(false);
      setActiveProduct(null);
    }, 200);
  };

  return (
    <>
      <Navbar />
      <HeroBanner />
      <CategoryIcons />
      <GenderCategorySection />
      <ServiceHighlights />

      {/* Placeholder for BentoGrid or ProductCard if needed */}
      {/* <BentoGrid /> */}
      {/* <ProductCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> */}
      {/* <ProductQuickView open={quickViewOpen} product={activeProduct} onClose={() => setQuickViewOpen(false)} /> */}

      {/* Flash Sale Section */}
      <FlashSaleSection />
      {/* Gallery Section */}
      <Gallery />
      {/* Rental Process Section */}
      <RentalProcess />

      {/* Future sections to add below: */}
      {/* <BestSellingStores /> */}

      {/* Future sections to add below: */}
      <TodaysForYouSection />
      {/* <BestSellingStores /> */}

      <Footer />
    </>
  );
};

export default Home;
