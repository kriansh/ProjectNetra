from groq import Groq
import base64
import time
from .translate import translate_to_nepali
import os
import asyncio
from .refinedtts import text_to_speech
from dotenv import load_dotenv

load_dotenv()
def analyze_image(image_path, prompt="What's in this image?"):
    try:
        # Load environment variables
        
        
        # Initialize Groq client
        groq_api_key = os.getenv('GROQ_API_KEY')
        if not groq_api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        client = Groq(api_key=groq_api_key)
        
        # Encode image to base64
        with open(image_path, 'rb') as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')
        
        # Create the prompt message
        prompt_message = ("Focus only on the main objects and actions visible, make it so that there is in short. You are helping a blind person to understand the image. WARNING:Dont list the objects, just annotate the image."
                         + prompt)
        
        # Make request to Groq API
        response = client.chat.completions.create(
            model="llama-3.2-90b-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt_message},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            temperature=0.7,
            max_tokens=1024,
            top_p=1,
            stream=False
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error analyzing {image_path}: {str(e)}")
        return None

async def process_text_to_speech(text):
    """Wrapper function to handle the async text_to_speech call"""
    try:
        await text_to_speech(text)
    except Exception as e:
        print(f"Error in text-to-speech: {str(e)}")

if __name__ == "__main__":
    try:
        start_time = time.time()
        
        # Process single image
        image_path = "esp32_captures/esp32_image_0.jpg"
        prompt = "What are the main objects and activities visible in this image?"
        
        result = analyze_image(image_path, prompt)
        
        if result:
            # Translate to Nepali
            nepali_result = translate_to_nepali(result)
            
            if nepali_result:
                print("\nOriginal description:", result)
                print("\nNepali translation:", nepali_result)
                # Use asyncio to run the async text_to_speech function
                asyncio.run(process_text_to_speech(nepali_result))
        else:
            print("No valid results obtained from image analysis")
        
        execution_time = time.time() - start_time
        print(f"\nExecution time: {execution_time:.2f} seconds")
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")

