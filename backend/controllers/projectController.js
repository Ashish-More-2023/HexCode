const User = require('../models/userModel'); 
const Project = require('../models/projectModel');
exports.addProject = async (req, res) => {
    try {
        // The parent ID (if applicable) from request params
        const { userId, name, description, visibility, projectType, prompt } = req.body
    
        // Create a new project instance with the incoming data
        const project = new Project({
            name:name,
            users:[],
            owner:userId,
            visibility:(visibility==='public'),
            description: description,
            projectType: (projectType==='react'),
            chats:[]
        });

        // Save the new project to the database
        await project.save();
        res.status(201).json({
            PID:project._id,
            prompt:prompt
        }); // Return the created project in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.editProject = async (req, res) => {
    try {
        const { pid } = req.params; // The project ID from request params
        const updates = req.body;

        // Find and update the project
        const project = await Project.findByIdAndUpdate(pid, updates, { new: true });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project); // Return the updated project
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { pid } = req.params; // The project ID from request params

        // Find and delete the project
        const project = await Project.findByIdAndDelete(pid);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        console.log("hit aagaya ");
        const projects = await Project.find({ visibility: true });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: 'No visible projects found' });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.voteProject = async (req, res) => {
    try {
        console.log("YAHA AAYA");
        
        const { projectId, voteType, userId } = req.body;
        
        
        const project = await Project.findById(projectId);
        console.log(project);
        
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        // Remove existing votes
        let prev_project = project.toObject();

        project.votes.upvotes = project.votes.upvotes.filter(id => 
            id.toString() !== userId
        );
        project.votes.downvotes = project.votes.downvotes.filter(id => 
            id.toString() !== userId
        );
        
        // Add new vote
        if (voteType) {
            if(!prev_project.votes[`${voteType}votes`].map(id => id.toString()).includes(userId.toString())){
                project.votes[`${voteType}votes`].push(userId);
            }
        }

        project.voteCount = project.votes.upvotes.length - project.votes.downvotes.length;
        await project.save();

        res.json({ success: true, votes: project.votes, voteCount: project.voteCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.getOneProject = async (req, res) => {

    try {
        const project = await Project.findById(req.params.pid);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.copyProject = async (req, res) => {
    console.log("final route i made is hit ");
    try {
        const { user } = req.body; 
        const { pid } = req.params; 
        
        console.log(user);
        console.log(pid);

        
        const projectToCopy = await Project.findById(pid);
        if (!projectToCopy) {
            return res.status(404).json({ error: 'Project not found' });
        }

        
        const copiedProject = new Project({
            name: projectToCopy.name,
            description: projectToCopy.description,
            visibility: projectToCopy.visibility,
            projectType: projectToCopy.projectType,
            owner: user, 
            users: [], 
            chats: [], 
            votes: { upvotes: [], downvotes: [] }, 
            voteCount: 0, 
        });

        
        await copiedProject.save();

        res.status(201).json({ message: 'Project copied successfully', project: copiedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

