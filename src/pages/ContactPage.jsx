import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
    return (
        <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
            <Navbar />
            {/* Header Section */}
            <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-black">Get in Touch</h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    We're here to help with any questions about our rental clothing, services, or partnerships.
                </p>
            </section>

            {/* Contact Info & Form */}
            <section className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 ">
                {/* Contact Details */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Contact Information</h2>
                    <p className="text-gray-600">
                        Feel free to reach out to us via phone or email. We typically respond within 24 hours.
                    </p>
                    <div className="space-y-3">
                        <p><strong>Address:</strong> Paridhra,Shop No:6, Bhakti Anugan CHS, Plot No. 17A, Sector 12A, near FAM CO-OPERATIVE HOUSING SOCIETY, Kopar Khairane, Navi Mumbai, Maharashtra 400709</p>
                        <p>
                            <strong>Phone:</strong>{" "}
                            <a href="tel:+919114519114" className="text-blue-600 hover:underline">
                                +91 9114519114
                            </a>{" "}
                            /{" "}
                            <a href="tel:+919137399370" className="text-blue-600 hover:underline">
                                +91 9137399370
                            </a>
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            <a href="mailto:paridhrafashion@gmail.com" className="text-purple-600 hover:underline">
                                paridhrafashion@gmail.com
                            </a>
                        </p>
                        <p><strong>Hours:</strong> Mon - Sat, 10:00 AM - 8:00 PM</p>
                    </div>
                </div>

                {/* Contact Form */}
                <form
                    action="https://formsubmit.co/paridhrafashion@gmail.com"
                    method="POST"
                    className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4"
                >
                    <h2 className="text-2xl font-semibold mb-2 dark:text-black">Send Us a Message</h2>

                    {/* Hidden Fields */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input
                        type="hidden"
                        name="_autoresponse"
                        value="Thank you for contacting RentStyle. We’ll get back to you soon!"
                    />

                    {/* Input Fields */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-3 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full p-3 border border-gray-300 rounded"
                        required
                    />
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="Your Message"
                        className="w-full p-3 border border-gray-300 rounded"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold py-3 rounded hover:bg-purple-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </section>

            {/* Google Map */}
            <section className="mt-16">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2729095786217!2d73.00569477395162!3d19.09567985135683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1135e743e9b%3A0xc05722ecf90d00fb!2sParidhra%20-%20The%20House%20of%20Fashion!5e0!3m2!1sen!2sin!4v1752664681018!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </section>
            <Footer />
        </div>
    );
}
