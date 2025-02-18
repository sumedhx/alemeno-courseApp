import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia component="img" height="200" image={course.thumbnail} alt={course.title} />
      <CardContent>
        <Typography variant="h6" gutterBottom>{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">Instructor: {course.instructor}</Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }} 
          onClick={() => navigate(`/course/${course.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
