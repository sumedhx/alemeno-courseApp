import { Link } from "react-router-dom";
import { Box, Button, Divider, Typography } from "@mui/material";
import "../styles/sidebar.css"

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        CoursePortal
      </Typography>

      <Divider sx={{ width: "100%", mb: 2 }} />

      {/* Navigation Buttons */}
      <Button component={Link} to="/dashboard" fullWidth sx={{ mb: 2 }}>
        Dashboard
      </Button>
      <Button component={Link} to="/dashboard/courses" fullWidth sx={{ mb: "auto" }}>
        All Courses
      </Button>
      <Button component={Link} to="/dashboard/add-course" fullWidth sx={{ mb: "auto" }}>
       Add Courses
      </Button>

      <Divider sx={{ width: "100%", my: 2 }} />

      {/* Logout Button */}
      <Button fullWidth variant="contained" color="error">
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
