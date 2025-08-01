import { FaTruck, FaUndo, FaTags, FaCheckCircle, FaStore, FaMoneyBillWave } from "react-icons/fa";

export default function ServiceHighlights() {
  return (
    <section className="bg-gray-200 dark:bg-gray-800 py-8 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200">
            ON DEMAND
          </button>
          <button className="bg-pink-700 text-white py-2 px-6 rounded-md hover:bg-pink-800 transition dark:bg-pink-500 dark:hover:bg-pink-400">
            FASHION SUBSCRIPTION
          </button>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div className="flex flex-col items-center">
            <FaTruck className="text-2xl mb-2 text-gray-700 dark:text-gray-300" />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Pan India Delivery</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMoneyBillWave className="text-2xl mb-2 text-gray-700 dark:text-gray-300" />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">COD (Partial Advance)</p>
          </div>
          <div className="flex flex-col items-center">
            <FaStore className="text-2xl mb-2 text-gray-700 dark:text-gray-300" />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">In-Store Trial</p>
          </div>
          <div className="flex flex-col items-center">
            <FaUndo className="text-2xl mb-2 text-gray-700 dark:text-gray-300" />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Easy Returns</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTags className="text-2xl mb-2 text-gray-700 dark:text-gray-300" />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Free Shipping</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-2xl mb-2 text-gray-700 dark:text-gray-300" />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Quality Check</p>
          </div>
        </div>
      </div>
    </section>
  );
}
