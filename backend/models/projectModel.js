const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Project name is required"],
            trim: true
        },
        // List of users associated with the project
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                // required: true
            }
        ],
        // Owner of the project
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Project owner is required"]
        },
        // Visibility of the project
        visibility: {
            type: Boolean,
            default: false
        },
        // Description
        description: {
            type: String,
            required: false
        },
        // Project Type
        projectType: {
            type: Boolean,
            required: true
        },
        // chat associated with the project
        chats: [
            {
            text: { type: String },
            userprompt: { type: Schema.Types.Mixed  },
            airesponse: { type: Schema.Types.Mixed }//code only
            },
        ],
        votes: {
            upvotes: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }],
            downvotes: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }]
        },
        voteCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true 
    }
);

// Compile the model only if it doesn't already exist in mongoose.models
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
