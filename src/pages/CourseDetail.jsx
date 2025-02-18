import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseConfig"; // Ensure Firebase is configured

const db = getFirestore(app);

const CourseDetails = () => {
  const { id } = useParams();  // Get Course ID from URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRef = doc(db, "courses", id); // Reference Firestore document
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          setCourse(courseSnap.data());
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className="course-details">
      <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
      <h2>{course.title}</h2>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Schedule:</strong> {course.schedule}</p>
      <p><strong>Location:</strong> {course.location}</p>
      <p><strong>Pre-requisites:</strong> {course.prerequisites}</p>
      <p><strong>Syllabus:</strong> {course.syllabus}</p>
      {course.videoLink && (
        <p>
          <strong>Course Video:</strong>{" "}
          <a href={course.videoLink} target="_blank" rel="noopener noreferrer">
            Watch Here
          </a>
        </p>
      )}
      <button onClick={() => navigate("/")}>Back to Courses</button>
    </div>
  );
};

export default CourseDetails;
