// frontend/src/pages/Predict.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { predictPCOS } from "../api/predictApi";
import { wakeUpML } from "../api/mlHealthCheck";
import "../styles/Predict.css";

const initialState = {
  "Period Length": "",
  "Cycle Length": "",
  Age: "",
  hirsutism_score: "",
  beta_HCG_mean: "",
  AMH: "",
  City: "",
  Overweight: "",
  "loss weight gain / weight loss": "",
  "irregular or missed periods": "",
  "Difficulty in conceiving": "",
  "Acne or skin tags": "",
  "Hair thinning or hair loss": "",
  "Dark patches": "",
  "always tired": "",
  "more Mood Swings": "",
  "exercise per week": "",
  "eat outside per week": "",
  "canned food often": "",
  "relocated city": "",
};

const yesNoFields = [
  "Overweight",
  "loss weight gain / weight loss",
  "irregular or missed periods",
  "Difficulty in conceiving",
  "Acne or skin tags",
  "Hair thinning or hair loss",
  "Dark patches",
  "always tired",
  "more Mood Swings",
  "relocated city",
];

export default function Predict() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    wakeUpML();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allFilled = Object.values(form).every((v) => v !== "" && v !== null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) return;

    setLoading(true);
    try {
      // convert all values to numbers for backend
      const numericForm = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, Number(v)])
      );

      const result = await predictPCOS(numericForm);
      navigate("/result", { state: result });
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="predict-container">
        <h1>PCOS Risk Assessment</h1>
        <form className="predict-form" onSubmit={handleSubmit}>
          {Object.keys(form).map((key) => (
            <div className="field" key={key}>
              <label>{key}</label>
              {yesNoFields.includes(key) ? (
                <select
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              ) : (
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={!allFilled || loading}
            className={allFilled ? "active" : ""}
          >
            {loading ? "Analyzing..." : "Test for PCOS"}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
