import os
from typing import Optional
import google.generativeai as genai
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

class FileSummarization:
    def __init__(self):
      
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        self.model = genai.GenerativeModel('gemini-1.5-pro')

    def _read_file_content(self, file_path: str) -> str:
        """
        Read file content safely with large file support
        """
        try:
          
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
         
            if len(content) > 50000:
                text_splitter = RecursiveCharacterTextSplitter(
                    chunk_size=50000, 
                    chunk_overlap=1000
                )
                chunks = text_splitter.split_text(content)
                content = ' '.join(chunks[:3])  
            
            return content
        except Exception as e:
            raise RuntimeError(f"Error reading file: {e}")

    def summarize_file(self, file_path: str) -> str:
        """
        Generate a comprehensive file summary using Gemini
        """
        try:
         
            file_content = self._read_file_content(file_path)
       
            file_extension = os.path.splitext(file_path)[1]
            
           
            prompt = f"""
            Analyze the following {file_extension} code file and provide a modern, professional summary:

            1. 🔍 Overview: Give a high-level description of the file's purpose
            2. 🧩 Key Components: List and explain the main functions/classes
            3. 🚀 Technical Highlights: Discuss notable technical implementations
            4. 📌 Key Technologies/Frameworks Used
            5. ⚠️ Potential Improvements or Observations

            File Content:
            {file_content[:10000]}  # Limit to first 10000 chars
            """
            
  
            response = self.model.generate_content(prompt)
            
            return response.text
        
        except Exception as e:
            return f"Summarization Error: {str(e)}"