import pandas as pd
from sklearn import preprocessing
from sklearn.feature_extraction.text import CountVectorizer
import tensorflow as tf
from tensorflow import keras

# Load the data
df = pd.read_csv('data/descriptions_with_categories.csv')

# Pre-processing
indices_of_interest = df["CATEGORY"].value_counts()[df["CATEGORY"].value_counts() >= 10 ].index
df = df[df["CATEGORY"].isin(indices_of_interest)]
le = preprocessing.LabelEncoder()
le.fit(["UNKNOWN"] + list(df["CATEGORY"])) # Add an extra UNKNOWN label in case outcome cannot be predicted
df["CATEGORY (encoded)"] = le.transform(df["CATEGORY"])
raw_train = df.sample(frac=0.8).sort_index()
raw_test = df[~df.index.isin(raw_train.index)]
desc_vectorizer = CountVectorizer(analyzer="word", max_features=100)
training_bag_of_words = desc_vectorizer.fit_transform(raw_train["DESCRIPTION"])
x_train = pd.DataFrame(training_bag_of_words.toarray(),
                       columns=[x for x in desc_vectorizer.get_feature_names_out()]).astype(int)
test_bag_of_words = desc_vectorizer.transform(raw_test["DESCRIPTION"])
x_test = pd.DataFrame(test_bag_of_words.toarray(),
                      columns=[x for x in desc_vectorizer.get_feature_names_out()]).astype(int)

# Create model
model = keras.Sequential([
    keras.layers.Input(shape=(100,)),
    keras.layers.Dense(10, activation='relu'),
    keras.layers.Dense(len(set(df["CATEGORY"])) + 1, activation='softmax') # extra unit for "UNKNOWN" tag
    ])
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])
model.fit(x_train.values, raw_train["CATEGORY (encoded)"], epochs=100)

# Export model
model.save('model/model.h5') 
