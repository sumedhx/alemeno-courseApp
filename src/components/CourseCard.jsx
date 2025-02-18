import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(course.likes || 0);
  const [date,setDate] = useState();

  useEffect(() => {
    const courseRef = doc(db, "courses", course.id);
    const unsubscribe = onSnapshot(courseRef, (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().likes || 0);
        setDate(
          docSnap.data().dateLaunched
            ? docSnap.data().dateLaunched.toDate().toLocaleDateString("en-US")
            : "No Date"
        );
      }
    });

    return () => unsubscribe();
  }, [course.id]);


  const handleLike = async () => {
    const courseRef = doc(db, "courses", course.id);
    await updateDoc(courseRef, {
      likes: increment(1),
    });
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia component="img" height="200" image={course.thumbnail} alt={course.title} />
      <CardContent>
        <Typography variant="h6" gutterBottom>{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Instructor: {course.instructor}
        </Typography>
        <Typography variant="body2">
          Publish date: {date}
        </Typography>
        <Button onClick={handleLike} variant="contained" sx={{ mt: 1 }}>
          👍 Like ({likes})
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2, ml: 2 }}
          onClick={() => navigate(`/course/${course.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
