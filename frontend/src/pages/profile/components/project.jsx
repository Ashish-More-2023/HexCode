import React, { useState } from "react";

const ProjectList = (props) => {
    const [showPopup, setShowPopup] = useState(false); // Track if popup is visible
    const [selectedUsers, setSelectedUsers] = useState([]); // Track selected users
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering users
    const users = props.users; // List of all users from props

    // Function to handle adding users to selected list
    const handleAddUser = (user) => {
        setSelectedUsers([...selectedUsers, user]);
    };

    // Filter users based on the search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 grid grid-cols-3 ml-96 gap-6">
            <h1 className="text-4xl font-bold col-span-3 p-4 bg-[#1e293b] rounded-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                Projects :
            </h1>
            {props.projects.map((project, index) => (
                <div
                    key={index}
                    className={`bg-[#1e293b] p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-[#334155] ${
                        (index + 1) % 3 === 0 ? 'hover:row-span-2 ' : 'hover:col-span-2 hover:row-span-2'
                    }`}
                >
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    {/* <p className="text-sm text-[#94a3b8]">{project.id}</p> */}
                    <p className="text-sm mt-4">{project.description}</p>
                    {/* <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-[#334155] text-xs px-2 py-1 rounded text-white">
                                {tag}
                            </span>
                        ))}
                    </div> */}
                    <button
                        onClick={() => setShowPopup(true)} // Show popup when clicked
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Add Users
                    </button>
                </div>
            ))}

            {/* Popup for adding users */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-[#1e293b] p-6 rounded-lg shadow-md w-96 max-w-lg relative">
                        <h2 className="text-xl font-bold text-white">Add Users to Project</h2>
                        <input
                            type="text"
                            className="mt-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                        <div className="mt-4 max-h-72 overflow-y-auto">
                            {filteredUsers.map((user) => (
                                <div key={user._id} className="flex justify-between items-center p-2 hover:bg-[#334155] rounded-md">
                                    <span className="text-white">{user.name}</span>
                                    <button
                                        onClick={() => handleAddUser(user)}
                                        className="px-4 py-1 bg-green-500 text-white rounded-md"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Close
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectList;
