import pandas as pd
from ms import model
from ms import desc_vectorizer
from ms import label_encoder
import numpy as np

def predict(X, model, vectorizer):
    # Transform the description using the trained vectorizer
    X_transformed = vectorizer.transform(X['DESCRIPTION']).toarray()
    probabilities = model.predict(X_transformed)[0]  # Get the prediction for the first (and only) item

    # Find the index of the highest probability
    max_index = np.argmax(probabilities)

    # Retrieve the corresponding category label
    max_category = label_encoder.classes_[max_index]

    return max_category

def test_model():
    test_data = [{'DESCRIPTION': 'Uber'}]
    df_test = pd.DataFrame.from_dict(test_data)
    prediction = predict(df_test, model, desc_vectorizer)
    print('Prediction:')
    print(prediction)

test_model()
