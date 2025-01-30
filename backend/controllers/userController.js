const User = require('../models/userModel'); 
const Project = require('../models/projectModel');

// Get logged-in user's data
// exports.getMyData = async (req, res) => {

//     // console.log(req)
    
//     // console.log("in user route",req.user);

//     console.log(req.isAuthenticated())

//     if(req.isAuthenticated()) {
//         console.log("in user route",req.user);
//     }
//     try {
//         const userId = req.user.id; // Assuming req.user is populated with the logged-in user's data
//         const user = await User.findById(userId).select('-password').populate('projects', 'name visibility'); // Populate project details

//         if (!user) return res.status(404).json({ message: 'User not found' });

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

exports.getMyData = async (req, res) => {
    console.log("Authenticated:", req.isAuthenticated()); // Check if the user is authenticated
    console.log("User object:", req.user); // Log the user object
  
    if (req.isAuthenticated()) {
      try {
       
        const userId = req.user.id; // Access user ID
        const user = await User.findById(userId).select('-password').populate('projects', 'name visibility');
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    } else {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  };
  

// Update logged-in user's data
exports.updateMyData = async (req, res) => {
    try {
        const userId = req.user.id; 
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get logged-in user's projects
exports.getMyProjects = async (req, res) => {
    try {
        
        const userId = req.user._id;

        console.log("gsgsgsgsgsgsgsg")
       
        const projects = await Project.find({
            $or: [
                { owner: userId },
                { users: userId }
            ]
        }).populate('owner', 'name email').populate('users', 'name email'); 

        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get another user by ID
exports.getUserById = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findById(userid).select('-password').populate('projects', 'name visibility'); 

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// exports.getAllUsers = async (req, res) => {
//     console.log("Fetching users for search...");
//     try {
//         const users = await User.find({}, "_id name");
//         console.log("Users found:", users);
//         res.json(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).json({ error: "Failed to fetch users", details: error.message });
//     }
// };
