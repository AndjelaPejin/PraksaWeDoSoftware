import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

export default function TrainingForm({ onTrainingAdded }) {
  const [newTraining, setNewTraining] = useState({
    type: '',
    duration: '',
    caloriesBurned: '',
    intensity: '',
    tiredness: '',
    notes: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining({ ...newTraining, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newTraining),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      onTrainingAdded(data);
    } catch (error) {
      console.error('Error adding training:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          name="type"
          value={newTraining.type}
          onChange={handleInputChange}
          label="Type"
        >
          <MenuItem value="CARDIO">Cardio</MenuItem>
          <MenuItem value="STRENGTH">Strength</MenuItem>
          <MenuItem value="STRETCHING">Stretching</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        id="duration"
        name="duration"
        label="Duration"
        value={newTraining.duration}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="caloriesBurned"
        name="caloriesBurned"
        label="Calories Burned"
        value={newTraining.caloriesBurned}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="intensity"
        name="intensity"
        label="Intensity"
        value={newTraining.intensity}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="tiredness"
        name="tiredness"
        label="Tiredness"
        value={newTraining.tiredness}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="notes"
        name="notes"
        label="Notes"
        value={newTraining.notes}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        id="date"
        name="date"
        label="Date"
        type="date"
        value={newTraining.date}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        id="time"
        name="time"
        label="Time"
        type="time"
        value={newTraining.time}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
    </Box>
  );
}

