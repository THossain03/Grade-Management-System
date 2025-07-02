from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from routes import api_bp
from models import *

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grade_mgmt.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
with app.app_context():
    db.create_all()
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)