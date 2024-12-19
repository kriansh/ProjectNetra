import cv2
import urllib.request
import numpy as np
from threading import Thread
import time

class ESP32Camera:
    def __init__(self):
        # Get ESP32's IP from user input
        self.ip = input("Enter ESP32's IP address (e.g. 192.168.1.100): ")
        
        # Use the capture URL that we know works
        self.url = f"http://{self.ip}/capture"
        print(f"\nConnecting to ESP32 camera at {self.url}")
        
        self.frame = None
        self.status = False
        self.thread = Thread(target=self._capture_feed, daemon=True)
        self.thread.start()

    def _capture_feed(self):
        while True:
            try:
                # Get the image from ESP32
                img_resp = urllib.request.urlopen(self.url)
                imgnp = np.asarray(bytearray(img_resp.read()), dtype=np.uint8)
                frame = cv2.imdecode(imgnp, cv2.IMREAD_COLOR)
                
                if frame is not None and frame.size > 0:
                    self.frame = frame
                    self.status = True
                else:
                    self.status = False
                    print("Received empty frame")
                
                # Small delay to maintain reasonable frame rate
                time.sleep(0.1)
                    
            except Exception as e:
                print(f"Error capturing frame: {str(e)}")
                self.status = False
                time.sleep(1)

    def get_frame(self):
        return self.frame

    def is_active(self):
        return self.status

def create_virtual_camera():
    print("\nMake sure your ESP32 is powered on and you can see its IP address in the serial monitor")
    esp_cam = ESP32Camera()
    
    print("\nInitializing camera...")
    timeout_counter = 0
    max_timeout = 10
    
    while not esp_cam.is_active():
        time.sleep(1)
        timeout_counter += 1
        print(f"Waiting for camera... ({timeout_counter}/{max_timeout})")
        if timeout_counter >= max_timeout:
            print("\nConnection failed. Please check:")
            print("1. ESP32 is powered on and running")
            print("2. Both devices are on the same network")
            print("3. The IP address is correct")
            return

    print("\nCamera connected successfully! Starting video feed...")
    window_name = 'ESP32 Camera Feed (Press Q to quit)'
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    
    try:
        while True:
            frame = esp_cam.get_frame()
            if frame is not None:
                cv2.imshow(window_name, frame)
                key = cv2.waitKey(1) & 0xFF
                if key == ord('q'):
                    break
            
    except KeyboardInterrupt:
        print("Stopping camera feed...")
    finally:
        cv2.destroyAllWindows()
        cv2.waitKey(1)

if __name__ == "__main__":
    create_virtual_camera()
