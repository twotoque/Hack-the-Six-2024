import configparser
import os

from flask import Flask
from flask_pymongo import PyMongo

config = configparser.ConfigParser()
config.read('config.ini')

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['MONGO_URI'] = config['PROD']['DB_URI']

mongo = PyMongo(app)

# ROUTES
