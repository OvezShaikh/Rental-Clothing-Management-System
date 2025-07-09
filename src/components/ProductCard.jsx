import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onImageHoverEnter, onImageHoverLeave }) {
  return (
    <div className="w-64 border rounded-md overflow-hidden shadow hover:shadow-lg transition">
      <div
        onMouseEnter={onImageHoverEnter}
        onMouseLeave={onImageHoverLeave}
        className="w-full h-72 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-medium text-indigo-600">Rent ₹{product.rent}</p>
      </div>
    </div>
  );
}

