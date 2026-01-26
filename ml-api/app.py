from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model & scaler
model = joblib.load("pcos_model.pkl")
scaler = joblib.load("scaler.pkl")

# Expected features
EXPECTED_FEATURES = [
    "Period Length","Cycle Length","Age","hirsutism_score",
    "beta_HCG_mean","AMH","City","Overweight",
    "loss weight gain / weight loss","irregular or missed periods",
    "Difficulty in conceiving","Acne or skin tags",
    "Hair thinning or hair loss","Dark patches","always tired",
    "more Mood Swings","exercise per week","eat outside per week",
    "canned food often","relocated city"
]

# Feature weights for DSA scoring (dominates for realistic predictions)
FEATURE_WEIGHTS = {
    "irregular or missed periods": 0.25,
    "hirsutism_score": 0.25,
    "AMH": 0.25,
    "Age": 0.15,
    "Overweight": 0.10
}

# Adjusted min/max for percentile normalization
PROB_MIN = 0.05  # low bound for normal patients
PROB_MAX = 0.95  # high bound for high-risk patients

@app.route("/")
def home():
    return "NariWell PCOS Risk Prediction API is running."

def feature_score(data):
    """
    Weighted sum of key features with min-max normalization.
    Returns a value in [0,1].
    """
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
    return score  # in 0-1

def sigmoid(x, k=6):
    """Optional sigmoid scaling to spread probabilities"""
    return 1 / (1 + np.exp(-k*(x - 0.5)))

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

        # Sigmoid scaling to spread probabilities
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

if __name__ == "__main__":
    app.run(debug=True)
