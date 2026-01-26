import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
import numpy as np

# 1️⃣ Load dataset (balanced)
df = pd.read_csv("new_pcos.csv")  # your CSV

# 2️⃣ Features and target
X = df.drop("PCOS", axis=1)
y = df["PCOS"]

# 3️⃣ Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 4️⃣ Balance training data using SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)

print("Class distribution after SMOTE:")
print(pd.Series(y_resampled).value_counts())

# 5️⃣ Scale features AFTER SMOTE
scaler = StandardScaler()
X_resampled_scaled = scaler.fit_transform(X_resampled)
X_test_scaled = scaler.transform(X_test)

# 6️⃣ Random Forest
rf = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    min_samples_split=5,
    min_samples_leaf=3,
    class_weight="balanced",
    random_state=42
)
rf.fit(X_resampled_scaled, y_resampled)

# 7️⃣ Probability Calibration using Isotonic
model = CalibratedClassifierCV(rf, method="isotonic", cv=5)
model.fit(X_resampled_scaled, y_resampled)

# 8️⃣ Evaluate
y_pred = model.predict(X_test_scaled)
y_prob = model.predict_proba(X_test_scaled)[:, 1]

print("\nProbabilities range:", np.min(y_prob), np.max(y_prob))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# 9️⃣ Save model and scaler
joblib.dump(model, "pcos_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("\n✅ Model & scaler saved. Now Low, Moderate, High risks will work properly!")
