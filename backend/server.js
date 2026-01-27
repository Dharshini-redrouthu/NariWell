import express from "express";
import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Result from "./models/Result.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------- MongoDB Connection --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// -------------------- Health Check --------------------
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "NariWell Backend Running 🌸" });
});

// -------------------- ML API Call --------------------
const callMLApi = async (payload, retries = 2) => {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const response = await axios.post(
        process.env.ML_API_URL, // e.g., https://nariwell-ml-api.onrender.com/predict
        payload,
        { headers: { "Content-Type": "application/json" }, timeout: 20000 }
      );
      return response.data;
    } catch (err) {
      console.error(`❌ ML API Attempt ${attempt} Failed`);
      if (err.response) console.error(err.response.data);
      else console.error(err.message);
      if (attempt > retries) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
};

// -------------------- Prediction API --------------------
app.post("/api/predict", async (req, res) => {
  try {
    // Convert all inputs to numbers
    const normalizedInput = {};
    Object.keys(req.body).forEach((key) => {
      const cleanKey = key.replace(/\s+/g, " ").trim();
      normalizedInput[cleanKey] = Number(req.body[key]);
    });

    console.log("📤 Input Sent to ML:", normalizedInput);

    // Call ML API
    const mlResponse = await callMLApi(normalizedInput);
    console.log("📥 ML Response:", mlResponse);

    if (!mlResponse || !mlResponse.risk_level) throw new Error("Invalid ML response");

    // Save to MongoDB
    const savedResult = await Result.create({
      input: normalizedInput,
      prediction: mlResponse.risk_level,
      probability: mlResponse.pcos_probability
    });

    res.status(200).json({
      success: true,
      message: "Prediction successful",
      data: savedResult
    });

  } catch (err) {
    console.error("❌ Prediction Error:", err.message);
    res.status(500).json({ success: false, message: "Prediction failed", error: err.message });
  }
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
