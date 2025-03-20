import os
import speech_recognition as sr
from langchain_community.llms import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from github import Github
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class SpeechToTextConverter:
    def __init__(self):
        # Initialize GitHub API
        self.GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
        self.g = Github(self.GITHUB_TOKEN)

        # Initialize LangChain
        self.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        if not self.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY environment variable is not set.")

        self.llm = OpenAI(openai_api_key=self.OPENAI_API_KEY, temperature=0.7)

        # Define a prompt template for LangChain
        self.prompt_template = PromptTemplate(
            input_variables=["command"],
            template="You are a GitHub repository management assistant. The user has given the following command: {command}. Interpret the command and provide the appropriate GitHub API action."
        )

        # Initialize the LLMChain
        self.chain = LLMChain(llm=self.llm, prompt=self.prompt_template)

    def speech_to_text(self):
        recognizer = sr.Recognizer()
        with sr.Microphone() as source:
            print("Listening...")
            audio = recognizer.listen(source)
            try:
                text = recognizer.recognize_google(audio)
                print(f"Recognized: {text}")
                return text
            except sr.UnknownValueError:
                print("Google Speech Recognition could not understand audio")
                return None
            except sr.RequestError as e:
                print(f"Could not request results from Google Speech Recognition service; {e}")
                return None

    def interpret_and_execute(self, command):
        # Use LangChain to interpret the command
        interpreted_command = self.chain.run(command=command)
        print(f"Interpreted Command: {interpreted_command}")

        # Example: Create a new repository
        if "create repository" in interpreted_command.lower():
            repo_name = interpreted_command.split("create repository")[1].strip()
            user = self.g.get_user()
            repo = user.create_repo(repo_name)
            print(f"Repository '{repo_name}' created successfully!")
            return f"Repository '{repo_name}' created successfully!"
        else:
            print("Command not recognized or not implemented yet.")
            return "Command not recognized or not implemented yet."

