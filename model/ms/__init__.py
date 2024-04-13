from flask import Flask
import tensorflow as tf
from tensorflow import keras


# Initialize App
app = Flask(__name__)

# Load models
model = keras.models.load_model('model/model.h5')
