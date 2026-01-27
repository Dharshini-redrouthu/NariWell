// frontend/src/pages/Result.jsx
import { useLocation, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "../styles/Result.css";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.data) {
    return (
      <PageWrapper>
        <div className="result-container">
          <h1>Prediction Result</h1>
          <p>No result available.</p>
          <button onClick={() => navigate("/predict")}>Go Back</button>
        </div>
      </PageWrapper>
    );
  }

  const { prediction, probability } = state.data;

  return (
    <PageWrapper>
      <div className="result-container">
        <h1>Prediction Result</h1>
        <div className="result-card">
          <h2>{prediction}</h2>
          <p>Confidence: {probability ? probability.toFixed(1) + "%" : "N/A"}</p>
        </div>
        <button onClick={() => navigate("/predict")}>Test Again</button>
      </div>
    </PageWrapper>
  );
}
