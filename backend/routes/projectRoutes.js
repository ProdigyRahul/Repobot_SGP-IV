const express = require('express');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all projects for current user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId }).sort({ lastAccessed: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new project
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, repositoryUrl } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    
    // Set all other projects to inactive
    await Project.updateMany({ userId: req.userId }, { isActive: false });
    
    const project = new Project({
      name,
      description,
      repositoryUrl,
      userId: req.userId,
      isActive: true  // New project is active by default
    });
    
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single project
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Update last accessed time
    project.lastAccessed = Date.now();
    await project.save();
    
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a project
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, repositoryUrl, isActive } = req.body;
    
    const project = await Project.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // If setting this project to active, set all others to inactive
    if (isActive && !project.isActive) {
      await Project.updateMany({ userId: req.userId, _id: { $ne: req.params.id } }, { isActive: false });
    }
    
    // Update fields if provided
    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (repositoryUrl !== undefined) project.repositoryUrl = repositoryUrl;
    if (isActive !== undefined) project.isActive = isActive;
    
    project.lastAccessed = Date.now();
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set a project as active (and all others as inactive)
router.patch('/:id/activate', auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Set all projects to inactive first
    await Project.updateMany({ userId: req.userId }, { isActive: false });
    
    // Set this project as active
    project.isActive = true;
    project.lastAccessed = Date.now();
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error('Activate project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 