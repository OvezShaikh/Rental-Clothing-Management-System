import React from 'react';
import { images } from "../constants/images";

export default function FeatureSection() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-pink-50 py-24 sm:py-32 rounded-lg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-base font-semibold text-indigo-600">Why Choose FashionRent</h2>
        <p className="mx-auto mt-2 max-w-3xl text-balance text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Style, Convenience & Confidence in Every Wear
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {/* Mobile Friendly */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-3xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-l-3xl">
              <div className="px-8 pt-10">
                <h3 className="text-xl font-semibold text-gray-900">Mobile Friendly</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Our platform is optimized for any device. Browse, rent, and manage your outfits easily from your mobile, tablet, or desktop.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[3rem] border-4 border-gray-300 bg-gray-900 shadow-xl">
                  <img
                    alt="Mobile interface"
                    src={images.brownjacket}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-black/5 lg:rounded-l-3xl" />
          </div>

          {/* Performance */}
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-3xl" />
            <div className="relative flex flex-col h-full overflow-hidden rounded-lg max-lg:rounded-t-3xl">
              <div className="px-8 pt-10">
                <h3 className="text-xl font-semibold text-gray-900">Fast Delivery</h3>
                <p className="mt-3 text-sm text-gray-600">
                  We deliver your outfits quickly and on-time, anywhere in India. Early bookings or last-minute, we’ve got you covered.
                </p>
              </div>
              <div className="flex justify-center items-center py-6">
                <img
                  alt="Delivery"
                  src={images.img2}
                  className="w-full max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-black/5 max-lg:rounded-t-3xl" />
          </div>

          {/* Secure Payments */}
          <div className="relative lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex flex-col h-full overflow-hidden rounded-lg">
              <div className="px-8 pt-10">
                <h3 className="text-xl font-semibold text-gray-900">Secure Payments</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Shop with confidence. Our payment gateways are encrypted and trusted for a safe and secure checkout experience.
                </p>
              </div>
              <div className="flex justify-center items-center py-6">
                <img
                  alt="Secure Payments"
                  src={images.img3}
                  className="h-56 object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-black/5" />
          </div>

          {/* Smart Rental System */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-3xl lg:rounded-r-3xl" />
            <div className="relative flex flex-col h-full overflow-hidden rounded-lg max-lg:rounded-b-3xl lg:rounded-r-3xl">
              <div className="px-8 pt-10">
                <h3 className="text-xl font-semibold text-gray-900">Smart Rental System</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Schedule rentals by date, occasion, and duration. Our system manages your timeline, delivery, and returns automatically.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute top-10 bottom-0 left-10 right-0 overflow-hidden rounded-tl-2xl bg-gray-900 shadow-xl">
                  {/* <div className="h-full flex items-center justify-center px-6"> */}
                    <img
                      alt="Rental dashboard"
                      src={images.cremejacket}
                      className="w-full h-full object-cover items-center"
                    />
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-black/5 max-lg:rounded-b-3xl lg:rounded-r-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
