import cv2
from detector import ObjectDetector

def main():
    # Initialize detector with higher confidence threshold to reduce false positives
    detector = ObjectDetector(confidence_threshold=0.6)
    
    # Initialize video capture (0 for webcam, or provide video file path)
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Detect objects
        detections = detector.detect_objects(frame)
        
        # Draw annotations
        annotated_frame = detector.draw_annotations(frame, detections)
        
        # Display result
        cv2.imshow("Object Detection", annotated_frame)
        
        # Break loop on 'q' press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # Clean up
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main() 