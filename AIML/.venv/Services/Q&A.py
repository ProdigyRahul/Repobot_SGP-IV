import os
import json
from typing import Dict, List, Optional, Union
import google.generativeai as genai
import openai
from dotenv import load_dotenv


load_dotenv()

# Initialize API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure APIs
openai.api_key = OPENAI_API_KEY
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class ProjectQASystem:
    def __init__(self):
        self.context = []
        self.model_preference = "openai"  
        
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
        
    
        for item in self.context:
            content_type = item["type"]
            content = item["content"]
            
            if content_type == "code":
                prompt += f"CODE:\n```\n{content}\n```\n\n"
            else:
                prompt += f"CONTEXT:\n{content}\n\n"
        
    
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