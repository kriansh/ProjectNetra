from deep_translator import GoogleTranslator

def translate_to_nepali(text):
    try:
        translator = GoogleTranslator(source='auto', target='ne')
        result = translator.translate(text)
        return result
    except Exception as e:
        print(f"Translation error: {str(e)}")
        return None

def translate_to_english(text):
    try:
        translator = GoogleTranslator(source='ne', target='en')
        result = translator.translate(text)
        return result
    except Exception as e:
        print(f"Translation error: {str(e)}")
        return None
