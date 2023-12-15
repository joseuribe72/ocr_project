FROM python:3.11.4-slim-bullseye
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
WORKDIR /app
COPY . /app
RUN pip install flask
RUN pip install flask-cors
RUN pip install tensorflow
RUN pip install keras-ocr
EXPOSE 8080
CMD ["python", "flask_server.py"]