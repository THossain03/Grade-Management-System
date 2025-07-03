from flask import Blueprint, request, jsonify
from models import db, Result, Student, Course

results_bp = Blueprint('results', __name__)

@results_bp.route('/', methods=['POST'])
def add_result():
    data = request.get_json()
    required = ['student_id', 'course_id', 'score']
    if not all(field in data and data[field] for field in required):
        return jsonify({'error': 'All fields are required.'}), 400
    if data['score'] not in ['A', 'B', 'C', 'D', 'E', 'F']:
        return jsonify({'error': 'Invalid score value.'}), 400
    # Check student and course exist
    student = Student.query.get(data['student_id'])
    course = Course.query.get(data['course_id'])
    if not student or not course:
        return jsonify({'error': 'Student or course not found.'}), 404
    # Ensure unique (student, course)
    if Result.query.filter_by(student_id=data['student_id'], course_id=data['course_id']).first():
        return jsonify({'error': 'Result for this student and course already exists.'}), 400
    result = Result(
        student_id=data['student_id'],
        course_id=data['course_id'],
        score=data['score']
    )
    db.session.add(result)
    db.session.commit()
    return jsonify({'message': 'Result added successfully.'}), 201

@results_bp.route('/', methods=['GET'])
def list_results():
    results = Result.query.all()
    return jsonify([
        {
            'id': r.id,
            'student_id': r.student_id,
            'student_name': f"{r.student.first_name} {r.student.family_name}",
            'course_id': r.course_id,
            'course_name': r.course.name,
            'score': r.score
        } for r in results
    ])

@results_bp.route('/<int:result_id>', methods=['DELETE'])
def delete_result(result_id):
    result = Result.query.get_or_404(result_id)
    db.session.delete(result)
    db.session.commit()
    return jsonify({'message': 'Result deleted successfully.'}) 