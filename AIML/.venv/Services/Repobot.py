from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

    
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-1.5-pro")

def chatbot(prompt):
    response = model.generate_content(prompt)
    return response.text.strip()

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.strip().lower() in ["quit", "exit", "bye"]:
            print("RepoBot: Goodbye!")
            break

        response = chatbot(user_input)
        print("RepoBot:", response)