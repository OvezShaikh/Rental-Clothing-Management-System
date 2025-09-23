import React, { useState, useRef } from "react";
import { videos } from "../constants/videos";

export default function InstagramReelsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const videoRef = useRef(null);

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1));

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowButton(true); // show button when paused
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowButton(false); // hide button while playing
    }
  };

  const handleVideoClick = () => {
    // Tap video when playing should toggle visibility of button
    if (isPlaying) {
      setShowButton((prev) => !prev);
    } else {
      togglePlay();
    }
  };

  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-600">
          OUR INSTAGRAM FEED
        </h2>

        {/* ---- Desktop Layout (all videos in a row) ---- */}
        <div className="hidden lg:flex justify-center gap-6">
          {videos.map((video, idx) => (
            <div
              key={idx}
              className="w-[220px] h-[400px] rounded-lg border-2 border-yellow-500 overflow-hidden shadow-lg group relative"
            >
              <video
                src={video}
                muted
                loop
                className="w-full h-full object-cover"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
              />
            </div>
          ))}
        </div>

        {/* ---- Mobile/Tablet Layout (carousel) ---- */}
        <div className="lg:hidden flex justify-center items-center p-4 object-cover">
          <div className="w-[360px] h-[640px] rounded-lg border-2 border-yellow-500 overflow-hidden shadow-lg relative">
            <video
              key={current}
              ref={videoRef}
              src={videos[current]}
              muted
              className="w-full h-full object-cover"
              onClick={handleVideoClick} // tapping video toggles button visibility
            />

            {/* Custom Play/Pause Button */}
            {showButton && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex justify-center items-center text-white"
              >
                {isPlaying ? (
                  // Pause Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 bg-black/50 rounded-full p-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6"
                    />
                  </svg>
                ) : (
                  // Play Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 bg-black/50 rounded-full p-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Buttons only for mobile/tablet */}
        <div className="lg:hidden flex justify-center mt-6 space-x-4">
          <button
            onClick={handlePrev}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-full shadow-md"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-full shadow-md"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
