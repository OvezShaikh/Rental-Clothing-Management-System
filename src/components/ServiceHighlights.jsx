import { FaTruck, FaUndo, FaTags, FaCheckCircle, FaStore, FaMoneyBillWave } from "react-icons/fa";

export default function ServiceHighlights() {
  return (
    <section className="bg-gray-200 dark:bg-black py-12 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Buttons */}
        {/* <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200">
            ON DEMAND
          </button>
          <button className="bg-pink-700 text-white py-2 px-6 rounded-md hover:bg-pink-800 transition dark:bg-pink-500 dark:hover:bg-pink-400">
            FASHION SUBSCRIPTION
          </button>
        </div> */}

        {/* Highlights */}
        <div className="grid grid-cols-6 gap-2 text-center">
          <div className="flex flex-col items-center">
            <FaTruck className="text-xl md:text-3xl mb-1 text-gray-700 dark:text-gray-300" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100">
              Pan India Delivery
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaMoneyBillWave className="text-xl md:text-3xl mb-1 text-gray-700 dark:text-gray-300" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100">
              COD (Partial Advance)
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaStore className="text-xl md:text-3xl mb-1 text-gray-700 dark:text-gray-300" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100">
              In-Store Trial
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaUndo className="text-xl md:text-3xl mb-1 text-gray-700 dark:text-gray-300" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100">
              Easy Returns
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaTags className="text-xl md:text-3xl mb-1 text-gray-700 dark:text-gray-300" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100">
              Free Shipping
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-xl md:text-3xl mb-1 text-gray-700 dark:text-gray-300" />
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-800 dark:text-gray-100">
              Quality Check
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
