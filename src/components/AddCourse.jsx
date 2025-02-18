import React, { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebaseConfig"; // Firebase config should be set up
import { getAuth } from "firebase/auth";
import "../styles/AddCourse.css";

const db = getFirestore(app);
const auth = getAuth(app);

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [schedule, setSchedule] = useState("");
  const [location, setLocation] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // Random thumbnail from Picsum with fixed dimensions (600x300 recommended)
  const thumbnail = `https://picsum.photos/600/300?random=${Math.floor(Math.random() * 1000)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "courses"), {
        title,
        instructor: auth.currentUser ? auth.currentUser.displayName : "Admin",
        description,
        duration,
        schedule,
        location,
        prerequisites,
        syllabus,
        videoLink,
        thumbnail,
        dateLaunched: serverTimestamp(), // Automatically set the date of publication
        likes: 0, // Initialize likes count to 0
      });

      // Reset fields after successful addition
      setTitle("");
      setDescription("");
      setDuration("");
      setSchedule("");
      setLocation("");
      setPrerequisites("");
      setSyllabus("");
      setVideoLink("");

      alert("Course added successfully!");
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  return (
    <div className="add-course-container">
      <div className="add-course-form">
        <h2>Add Course</h2>
        <form className="add-course-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Pre-requisites"
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
            required
          />
          <textarea
            placeholder="Syllabus"
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="YouTube/Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <button type="submit">Add Course</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
