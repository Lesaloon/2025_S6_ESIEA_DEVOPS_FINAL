const db = require("../db");
const questionModel = require("./question.model.js");

async function create(title, theme, questions) {
  const result = await db.query(
    `INSERT INTO quizzes (title, theme)
     VALUES (?, ?) RETURNING *`,
    [title, theme]
  );
  const quizId = result[0][0].id;
  questions.forEach(async (question) => {
    await questionModel.create(
      question.question_text,
      quizId,
      question.answers
    );
  });
  return getQuizByIdWithQuestions(quizId);
}

async function getQuizById(id) {
  const result = await db.query(`SELECT * FROM quizzes WHERE id = ?`, [id]);
  return result[0][0];
}

async function getQuizByIdWithQuestions(id) {
  const result = await db.query(
	`SELECT * FROM quizzes q
	 WHERE q.id = ?`,
	[id]
  );
  const quiz = result[0][0];
  const questions = await questionModel.getQuestionsByQuizId(id);
  quiz.questions = questions;
  return quiz;
}

async function findAllQuizzes() {
  const result = await db.query(`SELECT * FROM quizzes`);
  console.log(result[0]);
  return result[0];
}

async function updateQuiz(id, title, theme) {
  const result = await db.query(
    `UPDATE quizzes SET title = ?, theme = ? WHERE id = ? RETURNING *`,
    [title, theme, id]
  );
  return result[0][0];
}

module.exports = {
  create,
  getQuizById,
  getQuizByIdWithQuestions,
  findAllQuizzes,
  updateQuiz,
};
