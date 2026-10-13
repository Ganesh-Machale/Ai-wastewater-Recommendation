import os
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, accuracy_score
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..', '..'))
CSV_PATH = os.path.join(
    PROJECT_ROOT,
    'WaterModel', 'Ganesh_Project', 'Ganesh_Project', 'Ganesh_Project', 'data2.csv'
)

print(f"Loading data from: {CSV_PATH}")
df = pd.read_csv(CSV_PATH)

features = [
    'pH',
    'Turbidity',
    'Phospate',
    'Nitrate',
    'Iron',
    'COD(mg/L)',
    'Chlorine',
    'Sodium',
    'TDS'
]
target = 'Class'

# Fill missing values if any
df[features] = df[features].fillna(df[features].median())

# Compute baseline median values for optional/unfilled client fields
feature_medians = df[features].median().to_dict()

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.30, random_state=42
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the exact Random Forest Model tuned in notebook
model = RandomForestClassifier(
    bootstrap=True,
    class_weight='balanced',
    max_depth=None,
    max_features='sqrt',
    min_samples_leaf=1,
    min_samples_split=2,
    n_estimators=100,
    random_state=42,
    n_jobs=1
)

print("Training Random Forest Classifier...")
model.fit(X_train_scaled, y_train)

y_pred = model.predict(X_test_scaled)
acc = accuracy_score(y_test, y_pred)
print(f"Random Forest Model Accuracy: {acc * 100:.2f}%")
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Save artifacts
model_file = os.path.join(BASE_DIR, 'rf_water_model.joblib')
scaler_file = os.path.join(BASE_DIR, 'scaler.joblib')
meta_file = os.path.join(BASE_DIR, 'model_meta.json')

joblib.dump(model, model_file)
joblib.dump(scaler, scaler_file)

meta = {
    'accuracy': float(acc),
    'features': features,
    'feature_medians': feature_medians,
    'classes': [int(c) for c in model.classes_],
    'n_estimators': 100
}

with open(meta_file, 'w') as f:
    json.dump(meta, f, indent=2)

print("Model, scaler, and metadata saved successfully!")
