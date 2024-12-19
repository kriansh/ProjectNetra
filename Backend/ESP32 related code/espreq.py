import requests
import os
from datetime import datetime
import time

def download_esp32_image(loop=2):
    # URL of the ESP32 camera endpoint
    url = "http://172.50.0.110/cam-hi.jpg"
    folder_name = "esp32_captures"
    
    try:
        # Create folder if it doesn't exist
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
            
        # Send GET request to the endpoint
        response = requests.get(url, timeout=10)
        
        # Check if request was successful
        if response.status_code == 200:
            # Save images with consistent naming
            for i in range(loop):
                filename = f"{folder_name}/esp32_image_{i}.jpg"
                
                # Save the image
                with open(filename, 'wb') as f:
                    f.write(response.content)
                
                print(f"Image successfully saved as {filename}")
            
            return folder_name
        else:
            print(f"Failed to download image. Status code: {response.status_code}")
            return None
                
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")
        return None

def continuous_capture():
    print("Starting continuous capture. Press Ctrl+C to stop.")
    try:
        while True:
            download_esp32_image()
            time.sleep(1.5)  # Wait for 1.5 seconds before next capture
    except KeyboardInterrupt:
        print("\nCapture stopped by user")

if __name__ == "__main__":
    continuous_capture()
