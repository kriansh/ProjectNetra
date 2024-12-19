import asyncio
import os
from pathlib import Path
import shutil
from gtts import gTTS
import pygame.mixer

async def create_chunk_audio(text_chunk: str, chunk_path: str, lang: str = 'ne') -> None:
    """Create audio file for a single text chunk"""
    tts = gTTS(text=text_chunk, lang=lang)
    tts.save(chunk_path)

async def text_to_speech(text: str, output_file: str = "output.mp3", chunk_size: int = 500) -> None:
    """Convert text to speech asynchronously using chunks"""
    # Initialize pygame mixer
    pygame.mixer.init()
    
    # Create temporary directory for chunks
    temp_dir = Path("temp_audio_chunks")
    temp_dir.mkdir(exist_ok=True)
    
    # Split text into chunks
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0
    
    for word in words:
        current_length += len(word) + 1  # +1 for space
        if current_length > chunk_size:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
            current_length = len(word)
        else:
            current_chunk.append(word)
    
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    
    # Create tasks for async conversion
    tasks = []
    for i, chunk in enumerate(chunks):
        chunk_path = temp_dir / f"chunk_{i}.mp3"
        tasks.append(create_chunk_audio(chunk, str(chunk_path)))
    
    # Wait for all chunks to be processed
    await asyncio.gather(*tasks)
    
    # Combine all audio chunks by playing and recording
    for i in range(len(chunks)):
        chunk_path = temp_dir / f"chunk_{i}.mp3"
        pygame.mixer.music.load(str(chunk_path))
        pygame.mixer.music.play()
        # Wait for the current chunk to finish playing
        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(1)
    
    # Stop pygame mixer before cleanup
    pygame.mixer.music.stop()
    pygame.mixer.quit()
    
    # Clean up temporary directory
    shutil.rmtree(temp_dir)

# Example usage
if __name__ == "__main__":
    sample_text = "छविले एक घरको दृश्यलाई यसको अगाडि प्रकाशले प्रकाशित गरेको घरको साथ दृश्य देखाउँदछ।अग्रभूमिमा, त्यहाँ एक सडक बत्ती बालीमा तालिम हासिल कास्टिंग प्रकाश छ।एउटा कार घर नजिकै पार्क गरिएको छ।फ्रेमको बाँयामा, त्यहाँ ठूलो रूख आंशिक रूपमा देखिने र अर्को बत्ती पोष्ट छ।पृष्ठभूमिमा अधिक रूखहरू र अँध्यारो आकाशको सुविधाहरू, सुझाव दिँदै सुझाव दिँदै सुझाव दिँदै।त्यहाँ कुनै व्यक्ति वा चल्न नसक्ने सवारी साधनहरू छन्।"
    asyncio.run(text_to_speech(sample_text))