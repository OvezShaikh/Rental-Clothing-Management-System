import { images } from "../constants/images";

export default function RentalProcess() {
  const steps = [
    "Bookings via physical stores and website",
    "Doorstep delivery and pickup across 30+ cities",
    "4 day rentals at 1/10th of the M.R.P.",
    "In-store trials and customisations",
  ];

  return (
    <section
      className="relative px-4 py-8 md:py-0 h-full bg-cover bg-center text-gray-800 dark:text-white"
      style={{
        // backgroundImage: `url(${images.paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#ffd769",
      }}
    >
      <div className="max-w-7xl mx-auto relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">

        {/* Right Heading (comes first on mobile) */}
        <div className="flex justify-center items-center text-center md:text-right md:item-center md:justify-center md:mb-4 order-1 md:order-3">
          <h2>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#4A2E1E] font-playfair tracking-wide">
              RENTAL
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-light text-[#4A2E1E] font-playfair mt-2">
              Process
            </span>
          </h2>
        </div>

        {/* Center Image */}
        <div className="flex justify-center order-2">
          <img
            src={images.ai8}
            alt="Rental Process"
            className="
  w-full
  sm:w-[400px] sm:h-[120px] sm:py-0
  md:w-[300px] md:h-[300px] md:mt-4 md:mb-4
  lg:w-[240px] lg:h-[360px]
  object-cover 
  relative 
  z-10
"
          />
        </div>

        {/* Left Side - Steps (comes last on mobile) */}
        <div className="flex flex-col items-center mt-4 mb-4 md:items-start space-y-4 order-3 md:order-1">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-md px-3 py-2 shadow w-full max-w-xs sm:max-w-sm"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e4d4b4] text-gray-800 font-semibold mr-4 text-sm sm:text-base">
                {index + 1}
              </span>
              <p className="text-gray-900 text-sm sm:text-base font-medium">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
