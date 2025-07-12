import DashboardLayout from "../components/DashboardLayout";
import { images } from "../constants/images";

export default function Catalog() {
  const products = [
    { id: 1, name: "Evening Gown", image: images.gown, price: "₹799" },
    { id: 2, name: "Saree", image: images.saree, price: "₹499" },
    { id: 3, name: "Tuxedo", image: images.tuxedo, price: "₹999" },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-pink-600 font-semibold">{item.price}</p>
            <button className="mt-2 px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600">
              Rent Now
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
