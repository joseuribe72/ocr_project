from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from database import start_db, db_update, db_retrieve
import keras_ocr

import os

file_path = os.path.abspath(__file__)
work_dir = os.path.dirname(file_path)
UPLOAD_FOLDER = os.path.join(work_dir, "static", "files")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_FILES = {"png", "jpg", "jpeg", "svg",}
generated_text = "hello world"

start_db()
detector = keras_ocr.detection.Detector()
recognizer = keras_ocr.recognition.Recognizer()
pipeline = keras_ocr.pipeline.Pipeline(detector, recognizer)
def get_text(results):
    s = ""
    for result in results:
        for text in result:
            s = s + text[0] + " "
    if not s:
        return "Could not process!"
    else:
        return s

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
CORS(app)

def allowed_file(filename):
    """This ensure only files with an extension in the ALLOWED_FILES is accepted."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_FILES

@app.route("/")
def home():
    return "hello world!"

@app.route("/store", methods=['POST'])
def process_image():
    """This receives an image and stores it in the files folder."""
    file = request.files['file']
    if file and allowed_file(file.filename):
        _, extension = os.path.splitext(file.filename)
        temp_file = "temp" + extension
        filename = secure_filename(temp_file)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        db_update("Processing...")
    
        img_path = os.path.join(UPLOAD_FOLDER, temp_file)
        img = [keras_ocr.tools.read(img_path)]
        results = pipeline.recognize(img)
        text = get_text(results)

        db_update(text)

    return 'file received', 200

@app.route("/update-output")
def update_output():
    """Updates the output box on the frontend with generate text."""
    return db_retrieve()
 

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)