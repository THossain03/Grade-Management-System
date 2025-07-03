import React, { useEffect, useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Table from '../components/Table';
import Paginator from '../components/Paginator';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses/');
      setCourses(res.data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch courses.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`);
      setCourses(courses.filter((c) => c.id !== id));
      setSnackbar({ open: true, message: 'Course deleted.', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete course.', severity: 'error' });
    }
  };

  const columns = [
    { label: 'Course Name', field: 'name' },
  ];

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Courses List
      </Typography>
      <Table
        columns={columns}
        data={courses}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <Paginator
        count={courses.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(n) => { setRowsPerPage(n); setPage(0); }}
      />
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

export default CourseList;
