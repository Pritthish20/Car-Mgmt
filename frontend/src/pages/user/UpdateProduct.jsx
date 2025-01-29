import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSpecificProductQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../redux/api/productApi";

const UpdateProduct = () => {
  const { pId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: { car_type: "", company: "", dealer: "" },
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPreviewImages, setSelectedPreviewImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  const { data: product } = useGetSpecificProductQuery(pId);
  const [updateProduct] = useUpdateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        tags: product.tags,
        images: product.images,
      });
    }
  }, [product]);

  const handleImageSelected = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...files]);
    setSelectedPreviewImages((prev) => [...prev, ...previewUrls]);
  };

  const handleRemoveImage = (image) => {
    setRemoveImages((prev) => [...prev, image]);
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== image),
    });
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
      !formData.tags.dealer
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Handle image uploads if any
      let uploadedImages = [];
      if (selectedImages.length > 0) {
        const imageForm = new FormData();
        selectedImages.forEach((file) => {
          imageForm.append("images", file);
        });

        const response = await uploadImage(imageForm).unwrap();
        uploadedImages = response.images;
      }

      const updatedProductData = {
        ...formData,
        images: [...formData.images, ...uploadedImages],
        removeImages,
      };
      console.log(updatedProductData);
      console.log(pId);


      await updateProduct({ id:pId, updatedProduct:{...updatedProductData} }).unwrap();
      toast.success("Product updated successfully!");
      setLoading(false);
      navigate(`/products/${pId}`);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to update product.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
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
          <label htmlFor="description" className="block text-lg mb-2">
            Description
          </label>
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
            <label htmlFor="car_type" className="block text-lg mb-2">
              Car Type
            </label>
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
            <label htmlFor="company" className="block text-lg mb-2">
              Company
            </label>
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
            <label htmlFor="dealer" className="block text-lg mb-2">
              Dealer
            </label>
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
          <label htmlFor="images" className="block text-lg mb-2">
            Upload Images (Max 10)
          </label>
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

        {/* Existing Images */}
        <div className="mb-4">
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
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
