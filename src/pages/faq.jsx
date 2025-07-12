import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "What types of vehicles do you offer for rent?",
    answer:
      "We offer a wide range of vehicles including small goods carriers, pickup vans, and large trucks suitable for logistics and transportation needs.",
  },
  {
    question: "How do I make a booking?",
    answer:
      "You can book a vehicle through our website by navigating to the booking page, selecting your preferred vehicle, date, and pickup location.",
  },
  {
    question: "Do I need to provide any documents for renting?",
    answer:
      "Yes, you need to provide a valid government-issued ID and a business GST or transport license if applicable.",
  },
  {
    question: "What are your rental charges?",
    answer:
      "Our rental charges vary based on the type of vehicle and rental duration. Please refer to the pricing section or contact our support team.",
  },
  {
    question: "Is there a cancellation fee?",
    answer:
      "Cancellations made 24 hours before the scheduled time are free of charge. Late cancellations may incur a fee.",
  },
  {
    question: "Can I extend the rental duration?",
    answer:
      "Yes, extensions are possible based on availability. Please contact our support to request an extension.",
  },
];

export default function FAQ() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h2>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
