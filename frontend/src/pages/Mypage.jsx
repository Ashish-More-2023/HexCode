import React, { useState, useEffect } from "react";

const Mypage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user/my", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for session management
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data); // Store user data in state
      setLoading(false); // Set loading state to false after fetching
    } catch (err) {
      setError(err.message); // Handle errors
      setLoading(false); // Set loading state to false even in case of error
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array means it runs only once after the first render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {userData ? (
        <div>
          <h1>{userData.name}'s Profile</h1>
          <p>Email: {userData.email}</p>
          <p>Projects:</p>
          <ul>
            {userData.projects.map((project) => (
              <li key={project._id}>
                {project.name} - {project.visibility}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No user data found.</div>
      )}
    </div>
  );
};

export default Mypage;
