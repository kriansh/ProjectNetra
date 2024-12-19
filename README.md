# Netra - Smart Glass for the Visually Impaired

Welcome to **Netra**, an innovative project by Team Vision. Netra is a smart glass designed to empower visually impaired individuals (Dristibihin) by helping them visualize their surroundings through advanced technologies like Computer Vision and Natural Language Processing. Our model supports both Nepali and English languages.

## Features

**(Use case are listed further below)**

### Facial Recognition

Netra identifies and recognizes familiar faces, providing real-time audio feedback.

**How It Works:**

Visually impaired individuals often struggle to recognize people unless they hear them speak. Netra solves this problem with the following process:

1. When a user wearing Netra says "Auhar," the camera module activates.
2. The user names the person, for example, "Ram," and the camera captures and saves the image.
3. Later, when the person comes within the camera's radius, Netra detects them using facial recognition and announces their presence, e.g., "Ram agadi xa hai" ("Ram is in front of you") in Nepali.

This feature helps visually impaired individuals easily identify people around them.

### Obstacle Detection

Netra's camera is always active, continuously sending video data to the device. When obstacles are detected in the video frame, the YOLO model identifies them and provides real-time audio feedback, e.g., "Agadi dhunga xa hai" ("There is a stone ahead") in Nepali.

This enables users to navigate streets and various environments safely.

### Text Extraction

Blind individuals often rely on audiobooks, limiting their access to diverse study materials. Netra's text extraction feature overcomes this barrier by enabling visually impaired users to access printed text through audio descriptions, empowering them to study books and other materials independently.

### Surrounding Visualization

Netra provides detailed information about the user's surroundings through object detection and audio descriptions, offering a richer understanding of the environment.

## Technical Overview and Documentation

To set up and run Netra in a new environment:

1. Clone the repository:

   ```bash
   git pull https://github.com/your-username/netra-smart-glass.git
   ```

2. Install the necessary dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the main system:
   ```bash
   python main.py
   ```

The main system combines all modules in the `Backend` folder.

### Key Components

- **Object Detection:** OpenCV and YOLO are used for detecting objects, images, and faces.
- **Text-to-Speech:** The project uses `gTTS` for basic text-to-speech functionality, with a custom model provided in the `Backend` folder for enhanced performance.
- **Language Translation:** Modules like `translate` ensure smooth operation across Nepali and English languages.
- **Asynchronous Operations:** `asyncio` and other supporting libraries handle background tasks efficiently.

### AI Model Options

- **Local AI Models:** Use Ollama for running models locally.
- **Cloud AI Models:** Grok is available for cloud-based processing.

### Dashboard Access

The project includes a user-friendly dashboard for monitoring and managing the system, located in the `DashboardUI` folder.

## Use Cases

Netra is designed to assist visually impaired individuals in various real-life scenarios. Below are some examples of how it can be used:

### 1. Recognizing People

- Use Case: Identify familiar faces in social settings, family gatherings, or workplaces.
- How to Use:
  - Activate the camera module by saying "Aanuhar."
  - Speak the name of the person (e.g., "Ram") while capturing their image.
  - Later, when the person is nearby, Netra will announce their name, making social interactions easier.

### 2. Navigating Safely

- Use Case: Avoid obstacles while walking on streets or in crowded areas.
- How to Use:
  - Netra's camera continuously detects obstacles.
  - When an obstacle is detected, an audio alert is provided, e.g., "Agadi khatra xa."

### 3. Reading Text

- Use Case: Access printed materials such as books, newspapers, or labels.
- How to Use:
  - Hold the text in front of Netra's camera and say anything like "ke cha", "aagadi ke cha padh ta",etc to activate.
  - The text will be extracted and read aloud to the user.

### 4. Understanding Surroundings

- Use Case: Get a detailed understanding of the environment for better navigation or situational awareness.
- How to Use:
  - Netra provides audio descriptions of detected objects, enhancing spatial awareness by default.

These use cases demonstrate how Netra empowers visually impaired individuals to lead more independent and informed lives.

---

We hope Netra brings a transformative change to the lives of visually impaired individuals. For any questions or contributions, feel free to reach out via the repository's issue tracker.
