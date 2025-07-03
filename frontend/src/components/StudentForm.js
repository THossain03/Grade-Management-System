import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const getAge = (dob) => {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const StudentForm = ({ initialValues = { first_name: '', family_name: '', date_of_birth: '', email: '' }, onSubmit, loading, submitVariant = 'contained' }) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const errs = {};
    if (!form.first_name) errs.first_name = 'First name is required.';
    if (!form.family_name) errs.family_name = 'Family name is required.';
    if (!form.date_of_birth) errs.date_of_birth = 'Date of birth is required.';
    else if (getAge(form.date_of_birth) < 10) errs.date_of_birth = 'Student must be at least 10 years old.';
    if (!form.email) errs.email = 'Email is required.';
    else if (!validateEmail(form.email)) errs.email = 'Invalid email address.';
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
        label="First name"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.first_name}
        helperText={errors.first_name}
      />
      <TextField
        label="Family name"
        name="family_name"
        value={form.family_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.family_name}
        helperText={errors.family_name}
      />
      <TextField
        label="Date of birth"
        name="date_of_birth"
        type="date"
        value={form.date_of_birth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
        error={!!errors.date_of_birth}
        helperText={errors.date_of_birth}
      />
      <TextField
        label="Email address"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.email}
        helperText={errors.email}
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

export default StudentForm;
