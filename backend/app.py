from flask import Flask, redirect, url_for, render_template, request, session, jsonify

import configparser
from flask_pymongo import PyMongo

config = configparser.ConfigParser()
config.read('config.ini')

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['MONGO_URI'] = config['PROD']['DB_URI']
# app.secret_key = "d5sr8mn1g"

mongo = PyMongo(app)

@app.errorhandler(404)
def page_not_found(e):
    return False

@app.route("/schedule/")
def schedule():
    return jsonify({"code": 200})

@app.route("/film/<name>")
def filmData(name):

    return jsonify({"filmName": f"{name}"})

if __name__ == "__main__":
    app.run()