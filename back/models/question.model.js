const db = require("../db");
const answerModel = require("./answer.model.js");

async function create(questionText, quizId, answers) {
  const result = await db.query(
    `INSERT INTO questions (question_text, quiz_id) VALUES (?, ?) RETURNING *`,
    [questionText, quizId]
  );

  const questionId = result[0][0].id;
  answers.forEach(async (answer) => {
    await answerModel.create(
      answer.answer_text,
      questionId,
      answer.is_correct
    );
  });
  return getQuestionById(questionId);
}

async function getQuestionById(id) {
  const result = await db.query(`SELECT * FROM questions WHERE id = ?`, [id]);
  return result[0][0];
}

async function getQuestionsByQuizId(quizId) {
  const result = await db.query(
	`SELECT * FROM questions WHERE quiz_id = ?`,
	[quizId]
  );
  const questions = result[0];
  for (const question of questions) {
	const answers = await answerModel.getAnswersByQuestionId(question.id);
	question.answers = answers;
  }
  return questions;
}

module.exports = {
  create,
  getQuestionById,
  getQuestionsByQuizId,
};
