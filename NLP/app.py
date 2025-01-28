# Main Python file for running the NLP API (using Flask/FastAPI)

from fastapi import FastAPI, Request
from chatbot_pipeline import ChatbotPipeline

app = FastAPI()
chatbot = ChatbotPipeline()

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_query = data.get("query")
    repo_data = data.get("repo_data")  # Repo data from backend

    # Process the user query
    response = chatbot.handle_query(user_query, repo_data)
    return {"response": response}
