import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure correct import path

const DashboardContent = () => {
  const [latestCourse, setLatestCourse] = useState(null);

  useEffect(() => {
    const fetchLatestCourse = async () => {
      const courseRef = collection(db, "courses");
      const q = query(courseRef, orderBy("dateLaunched", "desc"), limit(1));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setLatestCourse(querySnapshot.docs[0].data());
      }
    };

    fetchLatestCourse();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Manage your enrolled courses and explore new courses.
      </Typography>

      <div className="newCourse">
        <h1>New Lauched Course</h1>
        {latestCourse ? (
          <Card sx={{ maxWidth: 400, mt: 3, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{latestCourse.title}</Typography>
              <Typography variant="body2">
                <strong>Instructor:</strong> {latestCourse.instructor}
              </Typography>
              <Typography variant="body2">
                <strong>Description:</strong> {latestCourse.description}
              </Typography>
              <Typography variant="body2">
                <strong>Duration:</strong> {latestCourse.duration}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>
            No courses available.
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default DashboardContent;
