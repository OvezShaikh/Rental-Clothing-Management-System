import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.svg";
import useCategories from "../hooks/useCategories";

const Footer = () => {
  const navigate = useNavigate();
  const { categories = [] } = useCategories(); // ✅ pull real categories (names, ids, slugs)

  // Friendly labels in footer → possible matches in Catalog data (name/slug)
  const displayCategories = [
    { label: "Men's Wear", matches: ["Mens", "Men", "mens", "menswear"] },
    { label: "Women's Wear", matches: ["Womens", "Women", "womens", "womenswear"] },
    { label: "Wedding & Ethnic", matches: ["Wedding & Ethnic", "wedding-ethnic", "wedding", "ethnic"] },
    { label: "Partywear", matches: ["Partywear", "party-wear", "party"] },
    { label: "Corporate/Formal", matches: ["Corporate/Formal", "corporate-formal", "corporate", "formal"] },
  ];

  // Normalizer so "Women's Wear" matches "Womens" / "womenswear" / "womens"
  const normalize = (s) =>
    (s ?? "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]/g, "");

  // Resolve each footer label to an actual catalog category (by name or slug)
  const resolvedFooterCats = displayCategories.map((entry) => {
    const match = categories.find((c) => {
      const cname = normalize(c.name);
      const cslug = normalize(c.slug);
      return entry.matches.some((m) => {
        const mnorm = normalize(m);
        return cname === mnorm || cslug === mnorm;
      });
    });
    return {
      label: entry.label,
      id: match?.id,                 // real id (keep its type)
      systemName: match?.name ?? "", // real catalog name
    };
  });

  const handleFooterCategoryClick = (entry) => {
    if (!entry.id) {
      // If we couldn't resolve the mapping, just go to catalog (All)
      navigate("/catalog");
      return;
    }
    // ✅ Pass both query AND state; keep id as-is (no string coercion)
    navigate(
      `/catalog?categoryId=${entry.id}&category=${encodeURIComponent(entry.systemName || entry.label)}`,
      { state: { categoryId: entry.id } }
    );
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Collection", path: "/catalog" },
    {
      name: "How It Works",
      path: "/about#how-it-works",
      isHashLink: true
    },
    { name: "About Us", path: "/about" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 sm:px-10 py-12 z-80">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="FashionRent Logo" className="w-16 h-12 rounded-full object-cover" />
            <div>
              <h3 className="text-xl font-bold text-white font-playfair text-left">
                Paridhra
                <span className="block text-sm font-poppins text-[#ffd700]">The house of fashion</span>
              </h3>
            </div>
          </div>
          <p className="text-sm text-left leading-relaxed">
            Revolutionizing the way you dress. Rent premium fashion, make memories, and save space and money — all in style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 text-left">Quick Links</h4>
          <ul className="space-y-2 text-left text-sm">
            {quickLinks.map((link, index) => (
              <li key={index}>
                {link.isHashLink ? (
                  <HashLink smooth to={link.path} className="hover:text-white transition-colors duration-200 block">
                    {link.name}
                  </HashLink>
                ) : (
                  <Link to={link.path} className="hover:text-white transition-colors duration-200 block">
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 text-left">Popular Categories</h4>
          <ul className="space-y-1 text-left text-sm">
            {resolvedFooterCats.map((entry, i) => (
              <li key={i}>
                <button
                  onClick={() => handleFooterCategoryClick(entry)}
                  className={`hover:text-white transition-colors duration-200 ${entry.id ? "" : "opacity-60 cursor-not-allowed"}`}
                  disabled={!entry.id}
                  title={entry.id ? "" : "Category not found in catalog"}
                >
                  {entry.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-sm space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4 text-left">Contact Us</h4>

          <div className="flex items-start justify-start text-left gap-4">
            <FaMapMarkerAlt className="text-[#ffd700] text-xl shrink-0" />
            <p>
              Paridhra, Shop No: 6, Bhakti Anugan CHS, Plot No. 17A, Sector 12A,<br />
              near FAM Co-Operative Housing Society,<br />
              Kopar Khairane, Navi Mumbai, Maharashtra 400709
            </p>
          </div>

          <div className="flex items-start gap-4 flex-wrap text-left">
            <FaPhoneAlt className="text-[#ffd700] text-xl shrink-0" />
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <a href="tel:+919114519114" className="hover:underline">+91 9114519114</a>
              <span>/</span>
              <a href="tel:+919137399370" className="hover:underline">+91 9137399370</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-[#ffd700] text-xl shrink-0" />
            <a href="mailto:paridhrafashion@gmail.com" className="hover:underline break-all">
              paridhrafashion@gmail.com
            </a>
          </div>

          <div className="text-left">
            <button className="bg-[#ffd900d3] hover:bg-yellow-600 transition text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 mx-auto sm:mx-0"
              onClick={() => navigate("/contact")}>
              Get in Touch <FaArrowRight />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© {new Date().getFullYear()} FashionRent. All rights reserved.</div>
        <div className="space-x-4 text-left">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/returns" className="hover:text-white">Return Policy</Link>
          <Link to="/faq" className="hover:text-white">FAQs</Link>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
