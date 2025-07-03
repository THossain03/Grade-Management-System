import React, { useState } from 'react';
import { Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (form, resetForm) => {
    setLoading(true);
    try {
      await axios.post('/api/students/', form);
      setSnackbar({ open: true, message: 'Student added successfully!', severity: 'success' });
      resetForm({ first_name: '', family_name: '', date_of_birth: '', email: '' });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.error || 'Error adding student.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Add New Students
        </Typography>
        <StudentForm onSubmit={handleSubmit} loading={loading} submitVariant="contained" />
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

export default AddStudent;
