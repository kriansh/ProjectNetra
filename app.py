from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Retrieve the Groq API key from the environment variable
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not set in the .env file.")

# Initialize the Groq client with the API key
client = Groq(api_key=api_key)

# Create the chat completion request
completion = client.chat.completions.create(
    model="llama-3.2-11b-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "What is in this image?"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://static01.nyt.com/images/2016/06/28/nyregion/00SIDEWALKS1sub/00SIDEWALKS1sub-videoSixteenByNineJumbo1600.jpg"  # Path to your image file
                    }
                }
            ]
        },
        {
            "role": "user",
            "content": "describe this vision in detail. Tell me about everything present here"
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=False,
    stop=None,
)

# Print the response from the API
print(completion.choices[0].message())
