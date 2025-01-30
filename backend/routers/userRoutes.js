const express = require('express');
const userController = require('../controllers/userController');
// console.log("in router user");
// console.log(require('../controllers/userController'));


const router = express.Router();

// Route to get the logged-in user's data
router.get('/my',  userController.getMyData);

// Route to update the logged-in user's data
router.put('/my', userController.updateMyData);

// Route to get the logged-in user's projects
router.get('/my/project',  userController.getMyProjects);

// Route to get another user by ID
router.get('/:userid',  userController.getUserById);

// router.get('/search',userController.getAllUsers);

module.exports = router;