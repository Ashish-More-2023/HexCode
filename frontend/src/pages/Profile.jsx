import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import Projectlist from "../components/project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { Users } from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState(null); // State to hold authenticated user data
    const [projects, setProjects] = useState([]); // State to hold projects data
    const [users, setUsers] = useState([]); // State to hold all users
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State to capture errors

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/user/my", {
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

    // Function to fetch all users from the backend
    const getAllUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/user/search", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include credentials for session management
            });

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data); // Set the fetched users
        } catch (err) {
            setError(err.message); // Capture and set the error
        }
    };

 
    const getAllProjects = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/user/my/project`, {
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
    

    useEffect(() => {
        fetchUserData();

        getAllUsers();
        
    }, []);

    // Fetch projects when user data is available
    useEffect(() => {
        if (user) {
            getAllProjects(user._id); // Pass user ID to fetch projects
        }
    }, [user]);

    // Handle profile update function
    function handleUpdateUser() {
        if (!user.name.trim() || !user.username.trim()) {
            // alert("Please fill out all required fields.");
            return;
        }
    }

    // Edit user dialogbox
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

    // console.log(projects);
    // console.log(Users);
    return (
        <div className="bg-[#0f172a] text-white p-8 h-full w-full">
            <div className="max-w-7xl mx-auto h-screen">
                {/* Profile Section */}
                <div className="flex gap-8">
                    {/* Profile Info */}
                    <div className="bg-[#1e293b] p-6 rounded-lg fixed h-[75vh] shadow-md w-1/4">
                        {user && (
                            <div className="bg-gray-700 w-[20vw] h-[40vh] mx-auto rounded-lg shadow-lg flex items-center justify-center">
                                <img src={user.imageURL} alt="" />
                            </div>
                        )}

                        {user && <div className="flex justify-end mx-2 my-2"><button onClick={() => handleShowEditDialog(setUser, user, handleUpdateUser)}><FontAwesomeIcon icon={faUserPen} /></button></div>}
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
                                        className="bg-blue-500 text-sm px-3 py-1 rounded-full text-white"
                                    >
                                        {skill}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className="ml-[26vw] w-full">
                        {loading ? (
                            <p className="text-center">Loading projects...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : (
                            <Projectlist projects={projects} users={users} /> // Pass users as prop to Projectlist
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
