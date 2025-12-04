FROM python:3.11-slim

WORKDIR /app
COPY ./app /app

RUN pip install --no-cache-dir fastapi uvicorn psycopg2-binary SQLAlchemy python-multipart passlib[bcrypt] python-jose

CMD ["python", "main.py"]
