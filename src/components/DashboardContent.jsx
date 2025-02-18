import { Box, Typography } from "@mui/material";

const DashboardContent = () => {
  return (
    <Box>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Manage your enrolled courses and explore new courses.
      </Typography>
    </Box>
  );
};

export default DashboardContent;
