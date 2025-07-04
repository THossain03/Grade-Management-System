import React, { useEffect, useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Table from '../components/Table';
import Paginator from '../components/Paginator';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/students/`);
      setStudents(res.data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch students.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
      setSnackbar({ open: true, message: 'Student deleted.', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete student.', severity: 'error' });
    }
  };

  const columns = [
    { label: 'Name & Family name', render: (s) => `${s.first_name} ${s.family_name}` },
    { label: 'DOB', render: (s) => {
        const [year, month, day] = s.date_of_birth.split('-'); // Parse the date string as a local date, not UTC.
        return new Date(year, month - 1, day).toLocaleDateString();
      }
    },
    { label: 'Email', field: 'email' },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Students List
      </Typography>
      <Table
        columns={columns}
        data={students}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <Paginator
        count={students.length}
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

export default StudentList;
