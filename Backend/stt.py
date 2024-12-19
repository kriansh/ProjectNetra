import speech_recognition as sr
import pyaudio

def nepali_speech_to_text():
    # Initialize recognizer
    recognizer = sr.Recognizer()
    
    # Use microphone as source
    with sr.Microphone() as source:
        print("Listening... Speak in Nepali")
        
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source, duration=1)
        
        try:
            # Listen for audio input
            audio = recognizer.listen(source, timeout=5)
            print("Processing speech...")
            
            # Use Google's speech recognition with Nepali language
            text = recognizer.recognize_google(audio, language="ne-NP")
            print("You said (in Nepali):", text)
            return text
            
        except sr.WaitTimeoutError:
            print("No speech detected within timeout period")
            return None
        except sr.UnknownValueError:
            print("Could not understand the audio")
            return None
        except sr.RequestError as e:
            print(f"Could not request results; {e}")
            return None

def english_speech_to_text():
    # Initialize recognizer
    recognizer = sr.Recognizer()
    
    # Use microphone as source
    with sr.Microphone() as source:
        print("Listening... Speak in English")
        
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source, duration=1)
        
        try:
            # Listen for audio input
            audio = recognizer.listen(source, timeout=5)
            print("Processing speech...")
            
            # Use Google's speech recognition with English language
            text = recognizer.recognize_google(audio, language="en-US")
            print("You said (in English):", text)
            return text
            
        except sr.WaitTimeoutError:
            print("No speech detected within timeout period")
            return None
        except sr.UnknownValueError:
            print("Could not understand the audio")
            return None
        except sr.RequestError as e:
            print(f"Could not request results; {e}")
            return None

if __name__ == "__main__":
    # Test the function
    while True:
        # Let user choose language
        print("\nChoose language:")
        print("1. English")
        print("2. Nepali")
        choice = input("Enter choice (1 or 2): ")
        
        if choice == "1":
            result = english_speech_to_text()
        else:
            result = nepali_speech_to_text()
            
        if result:
            print(result)
        
        # Ask if user wants to continue
        break
