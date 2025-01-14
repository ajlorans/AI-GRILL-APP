# AI-Powered Grill Monitoring App

This is an AI-powered grill monitoring app that displays real-time grill temperature, allows fan control, and provides temperature trend graphs. Notifications alert you when the grill reaches the target temperature.

---

## Features

- Real-time grill temperature monitoring
- Fan control: Increase/Decrease fan speed
- Temperature trend graph
- Target temperature notifications

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Python 3](https://www.python.org/) installed

---

### Backend Setup (Flask)

1. **Navigate to the backend folder**:

   ```bash
   cd backend
   ```

2. **Create a virtual environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:

   - **Windows (Command Prompt)**:
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Flask server**:
   ```bash
   python app.py
   ```

---

### Frontend Setup (React Native)

1. **Navigate to the frontend folder**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the app**:

   ```bash
   npm start
   ```

4. **Open the app**:
   - Press `w` to open the app in your browser
   - Or scan the QR code with Expo Go.

---

## Technologies Used

- **Frontend**: React Native, Expo
- **Backend**: Flask, Python
- **Charts**: react-native-chart-kit

---

## Future Features

- Recipe suggestions
- AI-based cooking insights
- Cloud sync for grill session logs
