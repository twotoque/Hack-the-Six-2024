from flask import Flask

app = Flask(__name__)

@app.route("/")
def user_test():
    return "<p>User test</p>"