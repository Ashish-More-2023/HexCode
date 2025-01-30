import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import Projectlist from "../components/project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

const Profile = () => {
    const [user, setUser] = useState(null); // State to hold authenticated user data
    const [projects, setProjects] = useState([]); // State to hold projects data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State to capture errors
    const projects1=[
        {
            title: "AI Chat Assistant",
            id: "#PRJ-001",
            description:
                "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
            tags: ["Python", "TensorFlow", "Flask"],
        },
        
        {
            title: "Weather Dashboard",
            id: "#PRJ-003",
            description:
                "Real-time weather tracking application with interactive maps and forecast predictions.",
            tags: ["JavaScript", "Weather API", "Chart.js"],
        },
        {
            title: "Social Media Analytics",
            id: "#PRJ-004",
            description:
                "Analytics dashboard for tracking social media engagement and audience insights.",
            tags: ["React", "Firebase", "D3.js"],
        },
        {
            title: "Task Management App",
            id: "#PRJ-005",
            description:
                "Collaborative task management tool with real-time updates and team features.",
            tags: ["Vue.js", "Express", "PostgreSQL"],
        },
        {
            title: "AI Chat Assistant",
            id: "#PRJ-001",
            description:
                "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
            tags: ["Python", "TensorFlow", "Flask"],
        },
        {
            title: "E-Commerce Platform",
            id: "#PRJ-002",
            description:
                "Full-stack e-commerce solution with real-time inventory management and payment processing.",
            tags: ["React", "Node.js", "MongoDB"],
        },
        {
            title: "E-Commerce Platform",
            id: "#PRJ-002",
            description:
                "Full-stack e-commerce solution with real-time inventory management and payment processing.",
            tags: ["React", "Node.js", "MongoDB"],
        },
        {
            title: "Weather Dashboard",
            id: "#PRJ-003",
            description:
                "Real-time weather tracking application with interactive maps and forecast predictions.",
            tags: ["JavaScript", "Weather API", "Chart.js"],
        },
        {
            title: "Social Media Analytics",
            id: "#PRJ-004",
            description:
                "Analytics dashboard for tracking social media engagement and audience insights.",
            tags: ["React", "Firebase", "D3.js"],
        },
        {
            title: "Task Management App",
            id: "#PRJ-005",
            description:
                "Collaborative task management tool with real-time updates and team features.",
            tags: ["Vue.js", "Express", "PostgreSQL"],
        },
        {
            title: "AI Chat Assistant",
            id: "#PRJ-001",
            description:
                "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
            tags: ["Python", "TensorFlow", "Flask"],
        },
        {
            title: "E-Commerce Platform",
            id: "#PRJ-002",
            description:
                "Full-stack e-commerce solution with real-time inventory management and payment processing.",
            tags: ["React", "Node.js", "MongoDB"],
        },
        {
            title: "Weather Dashboard",
            id: "#PRJ-003",
            description:
                "Real-time weather tracking application with interactive maps and forecast predictions.",
            tags: ["JavaScript", "Weather API", "Chart.js"],
        },
        {
            title: "Social Media Analytics",
            id: "#PRJ-004",
            description:
                "Analytics dashboard for tracking social media engagement and audience insights.",
            tags: ["React", "Firebase", "D3.js"],
        },
        {
            title: "Task Management App",
            id: "#PRJ-005",
            description:
                "Collaborative task management tool with real-time updates and team features.",
            tags: ["Vue.js", "Express", "PostgreSQL"],
        },
        {
            title: "AI Chat Assistant",
            id: "#PRJ-001",
            description:
                "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
            tags: ["Python", "TensorFlow", "Flask"],
        },
        {
            title: "E-Commerce Platform",
            id: "#PRJ-002",
            description:
                "Full-stack e-commerce solution with real-time inventory management and payment processing.",
            tags: ["React", "Node.js", "MongoDB"],
        },
        {
            title: "Weather Dashboard",
            id: "#PRJ-003",
            description:
                "Real-time weather tracking application with interactive maps and forecast predictions.",
            tags: ["JavaScript", "Weather API", "Chart.js"],
        },
        {
            title: "Social Media Analytics",
            id: "#PRJ-004",
            description:
                "Analytics dashboard for tracking social media engagement and audience insights.",
            tags: ["React", "Firebase", "D3.js"],
        },
        {
            title: "Task Management App",
            id: "#PRJ-005",
            description:
                "Collaborative task management tool with real-time updates and team features.",
            tags: ["Vue.js", "Express", "PostgreSQL"],
        },
    ]
    
    
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5001/user/my", {
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
        setUser(data); // Set the fetched user data
      } catch (err) {
        setError(err.message); // Capture and set the error
      } finally {
        setLoading(false); // Set loading to false
      }
    };
  
    // console.log("baby");
    // console.log(user);
    const getAllProjects = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5001/user/my/project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for session management
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
  
        const data = await response.json();
        setProjects(data); // Set the fetched projects
      } catch (err) {
        setError(err.message); // Capture and set the error
      }
    };
  
    // Fetch user data on component mount
    useEffect(() => {
      fetchUserData();
    }, []);
  
    // Fetch projects when user data is available
    useEffect(() => {
      if (user) {
        getAllProjects(user._id); // Pass user ID to fetch projects
      }
    }, [user]);

  // handle profile update function
  function handleUpdateUser(){
    if (!user.name.trim() || !user.username.trim()) {
        // alert("Please fill out all required fields.");
        return;
    }
    
  }

  // edit user dialogbox
  function handleShowEditDialog(setUser, user, handleUpdateUser) {
    Swal.fire({
        title: "<span class='text-white'>Edit Profile</span>",
        background: "#1e293b",
        color: "#ffffff",
        html: `
            <form id="edit-profile-form" class="flex flex-col gap-4 text-left">
                <label class="text-sm font-medium text-gray-300">Name</label>
                <input type="text" id="swal-name" class="swal2-input bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500">
    
                <label class="text-sm font-medium text-gray-300">Username</label>
                <input type="text" id="swal-username" class="swal2-input bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500">
    
                <label class="text-sm font-medium text-gray-300">Skills (comma separated)</label>
                <input type="text" id="swal-skills" class="swal2-input bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500">
            </form>
        `,
        showCancelButton: true,
        confirmButtonText: "<span class='text-white'>Save Changes</span>",
        cancelButtonText: "<span class='text-gray-400'>Cancel</span>",
        customClass: {
            popup: 'rounded-lg shadow-lg',
            confirmButton: 'bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded',
            cancelButton: 'bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
        },
        didOpen: () => {
            document.getElementById("swal-name").value = user.Name || "";
            document.getElementById("swal-username").value = user.userName || "";
            document.getElementById("swal-skills").value = user.skills || "";
        },
        preConfirm: () => {
            return {
                Name: document.getElementById("swal-name").value,
                userName: document.getElementById("swal-username").value,
                skills: document.getElementById("swal-skills").value,
            };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            setUser(result.value);
            handleUpdateUser();
        }
    });
}
const [shrink, setShrink] = useState(false);
useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShrink(true);
        } else {
            setShrink(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);
console.log(projects);
  return (
    <div className="bg-[#0f172a] text-white p-8 pb-20 overflow-scroll">
    <div className="max-w-7xl mx-auto h-screen">
      {/* Profile Section */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Profile Info */}
        <div className={`profile-section ${shrink ? 'shrink' : ''} bg-[#1e293b] p-6 h-[80vh]  rounded-lg shadow-md w-full md:w-[30vw] flex flex-col items-center`}>
        {user && (
          <div className="bg-gray-700 w-full md:w-[20vw] h-[40vh] mx-auto rounded-lg shadow-lg flex items-center justify-center">
              <img src={user.imageURL} alt="" />
          </div>
        )}
          
          {user && <div className="flex justify-end mx-2 my-2"><button onClick={()=>handleShowEditDialog(setUser,user,handleUpdateUser)}><FontAwesomeIcon icon={faUserPen} /></button></div>}
          <h2 className="text-xl text-center mt-4 font-bold">
            {user ? user.name : "Loading..."}
          </h2>
          <p className="text-center text-[#94a3b8]">
            {user ? `@${user.email}` : ""}
          </p>
          <h3 className="text-lg font-semibold mt-6">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Python", "Java", "MongoDB", "React", "Node.js"].map(
              (skill, index) => (
                <span
                  key={index}
                  className="bg-[#334155] text-xs px-2 py-1 rounded text-white"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

          {/* Projects Section */}
          <div className=" w-full ">
            {/* {loading ? (
              <p className="text-center">Loading projects...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <Projectlist projects={projects1} /> 
            )} */}
            <Projectlist projects={projects1} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Profile;
export default Profile;
