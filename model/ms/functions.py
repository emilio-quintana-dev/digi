from tensorflow import keras
import numpy as np
import pandas as pd
import pickle

from ms import desc_vectorizer
from ms import label_encoder
from ms import model

def predict(X, model):
    X_transformed = desc_vectorizer.transform(X['DESCRIPTION']).toarray()
    probabilities = model.predict(X_transformed)[0]

    max_index = np.argmax(probabilities)

    max_category = label_encoder.classes_[max_index]

    return max_category


def get_model_response(json_data):
    X = pd.DataFrame.from_dict(json_data)
    prediction = predict(X, model)

    return {
        'status': 200,
        'label': prediction,
        'prediction': prediction
    }
