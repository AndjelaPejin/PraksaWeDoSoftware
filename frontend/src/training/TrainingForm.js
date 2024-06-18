import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining({ ...newTraining, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};

    if (!Number.isInteger(parseInt(newTraining.duration)) || parseInt(newTraining.duration) <= 0) {
      tempErrors.duration = 'Duration must be a positive number';
    }

    if (!Number.isInteger(parseInt(newTraining.caloriesBurned)) || parseInt(newTraining.caloriesBurned) <= 0) {
      tempErrors.caloriesBurned = 'Calories Burned must be a positive number';
    }

    const intensityValue = parseInt(newTraining.intensity);
    if (!Number.isInteger(intensityValue) || intensityValue < 1 || intensityValue > 10) {
      tempErrors.intensity = 'Intensity must be a number between 1 and 10';
    }

    const tirednessValue = parseInt(newTraining.tiredness);
    if (!Number.isInteger(tirednessValue) || tirednessValue < 1 || tirednessValue > 10) {
      tempErrors.tiredness = 'Tiredness must be a number between 1 and 10';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { date, time, ...rest } = newTraining;
    const combinedDateTime = new Date(`${date}T${time}`);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...rest, createdDate: combinedDateTime }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      onTrainingAdded(data);
      toast.info('Training successfully added!');
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
        error={!!errors.duration}
        helperText={errors.duration}
      />
      <TextField
        fullWidth
        margin="normal"
        id="caloriesBurned"
        name="caloriesBurned"
        label="Calories Burned"
        value={newTraining.caloriesBurned}
        onChange={handleInputChange}
        error={!!errors.caloriesBurned}
        helperText={errors.caloriesBurned}
      />
      <TextField
        fullWidth
        margin="normal"
        id="intensity"
        name="intensity"
        label="Intensity"
        value={newTraining.intensity}
        onChange={handleInputChange}
        error={!!errors.intensity}
        helperText={errors.intensity}
      />
      <TextField
        fullWidth
        margin="normal"
        id="tiredness"
        name="tiredness"
        label="Tiredness"
        value={newTraining.tiredness}
        onChange={handleInputChange}
        error={!!errors.tiredness}
        helperText={errors.tiredness}
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

