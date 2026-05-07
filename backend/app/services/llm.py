import os
from dotenv import load_dotenv
from langchain_mistralai.chat_models import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from app.models.ai_task import AITaskList

parser = PydanticOutputParser(pydantic_object=AITaskList)

load_dotenv()

llm = ChatMistralAI(
    model="mistral-small-latest",
    temperature=0.7,
    api_key=os.getenv("MISTRALAI_API_KEY")
)

prompt_template = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
                You are an intelligent daily planning assistant.
                Your job is to create realistic and relevant tasks ONLY from the user's input.
                Rules:
                - Do NOT invent specific office tasks unless mentioned.
                - Do NOT assume meetings, reports, or debugging work.
                - Break broad goals into actionable subtasks.
                - Balance workload realistically.
                - Include learning and health activities if mentioned.
                - Estimated time should be practical.
                - Avoid duplicate or overly generic tasks.
                - Generate between 4 and 7 tasks only.

                Generate structured daily tasks.
                {format_instructions}
            """
        ),
        (
            "human",
            "Plan tasks for this request: {user_input}"
        )
    ]
)


chain = (
    prompt_template
    | llm
    | parser
)


def generate_tasks(user_prompt: str):

    result = chain.invoke(
        {
            "user_input": user_prompt,
            "format_instructions": parser.get_format_instructions()
        }
    )

    return result.tasks