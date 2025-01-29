import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: { car_type: "", company: "", dealer: "" },
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const { data } = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrls.push(data.image);
      } catch (err) {
        setError("Image upload failed");
      }
    }

    setFormData({ ...formData, images: imageUrls });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tags, images } = formData;

    if (!title || !description || !tags.car_type || !tags.company || !tags.dealer || images.length === 0) {
      setError("Please fill in all fields and upload images.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/products", formData);
      console.log("Product created", response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to create product.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Product</h2>
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

        <div className="mb-6">
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {formData.images.map((image, index) => (
                <img key={index} src={image} alt={`Car image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
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
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
