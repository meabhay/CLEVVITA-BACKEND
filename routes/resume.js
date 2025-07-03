const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// Create a new resume
router.post('/', async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all resumes, with optional filtering by userEmail
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.userEmail) {
      filter.userEmail = req.query.userEmail;
    }
    const resumes = await Resume.find(filter);
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a resume by Mongo _id
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a resume by resumeId (UUID)
router.get('/uuid/:resumeId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ resumeId: req.params.resumeId });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a resume by Mongo _id
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a resume by Mongo _id
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 