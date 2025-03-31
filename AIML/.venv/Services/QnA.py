import google.generativeai as genai
import requests
from typing import List, Optional
from utils.config import settings
from utils.models import ChatRequest, ChatResponse, RepositoryContext

class RepoBotAssistant:
    def __init__(self):
     
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    def fetch_github_repo_context(self, repo_url: str) -> Optional[RepositoryContext]:
        """
        Fetch repository metadata from GitHub API
        """
        try:
       
            parts = repo_url.strip('/').split('/')
            owner, repo = parts[-2], parts[-1]
            
       
            api_url = f"https://api.github.com/repos/{owner}/{repo}"
            
            
            headers = {'Authorization': f'token {settings.GITHUB_TOKEN}'}
            response = requests.get(api_url, headers=headers)
            
            if response.status_code == 200:
                repo_data = response.json()
                return RepositoryContext(
                    repo_name=repo_data['full_name'],
                    description=repo_data.get('description'),
                    languages=self._get_repo_languages(owner, repo),
                    last_updated=repo_data['updated_at']
                )
        except Exception as e:
            print(f"Error fetching repo context: {e}")
        return None

    def _get_repo_languages(self, owner: str, repo: str) -> List[str]:
        """
        Fetch programming languages used in the repository
        """
        try:
            headers = {'Authorization': f'token {settings.GITHUB_TOKEN}'}
            url = f"https://api.github.com/repos/{owner}/{repo}/languages"
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                return list(response.json().keys())
        except Exception as e:
            print(f"Error fetching languages: {e}")
        return []

    def generate_response(self, request: ChatRequest) -> ChatResponse:
        """
        Generate AI-powered response about the repository
        """
    
        context_str = ""
        if request.repo_url:
            repo_context = self.fetch_github_repo_context(request.repo_url)
            if repo_context:
                context_str = str(repo_context)

    
        full_prompt = f"""
        Repository Context: {context_str}
        User Query: {request.query}
        
        Please provide a helpful, concise, and informative response.
        """

        try:
           
            response = self.model.generate_content(full_prompt)
            
            return ChatResponse(
                response=response.text,
                confidence_score=0.85,
                sources=[request.repo_url] if request.repo_url else []
            )
        
        except Exception as e:
            return ChatResponse(
                response=f"Sorry, I couldn't process your query. Error: {str(e)}",
                confidence_score=0.0
            )

repo_bot = RepoBotAssistant()