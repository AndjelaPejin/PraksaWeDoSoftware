import React from 'react';
import { Modal, Backdrop, Fade, Typography, Button, Box, Card, CardContent, CardActions } from '@mui/material';

export default function TrainingDetails({ trainingDetails, open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h5" gutterBottom>
            Training Details
          </Typography>
          {trainingDetails && (
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Type: {trainingDetails.type}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Duration: {trainingDetails.duration}
                </Typography>
                <Typography variant="body1">
                  Calories Burned: {trainingDetails.caloriesBurned}
                </Typography>
                <Typography variant="body1">
                  Intensity: {trainingDetails.intensity}
                </Typography>
                <Typography variant="body1">
                  Tiredness: {trainingDetails.tiredness}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Notes: {trainingDetails.notes}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Created Date: {new Date(trainingDetails.createdDate).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={onClose} color="primary">
                  Close
                </Button>
              </CardActions>
            </Card>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
