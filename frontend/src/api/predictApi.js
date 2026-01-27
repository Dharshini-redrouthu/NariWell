// frontend/src/api/predictApi.js
export async function predictPCOS(formData) {
  const response = await fetch(
    "https://nariwell-backend.onrender.com/api/predict", // deployed backend
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error("Backend error:", errText);
    throw new Error("Prediction failed");
  }

  return response.json();
}
