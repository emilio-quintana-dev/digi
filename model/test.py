import pandas as pd
from ms import model

def predict(X, model):
    prediction = model.predict(X)[0]

    return prediction

def test_model():
    test_data = [{'DESCRIPTION': 'Uber'}]
    df_test = pd.DataFrame.from_dict(test_data)
    prediction = predict(df_test, model)

test_model()
