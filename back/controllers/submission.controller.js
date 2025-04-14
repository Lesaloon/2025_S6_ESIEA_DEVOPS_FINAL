const db = require("../db");
const submissionDetailModel = require("../models/submissionDetail.model.js");

async function createSubmission(req, res) {
	// Extracts quiz_id and details (an array of { question_id, answer_id }) from the body
	const { quiz_id, details } = req.body;
	try {
		const result = await db.query(
			`INSERT INTO submissions (quiz_id) VALUES (?) RETURNING *`,
			[quiz_id]
		);
		const submission = result[0][0];
		for (const detail of details) {
			// Insert each submission detail
			await submissionDetailModel.createSubmissionDetail(
				submission.id,
				detail.question_id,
				detail.answer_id
			);
		}
		// Optionally attach details to the response
		submission.details = details;
		res.status(201).json(submission);
	} catch (err) {
		res.status(500).json({ message: 'Error creating submission', error: err.message });
	}
}

module.exports = {
	createSubmission,
};
