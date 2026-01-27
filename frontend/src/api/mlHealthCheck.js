export async function wakeUpML() {
  try {
    await fetch("https://nariwell-ml-api.onrender.com/health");
  } catch (err) {
    console.log("ML API wake-up attempt");
  }
}
