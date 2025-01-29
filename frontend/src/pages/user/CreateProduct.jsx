import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateProductMutation, useUploadImageMutation } from "../../redux/api/productApi";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: { car_type: "", company: "", dealer: "" },
  });

  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPreviewImages, setSelectedPreviewImages] = useState([]);

  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const handleImageSelected = async (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...files]);
    setSelectedPreviewImages((prev) => [...prev, ...previewUrls]);
  };

  const handleRemoveSelectedImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...selectedPreviewImages];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedImages(updatedImages);
    setSelectedPreviewImages(updatedPreviews);
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

    if (
      !formData.title ||
      !formData.description ||
      !formData.tags.car_type ||
      !formData.tags.company ||
      !formData.tags.dealer ||
      selectedImages.length === 0
    ) {
      toast.error("Please fill in all fields and upload images.");
      return;
    }

    try {
      setLoading(true);
      const imageForm = new FormData();
      selectedImages.forEach((file) => {
        imageForm.append("images", file);
      });

      const response = await uploadImage(imageForm).unwrap();
      const imageUrls = response.images;

      await createProduct({ ...formData, images: imageUrls }).unwrap();
      toast.success("Product created successfully!");
      setLoading(false);
      navigate("/");
    } catch (err) {
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Product</h2>

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
            onChange={handleImageSelected}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
            accept="image/*"
          />
        </div>

        {/* Selected Image Previews */}
        <div className="mb-6">
          {selectedPreviewImages.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {selectedPreviewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveSelectedImage(index)}
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
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
