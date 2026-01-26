from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
import requests
from io import BytesIO

app = Flask(__name__)

# -----------------------------
# S3 URLs for your models
# -----------------------------
MODEL_URL = "https://nariwell-ml-models.s3.ap-south-1.amazonaws.com/pcos_model.pkl"
SCALER_URL = "https://nariwell-ml-models.s3.ap-south-1.amazonaws.com/scaler.pkl"

def load_from_s3(url):
    """Load a joblib object directly from S3 URL"""
    response = requests.get(url)
    response.raise_for_status()
    return joblib.load(BytesIO(response.content))

# Load models from S3
model = load_from_s3(MODEL_URL)
scaler = load_from_s3(SCALER_URL)

# -----------------------------
# Features and scoring setup
# -----------------------------
EXPECTED_FEATURES = [
    "Period Length","Cycle Length","Age","hirsutism_score",
    "beta_HCG_mean","AMH","City","Overweight",
    "loss weight gain / weight loss","irregular or missed periods",
    "Difficulty in conceiving","Acne or skin tags",
    "Hair thinning or hair loss","Dark patches","always tired",
    "more Mood Swings","exercise per week","eat outside per week",
    "canned food often","relocated city"
]

FEATURE_WEIGHTS = {
    "irregular or missed periods": 0.25,
    "hirsutism_score": 0.25,
    "AMH": 0.25,
    "Age": 0.15,
    "Overweight": 0.10
}

PROB_MIN = 0.05
PROB_MAX = 0.95

# -----------------------------
# Helper functions
# -----------------------------
def feature_score(data):
    """Weighted sum of key features with min-max normalization."""
    feature_ranges = {
        "irregular or missed periods": (0, 2),
        "hirsutism_score": (0, 2),
        "AMH": (0.5, 5),
        "Age": (15, 40),
        "Overweight": (0, 1)
    }
    score = 0
    for f, w in FEATURE_WEIGHTS.items():
        x = data[f]
        min_val, max_val = feature_ranges[f]
        x_norm = (x - min_val) / (max_val - min_val)
        x_norm = min(max(x_norm, 0), 1)
        score += x_norm * w
    return score

def sigmoid(x, k=6):
    """Sigmoid scaling to spread probabilities."""
    return 1 / (1 + np.exp(-k*(x - 0.5)))

# -----------------------------
# Routes
# -----------------------------
@app.route("/")
def home():
    return "NariWell PCOS Risk Prediction API is running."

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Validate input
        for f in EXPECTED_FEATURES:
            if f not in data:
                return jsonify({"error": f"Missing feature: {f}"}), 400

        # Convert to DataFrame
        df_input = pd.DataFrame([{f: float(data[f]) for f in EXPECTED_FEATURES}])
        df_input = df_input[EXPECTED_FEATURES]

        # Scale features
        features_scaled = scaler.transform(df_input)

        # Model probability
        prob_model = model.predict_proba(features_scaled)[0][1]

        # Feature-based score (dominates)
        score_norm = feature_score(data)

        # Combine probabilities (feature score dominates)
        combined_prob = 0.7 * score_norm + 0.3 * prob_model

        # Percentile normalization
        final_prob = (combined_prob - PROB_MIN) / (PROB_MAX - PROB_MIN)
        final_prob = min(max(final_prob, 0), 1)

        # Sigmoid scaling
        final_prob = sigmoid(final_prob)

        # Risk thresholds
        if final_prob < 0.33:
            risk = "Low Risk"
        elif final_prob < 0.66:
            risk = "Moderate Risk"
        else:
            risk = "High Risk"

        return jsonify({
            "pcos_probability": round(float(final_prob), 3),
            "risk_level": risk,
            "message": "This is a risk prediction, not a medical diagnosis."
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)
