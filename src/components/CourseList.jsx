import React, { useState, useEffect } from "react";
import { Grid, TextField, Container } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CourseCard from "../components/CourseCard";
import "../App.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const coursesRef = collection(db, "courses");

    const unsubscribe = onSnapshot(coursesRef, (snapshot) => {
      const courseData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TextField
        className="searchBar"
        label="Search Courses"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Container className="course-container" sx={{ mt: 4 }}>
        <Grid className="course-list" container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CourseList;
