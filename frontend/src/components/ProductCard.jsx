import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, description, tags, images, price } = product;

  return (
    <Link to={`/products/${product._id}`} className="max-w-2xl mx-auto p-4 bg-gray-800 text-white rounded-md shadow-md flex flex-col justify-evenly h-full">
      {/* Product Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Product Image */}
      <div className="mb-4">
        {images && images.length > 0 ? (
          <img
            src={images[0]} // Display only the first image
            alt="Product Image"
            className="w-full h-80 w object-contain rounded-md"
          />
        ) : (
          <div className="w-full h-80 bg-gray-700 rounded-md"></div>
        )}
      </div>

      {/* Product Description */}
      <p className="mb-4 text-sm">{description.substring(0,33)}</p>

      {/* Product Tags */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center bg-gray-700 p-2 rounded-md">
          <span className="font-bold">Car Type</span>
          <p>{tags.car_type}</p>
        </div>
        <div className="text-center bg-gray-700 p-2 rounded-md">
          <span className="font-bold">Company</span>
          <p>{tags.company}</p>
        </div>
        <div className="text-center bg-gray-700 p-2 rounded-md">
          <span className="font-bold">Dealer</span>
          <p>{tags.dealer}</p>
        </div>
      </div>

      {/* Action Button */}
      <Link to={`/products/${product._id}`} className="w-full py-2 bg-orange-400 text-black font-bold rounded-md text-center">
        View Details
      </Link>
    </Link>
  );
};


export default ProductCard;
