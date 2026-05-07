import os
from dotenv import load_dotenv

from langchain_mistralai.chat_models import ChatMistralAI

load_dotenv()

llm = ChatMistralAI(
    model="mistral-small-latest",
    temperature=0.7,
    api_key=os.getenv("MISTRALAI_API_KEY")
)

def generate_response(prompt: str) -> str:
    response = llm.invoke(prompt)
    return response.content