import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, TextField, Grid, Card, CardContent, CardActions, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Divider, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import TrainingForm from './TrainingForm'; 
import TrainingDetails from './TrainingDetails';
import './homepage.css';

export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [trainings, setTrainings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8090/training', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleClose();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTrainings = trainings.filter(training =>
    training.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrikazi = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8090/training/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedTraining(data);
      setModalOpen(true); 
    } catch (error) {
      console.error('Error fetching training details:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTraining(null);
  };
  

  const handleOverview = () => {
    setSelectedMenu('overview');
  };

  const handleAddNewTraining = () => {
    setSelectedMenu('addNewTraining');
  };

  const handleTrainingAdded = (newTraining) => {
    setTrainings([...trainings, newTraining]);
    setSelectedMenu('overview');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, display: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000', 
            color: '#fff', 
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button onClick={handleOverview}>
            <ListItemIcon>
              <DashboardIcon style={{ color: '#fff' }} /> {}
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem button onClick={handleAddNewTraining}>
            <ListItemIcon>
              <AddIcon style={{ color: '#fff' }} /> {}
            </ListItemIcon>
            <ListItemText primary="Add New Training" />
          </ListItem>
          {/* Add more ListItem components for other menu items */}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 30 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {selectedMenu !== 'addNewTraining' ? (
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ flex: 1, marginRight: 2 }}
            />
          ) : (
            <Box sx={{ flex: 1, marginRight: 2 }} /> 
          )}
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ fontSize: 40 }} 
              >
                <AccountCircle fontSize="inherit" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Box>
        <Container sx={{ mt: 2 }}>
          {selectedMenu === 'overview' && (
            <Grid container spacing={2}>
              {filteredTrainings.map((training) => (
                <Grid item xs={12} sm={6} md={4} key={training.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {training.type}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handlePrikazi(training.id)} size="small">Prikaži</Button>
                      <Button>Izmeni</Button>
                      <Button>Obriši</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedMenu === 'addNewTraining' && (
            <TrainingForm onTrainingAdded={handleTrainingAdded} />
          )}
        </Container>
        {selectedTraining && (
          <TrainingDetails
            trainingDetails={selectedTraining}
            open={modalOpen}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </Box>
  );
}