const db = require("../db");

async function create(answerText, questionId, isCorrect) {
  const result = await db.query(
    `INSERT INTO answers (answer_text, is_correct, question_id)
     VALUES (?, ?, ?) RETURNING *`,
    [answerText, isCorrect, questionId]
  );
  return getAnswerById(result[0][0].id);
}

async function getAnswerById(id) {
  const result = await db.query(`SELECT * FROM answers WHERE id = ?`, [id]);
  return result[0][0];
}

async function getAnswersByQuestionId(questionId) {
  const result = await db.query(
	`SELECT * FROM answers WHERE question_id = ?`,
	[questionId]
  );
  return result[0];
}

module.exports = {
  create,
  getAnswerById,
  getAnswersByQuestionId,
};
