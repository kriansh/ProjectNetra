import cv2
import os
import numpy as np
import asyncio
from .refinedtts import text_to_speech
import time

def train_face_recognizer():
    try:
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        
        faces = []
        labels = []
        label_dict = {}
        current_label = 0
        
        # Check if face_data directory exists and has files
        if not os.path.exists('face_data') or len(os.listdir('face_data')) == 0:
            print("No face data found! Please capture some faces first using capture_face.py")
            return None, None, None
        
        # Load training images
        for filename in os.listdir('face_data'):
            if filename.endswith('.jpg'):
                path = os.path.join('face_data', filename)
                name = filename.split('.')[0]
                label_dict[current_label] = name
                
                img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
                if img is None:
                    print(f"Failed to load image: {path}")
                    continue
                    
                # Detect face in training image
                faces_rect = face_cascade.detectMultiScale(img, 1.1, 4)
                if len(faces_rect) == 0:
                    print(f"No face detected in training image: {path}")
                    continue
                
                # Use the first detected face
                x, y, w, h = faces_rect[0]
                face_img = img[y:y+h, x:x+w]
                face_img = cv2.resize(face_img, (200, 200))  # Consistent size for training
                
                faces.append(face_img)
                labels.append(current_label)
                current_label += 1
        
        if not faces:
            print("No valid face data found!")
            return None, None, None
            
        # Train recognizer
        recognizer.train(faces, np.array(labels))
        print(f"Trained recognizer with {len(faces)} faces")
        return recognizer, face_cascade, label_dict
    except Exception as e:
        print(f"Error in training: {str(e)}")
        return None, None, None

def recognize_faces():
    # Initialize face recognition
    result = train_face_recognizer()
    if result[0] is None:
        return None
        
    recognizer, face_cascade, label_dict = result
    
    print("Starting face recognition on ESP32 feed...")
    last_detection_time = 0
    detection_cooldown = 0.5  # Seconds between detection attempts
    
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
            
            # Only attempt detection every few seconds
            current_time = time.time()
            if current_time - last_detection_time < detection_cooldown:
                cv2.imshow('Face Recognition', frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
                continue
                
            last_detection_time = current_time
            
            # Convert to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # Detect faces with different parameters
            faces = face_cascade.detectMultiScale(
                gray,
                scaleFactor=1.1,
                minNeighbors=5,
                minSize=(30, 30)
            )
            
            # Process each detected face
            for (x, y, w, h) in faces:
                roi_gray = gray[y:y+h, x:x+w]
                roi_gray = cv2.resize(roi_gray, (200, 200))
                
                try:
                    label, confidence = recognizer.predict(roi_gray)
                    
                    # Removed confidence threshold check
                    name = label_dict[label]
                    confidence = round(confidence - 100)
                    
                    cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                    cv2.putText(frame, f"{name} ({confidence}%)", 
                              (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 
                              0.9, (0, 255, 0), 2)
                    
                    print(f"Detected: {name} with confidence {confidence}%")
                    cv2.imshow('Face Recognition', frame)
                    cv2.waitKey(1)
                    cv2.destroyAllWindows()
                    return name
                    
                except Exception as e:
                    print(f"Recognition error: {str(e)}")
            
            # Show frame even if no face is detected
            cv2.imshow('Face Recognition', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
                
        except Exception as e:
            print(f"Error processing frame: {str(e)}")
            time.sleep(0.1)
            continue
    
    cv2.destroyAllWindows()
    cv2.waitKey(1)
    return None

if __name__ == "__main__":
    # Make sure ESP32 capture is running
    if not os.path.exists('esp32_captures'):
        os.makedirs('esp32_captures')
        
    print("Make sure ESP32 capture script is running...")
    name = recognize_faces()
    if name:
        asyncio.run(text_to_speech(f"{name}को अनुहार पहिचान गरिएको छ"))