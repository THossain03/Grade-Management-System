from flask import Blueprint, request, jsonify
from models import db, Course

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/', methods=['POST'])
def add_course():
    data = request.get_json()
    if not data.get('name'):
        return jsonify({'error': 'Course name is required.'}), 400
    if Course.query.filter_by(name=data['name']).first():
        return jsonify({'error': 'Course name already exists.'}), 400
    course = Course(name=data['name'])
    db.session.add(course)
    db.session.commit()
    return jsonify({'message': 'Course added successfully.'}), 201

@courses_bp.route('/', methods=['GET'])
def list_courses():
    courses = Course.query.all()
    return jsonify([
        {
            'id': c.id,
            'name': c.name
        } for c in courses
    ])

@courses_bp.route('/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'message': 'Course deleted successfully.'}) 