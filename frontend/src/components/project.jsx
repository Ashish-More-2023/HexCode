import { all } from "axios";
import React, { useState,useEffect } from "react";

const ProjectList = ({projects,users,getAllUsers , user}) => {
    const [showPopup, setShowPopup] = useState(false); // Track if popup is visible
    const [selectedUsers, setSelectedUsers] = useState([]); // Track selected users
    const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering users
    const [searchresult, setSearchResult]= useState([]);
    const [project,setProject] = useState({});
    const [allReadySelected,setAllReadySelected] = useState([]);
    


    useEffect(()=>{
        console.log(selectedUsers)
    },[selectedUsers])
    const getProjectData = async (projectid) => {
        
        try {
            console.log(projectid);
            const response = await fetch(`http://localhost:5000/project/${projectid}`, {
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
            setAllReadySelected(data.users); 
        } catch (err) {
            console.log(err) // Capture and set the error
        }
    };



    
    const handleAddUser = (user) => {
        setAllReadySelected((prevUsers) =>
            prevUsers.some((u) => u === user._id)
                ? prevUsers.filter((u) => u !== user._id) // Remove user if already added
                : [...prevUsers, user] // Add user if not present
        );
        const existUser = allReadySelected.find((u) => u === user._id);
        if(!existUser)
        setAllReadySelected((p) => [...p, user._id]);
        console.log(allReadySelected);
    };

    const selectproject = (id)=>{
        setShowPopup(true);
        getAllUsers();
        setProject(id);

    }
    

    const handleSearch = (e)=>{
        console.log("searching....")
        setSearchResult([]);
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        users.map((user,index)=>{
            const tosearch = user.name.trim().toLowerCase();
            const search = searchValue.trim().toLowerCase();
            if(tosearch.includes(search)){
                setSearchResult((old)=>[...old,user.name]);
            }
        })
    }

    const handleclose = ()=>{
        console.log('close');
        setShowPopup(false);
        setAllReadySelected([]);
        setSelectedUsers([]);

    }

    const handlesave = async () => {
        try {
            console.log("Saving project...");
            console.log("Project Name:", project.name);
            console.log("Project Chats:", project.chats);
            console.log("Selected Users Before Deduplication:", allReadySelected);
            console.log("currentuser:",user );

    
            // const uniqueUsers = allReadySelected.filter((user, index, self) =>
            //     index === self.findIndex((u) => u.id === user.id)
            // );
    
            // console.log("Selected Users After Deduplication:", uniqueUsers);
    
            // Send the updated project data to the backend
            const response = await fetch(`http://localhost:5000/project/${project._id}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: project.name,
                    users: allReadySelected,
                    owner: project.owner,
                    visibility: project.visibility,
                    description: project.description,
                    projectType: project.projectType,
                    chats: project.chats
                }),
                credentials: "include", // Ensures cookies/session are included
            });
    
            if (!response.ok) {
                throw new Error("Failed to update project");
            }
    
            // Reset states after successful update
            setProject({});
            setSelectedUsers([]);
            setShowPopup(false);
    
            console.log("Project updated successfully!");
    
        } catch (err) {
            console.error("Error while saving project:", err);
        }
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
            {projects.map((project, index) => (
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
                        onClick={() => {selectproject(project)
                            getProjectData(project._id)
                        }} // Show popup when clicked
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
                            className="mt-4 w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e)} // Update search term
                        />
                        <div className="mt-4 max-h-72 overflow-y-auto">
                            {filteredUsers.map((user) => (
                                <div key={user._id} className="flex justify-between items-center p-2 hover:bg-[#334155] rounded-md">
                                <span className="text-white">{user.name}</span>
                                <button
                                    onClick={() => handleAddUser(user)}
                                    className={`px-4 py-1 rounded-md ${
                                        allReadySelected.some((u) => u === user._id) ? "bg-gray-500" : "bg-green-500"
                                    } text-white`}
                                >
                                    {allReadySelected.some((u) => u === user._id) ? "Added" : "Add"}
                                </button>
                            </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleclose}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Close
                            </button>
                            <button 
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={()=>handlesave()}
                            
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
=======
const Projectlist = (props) => {
    const projects = props.projects;

    const handleEdit= ({project})=>{
        if (project.projectType) {
            // localStorage.setItem('project', JSON.stringify(project));
            window.location.href = '/main/react/' + project._id;
        } else {
            window.location.href = '/main/plain/'+ project._id;

        }
    }


    return (
        <div className="flex-1 grid grid-cols-3 ml-96 gap-6">
    <h1 className="text-4xl font-bold col-span-3 p-4 bg-[#1e293b] rounded-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Projects :
    </h1>
    {projects.map((project, index) => (
        <div
            key={index}
            className={`bg-[#1e293b] p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-[#334155] ${
                (index + 1) % 3 === 0 ? 'hover:row-span-2 ' : 'hover:col-span-2 hover:row-span-2'
            }`}
        >
            <h3 className="text-lg font-bold">{project.name}</h3>
            {/* <p className="text-sm text-[#94a3b8]">{project.id}</p> */}
            {/* <p className="text-sm mt-4">{project.description}</p> */}
            <div className="flex flex-wrap gap-2 mt-4">
                {/* {project.tags.map((tag, tagIndex) => (
                    <span
                        key={tagIndex}
                        className="bg-[#334155] text-xs px-2 py-1 rounded text-white"
                    >
                        {tag}
                    </span>
                ))} */}

                <button onClick={()=>handleEdit({project})}>
                    Edit
                </button>
            </div>
>>>>>>> ed9176c8c1722ab51e3564516d515426dcd83912:frontend/src/components/project.jsx
        </div>
    );
};

export default ProjectList;
