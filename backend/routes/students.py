from flask import Blueprint, request, jsonify
from datetime import datetime, date
from models import db, Student
import re

students_bp = Blueprint('students', __name__)

# Helper: validate email
def is_valid_email(email):
    parts = email.split('@')
    if len(parts) != 2:
        return False
    local, domain = parts
    if not local or not domain:
        return False
    if '.' not in domain:
        return False
    domain_parts = domain.split('.')
    if len(domain_parts) < 2:
        return False
    for part in domain_parts:
        if not part:
            return False
    return True

# Helper: validate age >= 10
def is_valid_age(dob):
    today = date.today()
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    return age >= 10

@students_bp.route('/', methods=['POST'])
def add_student():
    data = request.get_json()
    required = ['first_name', 'family_name', 'date_of_birth', 'email']
    if not all(field in data and data[field] for field in required):
        return jsonify({'error': 'All fields are required.'}), 400
    if not is_valid_email(data['email']):
        return jsonify({'error': 'Invalid email address.'}), 400
    try:
        dob = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
    except Exception:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400
    if not is_valid_age(dob):
        return jsonify({'error': 'Student must be at least 10 years old.'}), 400
    if Student.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists.'}), 400
    student = Student(
        first_name=data['first_name'],
        family_name=data['family_name'],
        date_of_birth=dob,
        email=data['email']
    )
    db.session.add(student)
    db.session.commit()
    return jsonify({'message': 'Student added successfully.'}), 201

@students_bp.route('/', methods=['GET'])
def list_students():
    students = Student.query.all()
    return jsonify([
        {
            'id': s.id,
            'first_name': s.first_name,
            'family_name': s.family_name,
            'date_of_birth': s.date_of_birth.strftime('%Y-%m-%d'),
            'email': s.email
        } for s in students
    ])

@students_bp.route('/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    return jsonify({'message': 'Student deleted successfully.'}) 