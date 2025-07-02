from app import db

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    family_name = db.Column(db.String(255), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    results = db.relationship('Result', back_populates='student', cascade='all, delete-orphan')

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    results = db.relationship('Result', back_populates='course', cascade='all, delete-orphan')

class Result(db.Model):
    __tablename__ = 'results'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id', ondelete='CASCADE'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    score = db.Column(db.String(255), nullable=False)  # A, B, C, D, E, F

    student = db.relationship('Student', back_populates='results')
    course = db.relationship('Course', back_populates='results')

    __table_args__ = (
        db.UniqueConstraint('student_id', 'course_id', name='unique_student_course'),
    )
