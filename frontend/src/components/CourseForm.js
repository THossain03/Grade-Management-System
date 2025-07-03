import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const CourseForm = ({ initialValues = { name: '' }, onSubmit, loading, submitVariant = 'contained' }) => {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Course name is required.');
      return;
    }
    onSubmit(form, setForm);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Course name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!error}
        helperText={error}
      />
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

export default CourseForm;
