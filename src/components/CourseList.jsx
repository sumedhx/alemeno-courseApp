import React, { useState, useEffect } from "react";
import { Grid, TextField, Container } from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";
import CourseCard from '../components/courseCard'

const db = getFirestore(app);

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      setCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <TextField 
        label="Search Courses" 
        variant="outlined" 
        fullWidth 
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filteredCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
