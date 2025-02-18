import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#fff" }}>
        <Outlet /> {/* This will render the selected page dynamically */}
      </Box>
    </Box>
  );
};

export default Dashboard;
