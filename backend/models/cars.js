import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    car_type: { type: String, trim: true },
    company: { type: String, trim: true },
    dealer: { type: String, trim: true }
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  
},{timestamp: true});

const Car = mongoose.model("Car", CarSchema);

export default Car;
