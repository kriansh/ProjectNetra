from capture_face import capture_face
from recognize_face import recognize_faces
from refinedtts import text_to_speech
import asyncio

def face_capture():
    face = capture_face()
    asyncio.run(text_to_speech(f"{face}को अनुहार save गरिएको छ"))

def face_recognition():
    face = recognize_faces()
    asyncio.run(text_to_speech(f"{face}को अनुहार पहिचान गरिएको छ"))

if __name__ == "__main__":
    face_capture()
    face_recognition()
