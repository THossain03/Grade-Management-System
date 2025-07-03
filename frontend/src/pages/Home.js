import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GradeIcon from '@mui/icons-material/Grade';

const links = [
  { text: 'Add New Students', path: '/add-student', icon: <PersonIcon sx={{ fontSize: 40 }} />, add: true },
  { text: 'Students List', path: '/students', icon: <PersonIcon sx={{ fontSize: 40 }} /> },
  { text: 'Add New Courses', path: '/add-course', icon: <MenuBookIcon sx={{ fontSize: 40 }} />, add: true },
  { text: 'Courses List', path: '/courses', icon: <MenuBookIcon sx={{ fontSize: 40 }} /> },
  { text: 'Add New Results', path: '/add-result', icon: <GradeIcon sx={{ fontSize: 40 }} />, add: true },
  { text: 'Results List', path: '/results', icon: <GradeIcon sx={{ fontSize: 40 }} /> },
];

const Home = () => (
  <Box sx={{ mt: 4, textAlign: 'center' }}>
    <Typography variant="h4" fontWeight={700} gutterBottom>
      Student Result Management System
    </Typography>
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      {links.map((link) => (
        <Grid item xs={12} sm={6} md={4} key={link.text}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              component={Link}
              to={link.path}
              variant="outlined"
              size="large"
              sx={{ width: '100%', fontWeight: 600, fontSize: '1.1rem', py: 2, color: 'primary.main', borderColor: 'primary.main', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
            >
              <Box sx={{ position: 'relative', mb: 0.5 }}>
                {link.icon}
                {link.add && (
                  <AddIcon sx={{ position: 'absolute', top: 0, right: -8, fontSize: 18, color: 'primary.main', background: '#fff', borderRadius: '50%' }} />
                )}
              </Box>
              {link.text}
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Home;
