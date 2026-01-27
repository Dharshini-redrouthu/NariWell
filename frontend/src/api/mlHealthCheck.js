// frontend/src/api/mlHealthCheck.js
export async function wakeUpML() {
  try {
    // Ping the ML API (just / for health check)
    await fetch("https://nariwell-ml-api.onrender.com/");

    // Ping the backend
    await fetch("https://nariwell-backend.onrender.com/");

    console.log("✅ Backend + ML API woken up");
  } catch (err) {
    console.log("⚠️ Wake-up attempt failed:", err.message);
  }
}
