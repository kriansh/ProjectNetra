from gtts import gTTS
import librosa
import soundfile as sf

def tts(text):
    tts = gTTS(text=text, lang='ne')
    temp_file = "temp_output.mp3"
    output_file = "output.mp3"
    tts.save(temp_file)

