import os
from langchain_openai import OpenAI 
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class FileSummarization:
    def __init__(self):
        # Initialize Gemini API (via GooglePalm)
        self.GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        if not self.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY environment variable is not set.")

        self.llm = GooglePalm(google_api_key=self.GEMINI_API_KEY, temperature=0.7)

    def summarize_code(self, file_path):
        """
        Summarize the code from the uploaded file.
        """
        try:
            # Read the file content
            with open(file_path, "r", encoding="utf-8") as file:
                code_content = file.read()

            # Split the code into smaller chunks for summarization
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,  # Adjust chunk size as needed
                chunk_overlap=200,  # Overlap to maintain context
            )
            texts = text_splitter.split_text(code_content)

            # Convert text chunks into LangChain Documents
            docs = [Document(page_content=text) for text in texts]

            # Load the summarization chain
            chain = load_summarize_chain(self.llm, chain_type="map_reduce")

            # Summarize the code
            summary = chain.run(docs)
            return summary

        except Exception as e:
            print(f"Error summarizing code: {e}")
            return None