import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import MonthlySummaryForm from './MonthlySummaryForm';

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
      console.error('Error fetching summary:', error);
    }
  };

  return (
    <Box>
      <MonthlySummaryForm onMonthSelected={handleMonthSelected} />
      <List>
        {summary.map((weekSummary) => (
          <React.Fragment key={weekSummary.week}>
            <ListItem>
              <ListItemText
                primary={`Week: ${weekSummary.week}`}
                secondary={`Total Duration: ${weekSummary.totalDuration} mins, Total Count: ${weekSummary.totalCount}, Avg Intensity: ${weekSummary.avgIntensity.toFixed(2)}, Avg Tiredness: ${weekSummary.avgTiredness.toFixed(2)}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}


