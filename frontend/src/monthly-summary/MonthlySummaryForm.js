import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MonthlySummaryForm({ onMonthSelected }) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.year = year > 0 ? '' : 'Year must be greater than 0';
    tempErrors.month = month >= 1 && month <= 12 ? '' : 'Month must be between 1 and 12';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onMonthSelected(year, month);
    } else {
      toast.error('Please enter valid year and month values');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'center',
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '400px' }}>
        <Typography variant="h6" gutterBottom>Enter Year and Month</Typography>
        <TextField
          margin="normal"
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="text"
          error={!!errors.year}
          helperText={errors.year}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          type="text"
          error={!!errors.month}
          helperText={errors.month}
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Get Summary</Button>
      </Box>
    </Box>
  );
}

