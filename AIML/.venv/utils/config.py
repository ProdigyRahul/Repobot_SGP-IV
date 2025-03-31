import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings:
    # Gemini API configuration
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    
    # GitHub configuration
    GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', '')
    
    # Chatbot settings
    MAX_CONTEXT_LENGTH = 4096
    DEFAULT_TEMPERATURE = 0.7
    
    # Logging and error handling
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    
    # Validate critical configurations
    def validate_config(self):
        if not self.GEMINI_API_KEY:
            raise ValueError("Gemini API Key is required")
        if not self.GITHUB_TOKEN:
            raise ValueError("GitHub Token is required")

# Create a singleton settings instance
settings = Settings()
settings.validate_config()