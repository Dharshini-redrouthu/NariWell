import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { wakeUpML } from "./api/mlHealthCheck";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Result from "./pages/Result";
import DailyRoutines from "./pages/DailyRoutines";
import PcosSymptoms from "./pages/PcosSymptoms";
import Contact from "./pages/Contact";

export default function App() {
  useEffect(() => {
    wakeUpML(); // call once on app load
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/result" element={<Result />} />
        <Route path="/daily-routines" element={<DailyRoutines />} />
        <Route path="/pcos-symptoms" element={<PcosSymptoms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
