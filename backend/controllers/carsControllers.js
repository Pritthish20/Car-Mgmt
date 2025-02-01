import Cars from '../models/cars.js'
import { v2 as cloudinary } from 'cloudinary';

export const createProduct=async(req,res)=>{
    try {
        const { title, description, tags, images } = req.body;
    
        if (!title || !description || !images || images.length > 10) {
          return res.status(400).json({ error: "Invalid car data" });
        }
    
        const newCar = new Cars({
          user: req.user._id,
          title,
          description,
          tags,
          images,
        });
    
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const updateProduct=async(req,res)=>{
  try {
    const { carId } = req.params;
    const { title, description, tags, images, removeImages } = req.body;

    // Find the car in the database (and ensure it's owned by the logged-in user)
    const car = await Cars.findOne({ _id: carId, user: req.user._id });
    if (!car) return res.status(404).json({ error: "Car not found or unauthorized" });

    // Update the car's title, description, and tags
    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) {
      try {
        car.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (err) {
        return res.status(400).json({ error: "Invalid tags format" });
      }
    }

    // 🔹 Handle Image Removal (If user wants to remove specific images)
    if (removeImages) {
      try {
        const imagesToRemove = typeof removeImages === "string" ? JSON.parse(removeImages) : removeImages;
        if (!Array.isArray(imagesToRemove)) {
          return res.status(400).json({ error: "Invalid removeImages format. It must be an array." });
        }

        // Remove images from Cloudinary
        for (const imageUrl of imagesToRemove) {
          const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
          await cloudinary.uploader.destroy(`Car-Mgmt/${publicId}`);
        }

        // Remove the images from the car's image list
        car.images = car.images.filter(image => !imagesToRemove.includes(image));
      } catch (err) {
        return res.status(400).json({ error: "Error removing images." });
      }
    }

    // 🔹 Handle Image Addition (If user uploads new images)
    if (images) {
      try {
        const newImages = typeof images === "string" ? JSON.parse(images) : images;
        if (!Array.isArray(newImages)) {
          return res.status(400).json({ error: "Images must be an array" });
        }

        // Append new images while ensuring a maximum of 10 images
        car.images = [...car.images, ...newImages].slice(-10);
      } catch (err) {
        return res.status(400).json({ error: "Invalid images format" });
      }
    }

    // 🔹 Handle Edge Case: If All Images are Removed, Allow Empty List
    if (car.images.length === 0) {
      car.images = []; // Allow empty images list
    }

    // Save the updated car document
    const updatedCar = await car.save();
    res.status(200).json(updatedCar);

  } catch (error) {
    console.error("Update failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const allProducts=async(req,res)=>{
    try {
        const cars = await Cars.find({ user: req.user._id });
        res.status(200).json(cars);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const specificProduct=async(req,res)=>{
    try {
        const { carId } = req.params;
    
        const car = await Cars.findOne({ _id: carId, user: req.user._id });
        if (!car) return res.status(404).json({ error: "Car not found or unauthorized" });
    
        res.status(200).json(car);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const deleteProduct=async(req,res)=>{
    try {
        const { carId } = req.params;

        // Find the car
        const car = await Cars.findOne({ _id: carId, user: req.user._id });
        if (!car) return res.status(404).json({ error: "Car not found or unauthorized" });

        // Delete images from Cloudinary
        if (car.images && car.images.length > 0) {
            for (const imageUrl of car.images) {
                const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract publicId from URL
                await cloudinary.uploader.destroy(`Car-Mgmt/${publicId}`);
            }
        }
    
        await Cars.findOneAndDelete({ _id: carId, user: req.user._id });
    
        res.status(200).json({ message: "Car deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}