import sys
import os
import json
import warnings
warnings.filterwarnings("ignore")

import numpy as np
import pandas as pd
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'rf_water_model.joblib')
SCALER_PATH = os.path.join(BASE_DIR, 'scaler.joblib')
META_PATH = os.path.join(BASE_DIR, 'model_meta.json')

def load_artifacts():
    if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
        raise FileNotFoundError("Model or scaler artifacts not found. Please run train_model.py first.")
    
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    
    with open(META_PATH, 'r') as f:
        meta = json.load(f)
        
    return model, scaler, meta

def predict(input_dict):
    model, scaler, meta = load_artifacts()
    features = meta['features']
    medians = meta['feature_medians']
    
    row = []
    resolved_inputs = {}
    for feat in features:
        val = None
        if feat in input_dict and input_dict[feat] is not None and input_dict[feat] != '':
            val = float(input_dict[feat])
        elif feat.lower() in input_dict and input_dict[feat.lower()] is not None and input_dict[feat.lower()] != '':
            val = float(input_dict[feat.lower()])
        elif feat == 'COD(mg/L)' and ('cod' in input_dict or 'COD' in input_dict):
            val = float(input_dict.get('cod', input_dict.get('COD')))
        elif feat == 'Phospate' and ('phosphate' in input_dict or 'Phosphate' in input_dict):
            val = float(input_dict.get('phosphate', input_dict.get('Phosphate')))
        elif feat == 'TDS' and ('tds' in input_dict or 'Tds' in input_dict):
            val = float(input_dict.get('tds', input_dict.get('Tds')))
        elif feat == 'pH' and ('ph' in input_dict or 'PH' in input_dict):
            val = float(input_dict.get('ph', input_dict.get('PH')))
            
        if val is None or np.isnan(val):
            val = medians.get(feat, 0.0)
            
        row.append(val)
        resolved_inputs[feat] = val

    df_sample = pd.DataFrame([row], columns=features)
    X_scaled = scaler.transform(df_sample)
    pred_class = int(model.predict(X_scaled)[0])
    
    # Get probabilities
    probs = model.predict_proba(X_scaled)[0]
    class_probabilities = {str(c): float(p) for c, p in zip(model.classes_, probs)}
    confidence = float(probs[model.classes_.tolist().index(pred_class)])

    return {
        'predictedClass': pred_class,
        'confidence': round(confidence * 100, 2),
        'classProbabilities': class_probabilities,
        'featuresUsed': resolved_inputs,
        'modelName': 'Random Forest Classifier (100 Trees)',
        'modelAccuracy': meta.get('accuracy', 1.0)
    }

if __name__ == '__main__':
    try:
        if len(sys.argv) > 1:
            raw_input = sys.argv[1]
        else:
            raw_input = sys.stdin.read()
            
        if not raw_input or raw_input.strip() == '':
            payload = {}
        else:
            payload = json.loads(raw_input)
            
        result = predict(payload)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)
        sys.exit(1)
