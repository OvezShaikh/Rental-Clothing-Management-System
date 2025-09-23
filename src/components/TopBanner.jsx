import { useEffect, useRef } from "react";

export default function TopBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    let scrollAmount = 0;

    const scrollText = () => {
      scrollAmount -= 1; // speed (increase/decrease value to adjust speed)
      if (Math.abs(scrollAmount) >= banner.scrollWidth / 2) {
        scrollAmount = 0; // reset when half has scrolled
      }
      banner.style.transform = `translateX(${scrollAmount}px)`;
      requestAnimationFrame(scrollText);
    };

    requestAnimationFrame(scrollText);
  }, []);

  return (
    <div className="w-full bg-white py-2 overflow-hidden relative shadow-md border-b border-yellow-300/40">
      <div
        ref={bannerRef}
        className="whitespace-nowrap flex text-base font-semibold tracking-wide uppercase"
        style={{ willChange: "transform", color: "#d4af37" }} // gold color
      >
        <span className="mx-10 drop-shadow-sm font-playfair">
          ✨ More variety & trials await in-store. ✨
        </span>
        <span className="mx-10 drop-shadow-sm font-playfair">
          ✨ More variety & trials await in-store. ✨
        </span>
        <span className="mx-10 drop-shadow-sm font-playfair">
          ✨ More variety & trials await in-store. ✨
        </span>
        <span className="mx-10 drop-shadow-sm font-playfair">
          ✨ More variety & trials await in-store. ✨
        </span>
        <span className="mx-10 drop-shadow-sm font-playfair">
          ✨ More variety & trials await in-store. ✨
        </span>
      </div>
    </div>
  );
}
