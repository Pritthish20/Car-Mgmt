import React, { useState } from "react";
import { useGetAllProductQuery } from "../../redux/api/productApi"; // RTK Query hook
import ProductCard from "../../components/ProductCard"; // Assuming ProductCard is the component we created earlier
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Import Link for navigation

const ProductList = () => {
  const { data: products, error, isLoading } = useGetAllProductQuery();
  const [searchTerm, setSearchTerm] = useState(""); // Search state to hold the search term

  // Handle errors
  if (error) {
    toast.error("Failed to load products.");
  }

  // Filter products based on the search term (title or tags)
  const filteredProducts = products?.filter((product) => {
    const lowerSearchTerm = searchTerm.toLowerCase(); // Lowercase search term for case-insensitive search
    // Check if title contains the search term or if any tag value contains the search term
    return (
      product.title.toLowerCase().includes(lowerSearchTerm) ||
      Object.values(product.tags).some((value) =>
        value.toLowerCase().includes(lowerSearchTerm)
      )
    );
  });

  return (
    <div className="p-6">
      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          className="p-2 w-full border bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="text-center text-white">Loading products...</div>
      ) : (
        <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="text-center text-white">
              <p>No products found matching your search.</p>
              {/* Add a link to create a product */}
              <Link
                to="/create-product" // Assuming '/create-product' is your path for creating a product
                className="text-orange-400 underline font-bold"
              >
                Add some products
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
