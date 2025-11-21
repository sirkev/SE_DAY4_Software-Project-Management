FROM python:3.10-slim

WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy configuration files
COPY pyproject.toml poetry.lock* README.md ./

# Configure poetry to not create a virtual environment
RUN poetry config virtualenvs.create false

# Install dependencies
RUN poetry install --no-interaction --no-ansi --no-root

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
