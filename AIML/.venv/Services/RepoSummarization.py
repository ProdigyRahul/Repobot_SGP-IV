import requests
import os
from fastapi import HTTPException

GEMINI_MODEL = "gemini-1.5-pro"  
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") 

def fetch_repo_files(owner: str, repo: str):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents"
    headers = {
        "Authorization": f"token {os.getenv('GITHUB_TOKEN')}",
        "Accept": "application/vnd.github.v3+json"
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"Error fetching repo files: {str(e)}")


def fetch_file_content(file_url: str):
    try:
        response = requests.get(file_url, headers={"Accept": "application/vnd.github.v3.raw"})
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return "" 

def summarize_code(code: str):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is missing. Check your environment variables.")

    url = f"https://generativelanguage.googleapis.com/v1/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
    payload = {
        "contents": [{"role": "user", "parts": [{"text": f"Summarize this code:\n{code}"}]}]
    }
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "Summary unavailable")
    except requests.exceptions.RequestException as e:
        return f"Failed to generate summary: {str(e)}"

def get_repo_summary(owner: str, repo: str):
    files = fetch_repo_files(owner, repo)
    combined_code = ""

    for file in files:
 
        if file.get("type") == "file" and (file["name"].endswith(".js") or file["name"].endswith(".py")):
            content = fetch_file_content(file["download_url"])
            combined_code += f"\n// File: {file['name']}\n{content}\n"

    return summarize_code(combined_code)
