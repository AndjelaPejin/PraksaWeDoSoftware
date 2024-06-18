import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import MonthlySummaryForm from './MonthlySummaryForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MonthlySummary() {
  const [summary, setSummary] = useState([]);

  const handleMonthSelected = async (year, month) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8090/training/monthly-summary?year=${year}&month=${month}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      toast.error("No trainings found for the specified year and month.");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <ToastContainer />
      <MonthlySummaryForm onMonthSelected={handleMonthSelected} />
      {summary.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {summary.map((weekSummary) => (
            <Grid item xs={12} sm={6} md={4} key={weekSummary.week}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Week: {weekSummary.week}</Typography>
                  <Typography>Total Duration: {weekSummary.totalDuration} mins</Typography>
                  <Typography>Number of trainings: {weekSummary.totalCount}</Typography>
                  <Typography>Avg Intensity: {weekSummary.avgIntensity.toFixed(2)}</Typography>
                  <Typography>Avg Tiredness: {weekSummary.avgTiredness.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
