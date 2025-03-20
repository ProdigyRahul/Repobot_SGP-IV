from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from Services.FileSummarization import FileSummarization
from Services.Speech_Text import SpeechToTextConverter
from dotenv import load_dotenv
import speech_recognition as sr
import asyncio
import json
from typing import Dict, List, Optional, Union
import google.generativeai as genai
import openai

# Load environment variables
load_dotenv()

# Initialize API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure APIs
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {"txt", "py", "java", "js", "html", "css", "md"}

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Initialize SpeechText
speech_text_converter = SpeechToTextConverter()

# Q&A System Class
class ProjectQASystem:
    def __init__(self):
        self.context = []
        self.model_preference = "openai"  # Default to OpenAI
        
    def add_context(self, content: str, content_type: str = "text"):
        """
        Add content to the context for future questions
        
        Args:
            content: The content to add (code snippet, description, etc.)
            content_type: Type of content (text, code, etc.)
        """
        self.context.append({
            "type": content_type,
            "content": content
        })
        return {"status": "success", "message": "Context added successfully"}
    
    def clear_context(self):
        """Clear all stored context"""
        self.context = []
        return {"status": "success", "message": "Context cleared successfully"}
    
    def set_model_preference(self, model: str):
        """Set preferred model to use (openai or gemini)"""
        if model.lower() in ["openai", "gemini"]:
            self.model_preference = model.lower()
            return {"status": "success", "message": f"Model preference set to {model}"}
        else:
            return {"status": "error", "message": "Invalid model choice. Use 'openai' or 'gemini'"}
    
    def format_prompt(self, question: str) -> str:
        """Format the prompt with all context and the question"""
        prompt = "You are an AI assistant helping with a software project. "
        prompt += "Please answer the following question based on the context provided:\n\n"
        
        # Add all context
        for item in self.context:
            content_type = item["type"]
            content = item["content"]
            
            if content_type == "code":
                prompt += f"CODE:\n```\n{content}\n```\n\n"
            else:
                prompt += f"CONTEXT:\n{content}\n\n"
        
        # Add the question
        prompt += f"QUESTION: {question}\n\n"
        prompt += "Provide a clear, accurate, and helpful answer. If you need to reference code, be specific."
        
        return prompt
    
    async def ask_openai(self, prompt: str) -> str:
        """Get answer from OpenAI"""
        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-4-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2000,
                temperature=0.2
            )
            return response.choices[0].message.content
        except Exception as e:
            # Fallback to Gemini if available
            if GEMINI_API_KEY:
                return await self.ask_gemini(prompt)
            return f"Error with OpenAI API: {str(e)}"
    
    async def ask_gemini(self, prompt: str) -> str:
        """Get answer from Gemini"""
        try:
            model = genai.GenerativeModel('gemini-pro')
            response = await model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            # Fallback to OpenAI if available
            if OPENAI_API_KEY:
                return await self.ask_openai(prompt)
            return f"Error with Gemini API: {str(e)}"
    
    async def ask_question(self, question: str) -> Dict:
        """
        Process a question and return an answer
        
        Args:
            question: The question to answer
            
        Returns:
            Dict with answer and status
        """
        if not self.context and not question:
            return {
                "status": "error",
                "message": "No context or question provided",
                "answer": None
            }
        
        prompt = self.format_prompt(question)
        
        try:
            # Use preferred model or fallback
            if self.model_preference == "openai" and OPENAI_API_KEY:
                answer = await self.ask_openai(prompt)
            elif self.model_preference == "gemini" and GEMINI_API_KEY:
                answer = await self.ask_gemini(prompt)
            elif OPENAI_API_KEY:
                answer = await self.ask_openai(prompt)
            elif GEMINI_API_KEY:
                answer = await self.ask_gemini(prompt)
            else:
                return {
                    "status": "error",
                    "message": "No API keys configured for either OpenAI or Gemini",
                    "answer": None
                }
                
            return {
                "status": "success", 
                "answer": answer
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error processing question: {str(e)}",
                "answer": None
            }

