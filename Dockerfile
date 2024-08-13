# Dockerize a django app with python 3.10.0
# Start from the official Python image
FROM python:3.10.0

# Set environment varibles
# CORS_ORIGIN all
ENV CORS_ORIGIN *
ENV PYTHONUNBUFFERED=1
ENV SECRET_KEY 46eaa0c6722fc1885b99c1b39f4c7517d7d7d25fee19e61087e2dbc904b0df01
ENV PORT=8000

# Set work directory
WORKDIR /app

# Copy project
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

