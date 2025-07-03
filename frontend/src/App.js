import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider, ThemeProvider, createTheme, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddCourse from './pages/AddCourse';
import AddResult from './pages/AddResult';
import AddStudent from './pages/AddStudent';
import CourseList from './pages/CourseList';
import Home from './pages/Home';
import ResultList from './pages/ResultList';
import StudentList from './pages/StudentList';
import Theme from './theme/Theme';

const drawerWidth = 240;

const navLinks = [
  { text: 'Home', path: '/' },
  { text: 'Add New Students', path: '/add-student' },
  { text: 'Students List', path: '/students' },
  { text: 'Add New Courses', path: '/add-course' },
  { text: 'Courses List', path: '/courses' },
  { text: 'Add New Results', path: '/add-result' },
  { text: 'Results List', path: '/results' },
];

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f4f6fa' },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    h6: { fontWeight: 700 },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const location = useLocation();

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>SRMS</Typography>
      </Toolbar>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Student Result Management System
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', backgroundColor: '#f4f6fa' }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/add-result" element={<AddResult />} />
            <Route path="/results" element={<ResultList />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
