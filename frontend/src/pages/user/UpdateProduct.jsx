import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Updated to useNavigate

const UpdateProduct = () => {
  const { carId } = useParams();
  const navigate = useNavigate(); // Updated to useNavigate

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: { car_type: "", company: "", dealer: "" },
    images: [],
    removeImages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [imageToRemove, setImageToRemove] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await axios.get(`/api/products/${carId}`);
        const product = response.data;

        setFormData({
          title: product.title,
          description: product.description,
          tags: product.tags,
          images: product.images,
          removeImages: [],
        });
      } catch (err) {
        setError("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [carId]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        // const { data } = await axios.post("/api/upload", formData, {
        //   headers: { "Content-Type": "multipart/form-data" },
        // });
        imageUrls.push(data.image);
      } catch (err) {
        setError("Image upload failed");
      }
    }

    setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("tags")) {
      const tagName = name.split(".")[1];
      setFormData({
        ...formData,
        tags: { ...formData.tags, [tagName]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = (image) => {
    setFormData({
      ...formData,
      removeImages: [...formData.removeImages, image],
    });

    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== image),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tags, images, removeImages } = formData;

    if (!title || !description || !tags.car_type || !tags.company || !tags.dealer) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`/api/products/${carId}`, { ...formData, removeImages });
      setLoading(false);
      navigate(`/products/${carId}`);  // Updated to use navigate
    } catch (err) {
      setLoading(false);
      setError("Failed to update product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter car title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter car description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="car_type" className="block text-lg mb-2">Car Type</label>
            <input
              type="text"
              id="car_type"
              name="tags.car_type"
              value={formData.tags.car_type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter car type"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-lg mb-2">Company</label>
            <input
              type="text"
              id="company"
              name="tags.company"
              value={formData.tags.company}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter car company"
              required
            />
          </div>
          <div>
            <label htmlFor="dealer" className="block text-lg mb-2">Dealer</label>
            <input
              type="text"
              id="dealer"
              name="tags.dealer"
              value={formData.tags.dealer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter car dealer"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-lg mb-2">Upload Images (Max 10)</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageUpload}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            accept="image/*"
          />
        </div>

        {/* Image Previews and Removal */}
        <div className="mb-6">
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Car image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-sm"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-orange-400 text-black font-bold rounded-md"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
