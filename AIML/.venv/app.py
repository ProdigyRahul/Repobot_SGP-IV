from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from Services.FileSummarization import FileSummarization
# from Services.Speech_Text import SpeechToTextConverter
from Services.QnA import repo_bot 
from Services.RepoSummarization import get_repo_summary
from dotenv import load_dotenv
# import speech_recognition as sr
import json
from typing import Dict, List, Optional, Union
import google.generativeai as genai
import openai
import tempfile
from pathlib import Path
import uuid
import traceback
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from Services.Repobot import chatbot


load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
SUMMARIES_FOLDER = "summaries"
for folder in [UPLOAD_FOLDER, SUMMARIES_FOLDER]:
    if not os.path.exists(folder):
        os.makedirs(folder)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["SUMMARIES_FOLDER"] = SUMMARIES_FOLDER


ALLOWED_EXTENSIONS = {"txt", "py", "java", "js", "html", "css", "md", "json", "yaml", "yml", "xml"}


os.makedirs("uploads", exist_ok=True)


file_summarizer = FileSummarization() 

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the File Summarization and Project Q&A API!"})


class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str

def get_chat_response(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text.strip()

@app.route("/repobot", methods=["POST"])
def repobot():
    try:
    
        data = request.get_json()
        
     
        if not data or 'prompt' not in data:
            return jsonify({"error": "Prompt is required"}), 400
        
    
        response_text = chatbot(data['prompt'])
        
        return jsonify({
            "response": response_text,
            "status": "success"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/file-summarize", methods=["POST"])
async def summarize_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
 
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        await file.save(temp_path)
        
  
        summary = await file_summarizer.async_summarize_file(temp_path)
        
        return jsonify({
            "filename": file.filename,
            "summary": summary,
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.route("/repo-chat", methods=["POST"])
def chat_with_repo():
    """
    Endpoint for GitHub repository-related queries
    """
    try:
        data = request.json
        
        if not data or 'query' not in data:
            return jsonify({"error": "Query is required"}), 400
        
        class ChatRequest:
            def __init__(self, query, repo_url=None):
                self.query = query
                self.repo_url = repo_url
        
        request_obj = ChatRequest(
            query=data['query'], 
            repo_url=data.get('repo_url')
        )
        response = repo_bot.generate_response(request_obj)
        
        return jsonify({
            "response": response.response,
            "confidence": response.confidence_score,
            "sources": response.sources
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/repo-summarize", methods=["POST"])
def summarize_repo():
    """
    Endpoint for repository summarization
    """
    try:
        data = request.json
        owner = data.get("owner")
        repo = data.get("repo")

        if not owner or not repo:
            return jsonify({"error": "Owner and repo are required"}), 400

        summary = get_repo_summary(owner, repo)
        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    """
    Simple health check endpoint
    """
    return jsonify({
        "status": "healthy", 
        "message": "RepoBot is up and running!"
    })

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)