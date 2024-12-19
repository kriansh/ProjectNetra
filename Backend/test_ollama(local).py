import ollama
import base64
import time
from translate import translate_to_nepali
import os
from concurrent.futures import ThreadPoolExecutor
from gtts import gTTS
import pygame

def analyze_image(image_path, prompt="What's in this image?"):
    try:
        with open(image_path, 'rb') as image_file:
            base64_image = base64.b64encode(image_file.read()).decode()
        
        response = ollama.chat(
            model='llava',
            messages=[{
                'role': 'user',
                'content': "Please provide a brief, clear description of this image in 1 to 2 sentences."
                          "Focus only on the main objects and actions visible, make it so that there is more details and less words "
                          + prompt,
                'images': [base64_image]
            }]
        )
        
        return response['message']['content']
    except Exception as e:
        print(f"Error analyzing {image_path}: {str(e)}")
        return None

def compare_responses(response1, response2):
    """Compare two responses and return the better one based on clarity and conciseness"""
    if not response1:
        return response2
    if not response2:
        return response1
    
    # Ask LLaVa to evaluate which response is better
    comparison_prompt = f"""Compare these two descriptions and return the better one that is more clear and concise:
    1: {response1}
    2: {response2}
    Only return the better description, no explanation needed.GIVE ONLY THE DESCRIPTION NOTHING ELSE"""
    
    response = ollama.chat(
        model='llava',
        messages=[{
            'role': 'user',
            'content': comparison_prompt
        }]
    )
    
    return response['message']['content']

def speak_text(text):
    try:
        pygame.mixer.init()
        tts = gTTS(text=text, lang='ne')
        temp_audio = "temp_output.mp3"
        tts.save(temp_audio)
        
        pygame.mixer.music.load(temp_audio)
        pygame.mixer.music.play()
        
        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(10)
        
        pygame.mixer.quit()
        os.remove(temp_audio)
    except Exception as e:
        print(f"Error in text-to-speech: {str(e)}")

if __name__ == "__main__":
    try:
        start_time = time.time()
        
        image_paths = [
            "esp32_captures/esp32_image_0.jpg",
            "esp32_captures/esp32_image_1.jpg"
        ]
        
        # Process both images in parallel
        with ThreadPoolExecutor(max_workers=2) as executor:
            prompt = "What are the main objects and activities visible in this image?"
            future_results = {executor.submit(analyze_image, path, prompt): path 
                            for path in image_paths}
            
            results = []
            for future in future_results:
                result = future.result()
                if result:
                    results.append(result)
        
        if results:
            # Compare and get the better description if we have multiple results
            final_result = results[0] if len(results) == 1 else compare_responses(results[0], results[1])
            
            # Translate to Nepali
            nepali_result = translate_to_nepali(final_result)
            
            if nepali_result:
                print("\nOriginal description:", final_result)
                print("\nNepali translation:", nepali_result)
                speak_text(nepali_result)
        else:
            print("No valid results obtained from image analysis")
        
        execution_time = time.time() - start_time
        print(f"\nExecution time: {execution_time:.2f} seconds")
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")

