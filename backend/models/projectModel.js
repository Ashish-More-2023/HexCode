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
        // chat associated with the project
        Chats: [
            {
            text: { type: String },
            userprompt: { type: String },
            airesponse: { type: Schema.Types.Mixed }//code only
            },
        ]
    },
    {
        timestamps: true 
    }
);

// Compile the model only if it doesn't already exist in mongoose.models
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
