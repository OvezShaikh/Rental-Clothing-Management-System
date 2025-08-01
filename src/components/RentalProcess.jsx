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
      className="relative py-0 px-4 h-auto bg-cover bg-center text-gray-800 dark:text-white"
      style={{
        backgroundImage: `url(${images.paperTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto relative grid grid-cols-3 items-center">
        {/* Left Side - Steps */}
        <div className="flex flex-col items-start space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-md px-4 py-3 shadow w-full max-w-sm"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e4d4b4] text-gray-800 font-semibold mr-4">
                {index + 1}
              </span>
              <p className="text-gray-900 text-base font-medium">{step}</p>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="flex justify-center">
          <img
            src={images.rentalprocessimg}
            alt="Rental Process"
            className="max-w-xs md:max-w-sm lg:max-w-md object-contain relative z-10"
          />
        </div>

        {/* Right Heading */}
        <div className="flex justify-center items-center">
          <h2 className="text-right">
            <span className="block text-7xl font-extrabold text-[#4A2E1E] font-playfair tracking-wide">
              RENTAL
            </span>
            <span className="block text-4xl text-start font-light text-[#4A2E1E] font-playfair">
              Process
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
