import React, { useEffect, useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Table from '../components/Table';
import Paginator from '../components/Paginator';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/results/`);
      setResults(res.data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to fetch results.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const columns = [
    { label: 'Course', field: 'course_name' },
    { label: 'Student', field: 'student_name' },
    { label: 'Score', field: 'score' },
  ];

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Results List
      </Typography>
      <Table
        columns={columns}
        data={results}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <Paginator
        count={results.length}
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

export default ResultList;
