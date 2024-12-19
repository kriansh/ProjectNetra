import cv2
import os
from .stt import english_speech_to_text
import time


def capture_face():
    # Create directories if they don't exist
    for directory in ['face_data', 'esp32_captures']:
        if not os.path.exists(directory):
            os.makedirs(directory)

    # Get person's name with retry logic
    name = None
    while not name:
        name = english_speech_to_text()
        if not name:
            print("Could not understand the name. Please try again...")
    
    print("Looking for ESP32 camera feed...")
    
    while True:
        try:
            # Find the latest ESP32 image
            esp32_files = [f for f in os.listdir("esp32_captures") if f.endswith('.jpg')]
            if not esp32_files:
                print("No ESP32 captures found")
                time.sleep(0.1)
                continue
            
            latest_file = max([os.path.join("esp32_captures", f) for f in esp32_files], 
                            key=os.path.getmtime)
            
            # Read the frame
            frame = cv2.imread(latest_file)
            if frame is None:
                continue
            
            # Show live camera feed
            cv2.imshow('Say "save" or "capture" to save image, or press "q" to quit', frame)
            
            # Wait for key press
            key = cv2.waitKey(1)
            
            # Check for voice commands or key press
            try:
                a = english_speech_to_text().split()
                if "sev" in a or "seb" in a or "sab" in a or "save" in a or "capture" in a:
                    # Save the image
                    cv2.imwrite(f'face_data/{name}.jpg', frame)
                    print(f"Image saved as 'face_data/{name}.jpg'")
                    break
            except:
                pass
            
            # Check for quit key
            if key == ord('q'):
                print("Quitting without saving image")
                break
                
        except Exception as e:
            print(f"Error processing frame: {str(e)}")
            time.sleep(0.1)
            continue
    
    # Close windows
    cv2.destroyAllWindows()
    cv2.waitKey(1)  # Additional waitKey to ensure windows are closed
    return name

if __name__ == "__main__":
    capture_face() 