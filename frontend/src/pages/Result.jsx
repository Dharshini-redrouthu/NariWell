import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "../styles/Result.css";

export default function Result() {
  const { state } = useLocation();

  return (
    <PageWrapper>
      <div className="result-container">
        <h2 className="result-title">Prediction Result</h2>

        <div className="result-card">
          <div className="result-value">
            {state?.prediction || "No Result"}
          </div>

          <div className="confidence">
            Confidence: {state?.confidence || "N/A"}%
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
