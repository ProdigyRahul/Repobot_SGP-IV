from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World! Welcome to my Flask app."

@app.route('/greet/<name>')
def greet(name):
    return f"Hello, {name}! How are you today?"


if __name__ == '__main__':
    app.run(debug=True)