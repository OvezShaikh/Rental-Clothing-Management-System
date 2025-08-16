import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { images } from "../constants/images";

export default function About() {
    return (
        <>
            <Navbar />
            <main className="bg-white min-h-screen flex flex-col items-center text-gray-800 dark:bg-gray-800 dark:text-white">
                {/* Hero Section */}
                <section className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-6">
                        About Us
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto dark:text-white">
                        Welcome to your wardrobe on demand — where fashion meets flexibility.
                    </p>
                </section>

                {/* Mission Section */}
                <section className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10 items-center">
                    <img
                        src={images.cremejacket}
                        alt="Our Mission"
                        className="rounded-lg shadow-lg w-full object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-500 mb-4">Our Mission</h2>
                        <p className="text-base leading-relaxed text-gray-700 dark:text-white">
                            Our mission is to redefine fashion accessibility in a world where style is often seen as a luxury. We believe that everyone — regardless of background, budget, or body type — should have the opportunity to wear stylish, high-quality outfits for any occasion without the pressure or burden of ownership.

                            By embracing circular fashion, we promote sustainable choices that benefit both your wallet and the planet. With us, there’s no need to compromise between looking good and doing good — you can do both effortlessly.

                            We’re not just here to rent clothing; we’re here to empower self-expression, support sustainability, and build a community where fashion is shared, celebrated, and reimagined.
                        </p>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:order-last ">
                        <img
                            src={images.brownjacket}
                            alt="How It Works"
                            className="rounded-xl shadow-xl w-full object-cover"
                        />
                    </div>

                    <div id="how-it-works" className="lg:w-full text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-500 mb-6">How It Works</h2>
                        <p className="text-base text-gray-600 mb-6 leading-relaxed dark:text-white">
                            Renting with us is <strong>effortless, seamless, and delightful</strong>. We've simplified everything
                            so you can focus on looking great — without the stress of shopping or laundry.
                        </p>

                        <div className="space-y-6 dark:text-white">
                            {[
                                {
                                    step: "1",
                                    title: "Explore Our Curated Collection",
                                    description:
                                        "Browse through ethnic wear, formals, partywear, and everyday looks — all handpicked and categorized for your convenience.",
                                },
                                {
                                    step: "2",
                                    title: "Customize Your Look",
                                    description:
                                        "Select your size, color, and fit with the help of our smart filters and detailed sizing guides.",
                                },
                                {
                                    step: "3",
                                    title: "Schedule Your Rental",
                                    description:
                                        "Pick the rental duration and delivery date that suits your plans — even last-minute options are available.",
                                },
                                {
                                    step: "4",
                                    title: "Wear It With Confidence",
                                    description:
                                        "Every outfit arrives freshly cleaned, steamed, and ready to wear — complete with accessories if applicable.",
                                },
                            ].map(({ step, title, description }) => (
                                <div key={step} className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-indigo-600 text-white dark:text-white flex items-center justify-center font-bold text-lg">
                                            {step}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                                        <p className="text-sm text-gray-700 mt-1 dark:text-white">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Unique Features */}
                <section className="w-full bg-gradient-to-l from-indigo-100 to-white-100 py-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">What Makes Us Unique?</h2>
                        <ul className="text-center text-base text-gray-700 dark:text-white list-disc list-outside pl-6 space-y-3 max-w-2xl mx-auto">
                            <strong>Affordability:</strong> Premium fashion at a fraction of the cost.<span className="block"></span>
                            <strong>Sustainability:</strong> Reduce fashion waste by reusing instead of buying.
                            <span className="block"></span>
                            <strong>Style for Every Occasion:</strong> From sherwanis and gowns to formals and ethnic wear.<span className="block"></span>
                            <strong>Fast Delivery:</strong> Get your outfit delivered when you need it.<span className="block"></span>
                            <strong>Hygienic Guarantee:</strong> Every item is professionally cleaned before and after use.<span className="block"></span>
                        </ul>
                    </div>
                </section>

                {/* Audience Section */}
                <section className="max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-500 mb-4">For Whom Is This?</h2>
                    <p className="text-base leading-relaxed text-gray-700 dark:text-white max-w-2xl mx-auto">
                        Our platform is ideal for working professionals, brides & grooms, students, event attendees, fashion lovers, and anyone looking to save money without compromising on looks. No matter your style or budget — we have something for you.
                    </p>
                </section>

                {/* Vision Section */}
                <section className="w-full px-4 sm:px-6 lg:px-8 py-16 text-center bg-gradient-to-r from-indigo-100 to-white-100">
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Vision</h2>
                    <p className="text-base leading-relaxed text-gray-700 dark:text-white max-w-2xl mx-auto">
                        We envision a world where access to fashion is no longer limited by income or location. A wardrobe that evolves with you — driven by flexibility, sustainability, and inclusivity.
                    </p>
                </section>

                {/* Contact CTA
        <section className="max-w-3xl w-full px-4 sm:px-6 lg:px-8 pb-24 text-center">
          <p className="text-sm text-gray-500">
            Still have questions? <br />
            <span className="text-indigo-600 font-medium">Contact us anytime — we're here to help!</span>
          </p>
        </section> */}
            </main>
            <Footer />
        </>
    );
}
