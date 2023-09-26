const { Router } = require("express");
const router = Router();
const {createProject, deleteProject, updateProject, getProjectsByCategory, getProject} = require('../controllers/project.controllers');
const {isAuthenticatedUser} = require('../helpers/auth')

router.post('/project/post', isAuthenticatedUser, createProject);
router.put('/project/update/:id', isAuthenticatedUser, updateProject);
router.delete('/project/delete/:id', isAuthenticatedUser, deleteProject);
router.get('/projects', getProjectsByCategory);
router.get('/project/:id', getProject);

module.exports = router;