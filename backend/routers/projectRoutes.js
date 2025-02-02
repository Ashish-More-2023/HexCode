const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController'); // Adjust the path as necessary

// Route for adding a new project
router.post('/add', projectController.addProject);

// Route for editing an existing project
router.put('/:pid/edit', projectController.editProject);
// router.get('/:pid',projectController.getOneProject);
// Route for deleting a project
router.delete('/:pid/delete', projectController.deleteProject);
router.get('/visible',projectController.getAllProjects);
router.get('/:pid',projectController.getOneProject);

// Route for voting project 
router.post('/vote', projectController.voteProject)
module.exports = router;

