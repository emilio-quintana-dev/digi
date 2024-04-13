import pandas as pd
from ms import model


def predict(X, model):
    prediction = model.predict(X)[0]
    print("Prediction")
    print(prediction)

    return prediction


def get_model_response(json_data):
    print("JSON Data")
    print(json_data)

    X = pd.DataFrame.from_dict(json_data)
    print("X")
    print(X)

    prediction = predict(X, model)

    return {
        'status': 200,
        'label': prediction,
        'prediction': prediction
    }
