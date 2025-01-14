from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Global variable to hold the current grill temperature
current_temperature = 225

# Temperature route
@app.route('/temperature')
def get_temperature():
    return jsonify({'temperature': current_temperature})

# Increase fan speed
@app.route('/fan/increase', methods=['POST'])
def increase_fan_speed():
    global current_temperature
    current_temperature += random.randint(5, 10)  # Increase temperature by 5-10 degrees
    return jsonify({'status': 'Fan speed increased', 'new_temperature': current_temperature})

# Decrease fan speed
@app.route('/fan/decrease', methods=['POST'])
def decrease_fan_speed():
    global current_temperature
    current_temperature -= random.randint(5, 10)  # Decrease temperature by 5-10 degrees
    if current_temperature < 0:
        current_temperature = 0  # Ensure temperature doesn't go below 0
    return jsonify({'status': 'Fan speed decreased', 'new_temperature': current_temperature})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
