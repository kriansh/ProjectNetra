from ultralytics import YOLO
import cv2
import numpy as np
import os

class ObjectDetector:
    def __init__(self, confidence_threshold=0.5):
        # Load YOLOv8 model
        self.model = YOLO('yolov8x.pt')  # Using YOLOv8x which is the largest and most accurate variant
        self.confidence_threshold = confidence_threshold
        
        # Initialize colors for visualization
        np.random.seed(42)
        self.colors = np.random.randint(0, 255, size=(80, 3), dtype="uint8")

    def detect_objects(self, image):
        # Run inference
        results = self.model(image, verbose=False)[0]
        
        # Process detections
        detections = []
        
        for box in results.boxes:
            confidence = float(box.conf)
            if confidence < self.confidence_threshold:
                continue
                
            # Get box coordinates
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            w = x2 - x1
            h = y2 - y1
            
            # Get class name
            class_id = int(box.cls)
            class_name = results.names[class_id]
            
            detections.append({
                'box': [x1, y1, w, h],
                'confidence': confidence,
                'class': class_name
            })
            
        return detections

    def draw_annotations(self, image, detections):
        for detection in detections:
            (x, y, w, h) = detection['box']
            class_name = detection['class']
            confidence = detection['confidence']

            # Get color for class
            color = [int(c) for c in self.colors[hash(class_name) % 80]]

            # Draw box
            cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)

            # Draw label with background
            text = f"{class_name}: {confidence:.2f}"
            font_scale = 0.6
            thickness = 2
            (text_width, text_height), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, thickness)
            
            # Draw background rectangle for text
            cv2.rectangle(image, (x, y - text_height - 10), (x + text_width + 10, y), color, -1)
            
            # Draw text
            cv2.putText(image, text, (x + 5, y - 5), 
                        cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 255), thickness)
            
            # Print detection in terminal
            print(f"Detected {class_name} with confidence {confidence:.2f} at position {x}, {y}")

        return image