from flask import Flask
import tensorflow as tf
from tensorflow import keras
import pickle


# Initialize App
app = Flask(__name__)

# Load models
model = keras.models.load_model('model/model.h5')

with open('model/vectorizer.pkl', 'rb') as file:
    desc_vectorizer = pickle.load(file)
with open('model/label_encoder.pkl', 'rb') as file:
    label_encoder = pickle.load(file)
