#run this file to access the backend
import time
from Backend.stt import nepali_speech_to_text
from Backend.capture_face import capture_face
from Backend.recognize_face import recognize_faces
from Backend.test_ollama import analyze_image
from Backend.translate import translate_to_nepali
from Backend.refinedtts import text_to_speech
import asyncio

def check_command(text: str, keywords: list) -> bool:
    """Check if any keyword is present in the text"""
    if text:
        return any(keyword in text.lower() for keyword in keywords)
    return False

async def main():
    print("आवाज कमाण्ड प्रणाली सुरु भयो")
    print("'सुरु' वा 'शुरू' भन्नुहोस् प्रणाली सक्रिय गर्न")
    print("'बन्द', 'रोक्नुहोस्', वा 'समाप्त' भन्नुहोस् बाहिर निस्कन")
    
    while True:
        text = nepali_speech_to_text()
        
        if text:
            # Check for exit commands
            if check_command(text, ['बन्द', 'रोक्नुहोस्', 'समाप्त']):
                print("प्रणाली बन्द हुँदैछ...")
                break
                
            # Check for activation commands
            if check_command(text, ['सुरु','सुरू', 'शुरू']):
                await text_to_speech(f"सुरु भयो")
                print("प्रणाली सक्रिय भयो! कमाण्डहरू सुन्दैछ...")
                print("\nउपलब्ध कमाण्डहरू:")
                print("- 'अनुहार लिनुहोस्' वा 'अनुहार सेभ गर्नुहोस्'")
                print("- 'अनुहार पहिचान' वा 'अनुहार चिन्नुहोस्'")
                print("- 'तस्बिर विश्लेषण' वा 'वर्णन'")
                
                while True:
                    command = nepali_speech_to_text()
                    
                    if command:
                        # Exit inner loop
                        if check_command(command, ['बन्द', 'रोक्नुहोस्', 'समाप्त']):
                            print("स्ट्यान्डबाय मोडमा फर्किंदै...")
                            await text_to_speech(f"स्ट्यान्डबाय मोडमा फर्किंदै...")
                            break
                            
                        # Face capture command
                        if check_command(command, ['अनुहार', 'अनुहार सेभ']):
                            await text_to_speech(f"अनुहार सेभ गर्नुहोस्...")
                            name = capture_face()
                            await text_to_speech(f"{name}को अनुहार save गरिएको छ")
                            
                        # Face recognition command    
                        elif check_command(command, ['पहिचान', 'चिन्नुहोस्']):
                           name = recognize_faces()
                           time.sleep(5)
                           if name:
                               await text_to_speech(f"{name}को अनुहार पहिचान गरिएको छ")
                            
                        # Image analysis command
                        elif check_command(command, ['तस्बिर विश्लेषण', 'वर्णन', 'विश्लेषण','मेरो','अगाडि ','छ','के']):
                            try:
                                image_paths = [
                                    "esp32_captures/esp32_image_0.jpg"
                                ]
                                nepali_result = translate_to_nepali(analyze_image(image_paths[0]))
                                await text_to_speech(nepali_result)

                            except Exception as e:
                                print(f"तस्बिर विश्लेषण गर्दा त्रुटि: {str(e)}")

if __name__ == "__main__":
    asyncio.run(main())


