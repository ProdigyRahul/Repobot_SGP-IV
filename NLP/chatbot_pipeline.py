# Chatbot processing logic (custom functions for NLP tasks)

# chatbot_pipeline.py
import spacy
from transformers import pipeline

class ChatbotPipeline:
    def __init__(self):
        # Load spaCy language model
        self.nlp = spacy.load("en_core_web_sm")
        # Load a pre-trained transformer model (e.g., sentiment analysis, QA)
        self.qa_model = pipeline("question-answering", model="distilbert-base-uncased")

    def preprocess_text(self, text):
        """Preprocess the input text (e.g., tokenization, cleaning)"""
        doc = self.nlp(text)
        tokens = [token.text for token in doc]
        return tokens

    def analyze_github_repo(self, query, repo_data):
        """
        Custom logic to process user queries like:
        - 'Tell me the most active contributor'
        - 'What is the size of this repo?'
        """
        # Example: Find answers based on repo_data
        if "most active contributor" in query:
            return "The most active contributor is XYZ (mock data)"
        elif "size" in query:
            return f"The repository size is {repo_data['size']} KB."
        return "Sorry, I can't answer that yet."

    def handle_query(self, user_query, repo_data):
        """Main function to handle user queries"""
        response = self.qa_model({"question": user_query, "context": repo_data})
        return response['answer']
