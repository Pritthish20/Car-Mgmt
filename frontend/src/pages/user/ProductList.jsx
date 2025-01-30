import React from "react";
import { useGetAllProductQuery } from "../../redux/api/productApi"; // RTK Query hook
import ProductCard from "../../components/ProductCard"; // Assuming ProductCard is the component we created earlier
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // Import Link for navigation

const ProductList = () => {
  const { data: products, error, isLoading } = useGetAllProductQuery();
  console.log(products);

  // Handle errors
  if (error) {
    toast.error("Failed to load products.");
  }


  

  return (
    <div className="p-6">
      {/* Loading state */}
      {isLoading ? (
        <div className="text-center text-white">Loading products...</div>
      ) : (
        <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6"> 
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-center text-white">
              <p>No products available.</p>
              {/* Add a link to create a product */}
              <Link
                to="/create-product"  // Assuming '/create-product' is your path for creating a product
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
