import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import ResultForm from '../components/ResultForm';

const AddResult = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          axios.get('/api/students/'),
          axios.get('/api/courses/')
        ]);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      } catch {
        setSnackbar({ open: true, message: 'Failed to load students or courses.', severity: 'error' });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (form, resetForm) => {
    setLoading(true);
    try {
      await axios.post('/api/results/', form);
      setSnackbar({ open: true, message: 'Result added successfully!', severity: 'success' });
      resetForm({ student_id: '', course_id: '', score: '' });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.error || 'Error adding result.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Add New Result
        </Typography>
        <ResultForm students={students} courses={courses} onSubmit={handleSubmit} loading={loading} submitVariant="contained" />
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

export default AddResult;
