const db = require("../db");

async function createSubmissionDetail(submissionId, questionId, answerId) {
  const result = await db.query(
    `INSERT INTO submission_details (submission_id, question_id, selected_answer_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [submissionId, questionId, answerId]
  );
  return result.rows[0];
}

async function getSubmissionDetailById(id) {
  const result = await db.query(
    `SELECT * FROM submission_details WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createSubmissionDetail,
  getSubmissionDetailById,
};
