import React from 'react';

function ProductCard({ product }) {
  const { code, name, productType, price } = product;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img src={product.image} alt={name} className="w-full h-64 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="text-sm mb-2">{productType}</div>
        <div className="text-gray-700 text-base">Price: ${price}</div>
      </div>
      <div className="px-6 pb-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
          Add to Cart
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
