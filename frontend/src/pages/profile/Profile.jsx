import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Projectlist from "./components/project";

const projects=[
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
const Profile = () => {
    const [profile, setProfile] = useState({  //access the values locally
        Name:"Ritvij Gopal",
        userName:"ritvij611",
        skills:"Python,Java,MongoDB,React,Node.js"
      }); 
      

       
          function handleUpdateProfile(){
            if (!profile.Name.trim() || !profile.userName.trim()) {
                // alert("Please fill out all required fields.");
                return;
            }
            
          }
          
    
          function handleShowEditDialog(setProfile, profile, handleUpdateProfile) {
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
                    document.getElementById("swal-name").value = profile.Name || "";
                    document.getElementById("swal-username").value = profile.userName || "";
                    document.getElementById("swal-skills").value = profile.skills || "";
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
                    setProfile(result.value);
                    handleUpdateProfile();
                }
            });
        }
        
        
    return (
        <div className="bg-[#0f172a] text-white  p-8 h-full w-full">
            <div className="max-w-7xl mx-auto">
                {/* Profile Section */}
                <div className="flex gap-8">
                    {/* Profile Info */}
                    <div className="bg-[#1e293b] p-6 rounded-lg fixed h-[75vh] shadow-md w-1/4 ">
                        <div className="bg-gray-700 w-[20vw] h-[40vh] mx-auto rounded-lg shadow-lg flex items-center justify-center">
                            
                        </div>
                        <div className="flex justify-end mx-2 my-2"><button onClick={()=>handleShowEditDialog(setProfile,profile,handleUpdateProfile)}><FontAwesomeIcon icon={faUserPen} /></button></div>
                        <h2 className="text-xl text-center mt-4 font-bold">{profile.Name}</h2>
                        <p className="text-center text-[#94a3b8]">@{profile.userName}</p>
                        <h3 className="text-lg font-semibold mt-6">Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {(profile.skills || "").split(",").map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-500 text-sm px-3 py-1 rounded-full text-white"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        {/* <h3 className="text-lg font-semibold mt-6">Projects</h3>
                        <p className="text-4xl text-center font-bold mt-2">47</p> */}
                    </div>

                    {/* Projects Section */}
                    <Projectlist projects={projects} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