# Create a singleton instance
qa_system = ProjectQASystem()

# Route for serving Flask app home page
@app.route("/", methods=["GET"])
def home():
    return ({"message": "Welcome to the File Summarization and Project Q&A API!"})

# Existing file summarization route
@app.route("/file-summarization", methods=["POST"])
def file_summarization():
    """
    Route to handle file upload and summarization.
    """
    # Check if a file is uploaded
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    # Check if the file has an allowed extension
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    try:
        # Secure the filename
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

        # Save the uploaded file
        file.save(file_path)

        # Summarize the file content
        summarizer = FileSummarization()
        summary = summarizer.summarize_code(file_path)

        # Clean up: Delete the uploaded file after processing
        os.remove(file_path)

        if summary:
            return jsonify({"summary": summary})
        else:
            return jsonify({"error": "Failed to summarize the file"}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Updated speech-to-text route
@app.route("/speech-text", methods=["POST"])
def speech_to_text():
    """
    Route to handle speech-to-text conversion.
    """
    # Check if an audio file is uploaded
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files["audio"]

    try:
        # Save the uploaded audio file
        filename = secure_filename(audio_file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        audio_file.save(file_path)

        # Convert speech to text
        text = speech_text_converter.speech_to_text(file_path)

        # Clean up: Delete the uploaded file after processing
        os.remove(file_path)

        if text:
            return jsonify({"text": text})
        else:
            return jsonify({"error": "Failed to recognize speech"}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Existing command interpretation route
@app.route("/", methods=["POST"])
def interpret_and_execute():
    data = request.json
    command = data.get("command")

    if not command:
        return jsonify({"error": "No command provided"}), 400

    result = converter.interpret_and_execute(command)
    return jsonify({"result": result})

# New Routes for Q&A System

@app.route("/qa/ask", methods=["POST"])
def ask_question():
    """Ask a question about the project context"""
    data = request.json
    question = data.get("question")
    
    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    # Run in asyncio event loop
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(qa_system.ask_question(question))
    
    if result["status"] == "error":
        return jsonify({"error": result["message"]}), 400
    
    return jsonify({"answer": result["answer"]})

@app.route("/qa/context/add", methods=["POST"])
def add_context():
    """Add context (code, description, etc.) for the Q&A system"""
    data = request.json
    content = data.get("content")
    content_type = data.get("content_type", "text")
    
    if not content:
        return jsonify({"error": "No content provided"}), 400
    
    result = qa_system.add_context(content, content_type)
    return jsonify(result)

@app.route("/qa/context/clear", methods=["POST"])
def clear_context():
    """Clear all stored context in the Q&A system"""
    result = qa_system.clear_context()
    return jsonify(result)

@app.route("/qa/model/set", methods=["POST"])
def set_model():
    """Set the preferred LLM model (openai or gemini)"""
    data = request.json
    model = data.get("model")
    
    if not model:
        return jsonify({"error": "No model specified"}), 400
    
    result = qa_system.set_model_preference(model)
    
    if result["status"] == "error":
        return jsonify({"error": result["message"]}), 400
    
    return jsonify(result)

@app.route("/qa/file/upload", methods=["POST"])
def upload_file_to_context():
    """Upload a file and add its content to the Q&A context"""
    # Check if a file is uploaded
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    # Check if the file has an allowed extension
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    try:
        # Secure the filename
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

        # Save the uploaded file
        file.save(file_path)

        # Read the file content
        with open(file_path, 'r') as f:
            content = f.read()

        # Add the content to the Q&A context
        content_type = "code" if filename.rsplit(".", 1)[1].lower() in ["py", "java", "js", "html", "css"] else "text"
        qa_system.add_context(content, content_type)

        # Clean up: Delete the uploaded file after processing
        os.remove(file_path)

        return jsonify({"status": "success", "message": f"File {filename} added to context"})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)