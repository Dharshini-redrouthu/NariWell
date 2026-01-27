import "./RiskCard.css";

export default function RiskCard({ data, username }) {
  return (
    <div className="risk-card">
      <h3>{username}, your PCOS Risk</h3>
      <h1>{data.prediction}</h1>
      <p>Probability: {(data.probability * 100).toFixed(1)}%</p>
    </div>
  );
}
