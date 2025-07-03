import React from 'react';
import { Box, Select, MenuItem, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Paginator = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      <Box>
        <Typography component="span" sx={{ mr: 1 }}>Rows per page:</Typography>
        <Select
          value={rowsPerPage}
          onChange={e => onRowsPerPageChange(Number(e.target.value))}
          size="small"
        >
          {rowsPerPageOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() => onPageChange(Math.max(page - 1, 0))}
          disabled={page === 0}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography component="span" sx={{ mx: 1 }}>
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </Typography>
        <IconButton
          onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Paginator; 