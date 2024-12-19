import cv2
import os
from .stt import english_speech_to_text


def capture_face():
    # Create directory if it doesn't exist
    if not os.path.exists('face_data'):
        os.makedirs('face_data')

    # Get person's name with retry logic
    name = None
    while not name:
        name = english_speech_to_text()
        if not name:
            print("Could not understand the name. Please try again...")
    
    # Initialize camera
    cap = cv2.VideoCapture(0)
    
    print("Camera is opening... Press 's' to capture image or 'q' to quit")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break
            
        # Show live camera feed
        cv2.imshow('Press s to capture or q to quit', frame)
        
        # Wait for key press
        key = cv2.waitKey(1)
        
        
        # Press 's' to capture
        try:
            a = english_speech_to_text().split()
            if "sev" in a or "save" in a or "capture" in a:
                # Save the image
                cv2.imwrite(f'face_data/{name}.jpg', frame)
                print(f"Image saved as 'face_data/{name}.jpg'")
                break
            elif key == ord('q'):
                print("Quitting without saving image")
                break
        except:
            pass
        
        # Press 'q' to quit
        
    
    # Release camera and close windows
    cap.release()
    cv2.destroyAllWindows()
    cv2.waitKey(1)  # Additional waitKey to ensure windows are closed
    return name

if __name__ == "__main__":
    capture_face() 