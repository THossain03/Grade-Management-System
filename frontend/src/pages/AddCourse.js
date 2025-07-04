import React, { useState } from 'react';
import { Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import CourseForm from '../components/CourseForm';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (form, resetForm) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/courses/`, form);
      setSnackbar({ open: true, message: 'Course added successfully!', severity: 'success' });
      resetForm({ name: '' });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.error || 'Error adding course.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Add New Course
        </Typography>
        <CourseForm onSubmit={handleSubmit} loading={loading} submitVariant="contained" />
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCourse;
