const router = require('express').Router();
const submissionController = require('../controllers/submission.controller.js');

// Route to create a new submission
router.post('/submissions', submissionController.createSubmission);

module.exports = router;
