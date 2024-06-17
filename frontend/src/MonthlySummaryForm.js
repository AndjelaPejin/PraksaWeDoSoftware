import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

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
      alert('Please enter valid year and month values');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Enter Year and Month</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        type="text"
        error={!!errors.year}
        helperText={errors.year}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        type="text"
        error={!!errors.month}
        helperText={errors.month}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Get Summary</Button>
    </Box>
  );
}
