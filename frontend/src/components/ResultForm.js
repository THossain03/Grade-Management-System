import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const scores = ['A', 'B', 'C', 'D', 'E', 'F'];

const ResultForm = ({ students = [], courses = [], onSubmit, loading, submitVariant = 'contained' }) => {
  const [form, setForm] = useState({ student_id: '', course_id: '', score: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const errs = {};
    if (!form.student_id) errs.student_id = 'Student is required.';
    if (!form.course_id) errs.course_id = 'Course is required.';
    if (!form.score) errs.score = 'Score is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form, setForm);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        select
        label="Course Name"
        name="course_id"
        value={form.course_id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.course_id}
        helperText={errors.course_id}
      >
        {courses.map((c) => (
          <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Student Name"
        name="student_id"
        value={form.student_id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.student_id}
        helperText={errors.student_id}
      >
        {students.map((s) => (
          <MenuItem key={s.id} value={s.id}>{s.first_name} {s.family_name}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Score"
        name="score"
        value={form.score}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.score}
        helperText={errors.score}
      >
        {scores.map((score) => (
          <MenuItem key={score} value={score}>{score}</MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        variant={submitVariant}
        color="primary"
        fullWidth
        sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default ResultForm;
