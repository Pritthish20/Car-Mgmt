import { useParams, useNavigate } from "react-router-dom";
import { useGetSpecificProductQuery } from "../../redux/api/productApi";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "../../redux/api/productApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const ProductDetail = () => {
  const { pId } = useParams();
  const navigate = useNavigate();
  const { data: product } = useGetSpecificProductQuery(pId);
  const [deleteProduct] = useDeleteProductMutation();

  const handleUpdate = () => {
    navigate(`/update-product/${pId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(pId);
      toast.success("Product deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete product");
      console.log(err);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-800 text-white rounded-md shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        {/* Carousel Section */}
        <div className="lg:col-span-2">
          <Slider {...settings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-md"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product Info and Buttons */}
        <div className="flex flex-col lg:flex-row w-full mt-8 lg:mt-0">
          {/* Product Info Section */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-lg">{product.description}</p>
            <div>
              <h3 className="text-xl font-semibold">Tags</h3>
              <ul className="mt-2">
                <li className="text-lg">
                  <strong>Car Type: </strong>
                  <span>{product.tags?.car_type || "N/A"}</span>
                </li>
                <li className="text-lg">
                  <strong>Company: </strong>
                  <span>{product.tags?.company || "N/A"}</span>
                </li>
                <li className="text-lg">
                  <strong>Dealer: </strong>
                  <span>{product.tags?.dealer || "N/A"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex-shrink-0 ml-auto w-full lg:w-1/4 space-y-4 mt-4 lg:m-10 lg:mt-0">
            <button
              onClick={handleUpdate}
              className="w-full py-3 bg-orange-400 text-black font-bold rounded-md"
            >
              Update Product
            </button>
            <button
              onClick={handleDelete}
              className="w-full py-3 bg-red-500 text-white font-bold rounded-md"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
