from flask import Blueprint

# Import and register blueprints from modular route files
from routes.students import students_bp
from routes.courses import courses_bp
from routes.results import results_bp

api_bp = Blueprint('api', __name__)

# Register blueprints for each resource
api_bp.register_blueprint(students_bp, url_prefix='/students')
api_bp.register_blueprint(courses_bp, url_prefix='/courses')
api_bp.register_blueprint(results_bp, url_prefix='/results')
