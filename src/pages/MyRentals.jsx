import DashboardLayout from "../components/DashboardLayout";

export default function MyRentals() {
  const myRentals = [
    {
      id: 1,
      name: "Designer Lehenga",
      date: "July 5, 2025",
      status: "Active",
      image: "/img/lehenga.jpg",
    },
    {
      id: 2,
      name: "Classic Suit",
      date: "June 20, 2025",
      status: "Returned",
      image: "/img/suit.jpg",
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">My Rentals</h1>
      <div className="space-y-6">
        {myRentals.map((rental) => (
          <div
            key={rental.id}
            className="bg-white rounded-lg shadow-md flex items-center gap-4 p-4"
          >
            <img
              src={rental.image}
              alt={rental.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <h2 className="text-lg font-semibold dark:text-black">{rental.name}</h2>
              <p className="text-gray-500">Rented on: {rental.date}</p>
              <span
                className={`text-sm px-3 py-1 rounded-full inline-block mt-1 ${
                  rental.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {rental.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
