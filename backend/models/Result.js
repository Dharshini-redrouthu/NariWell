import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  input: { type: Object, required: true },
  prediction: { type: String, required: true },
  probability: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Result", ResultSchema);
