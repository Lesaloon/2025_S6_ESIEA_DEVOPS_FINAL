const quizmodel = require('../models/quiz.model.js');
const answermodel = require('../models/answer.model.js');
const questionmodel = require('../models/question.model.js');


class quizController {

	async createQuiz(req, res) {
		const { name, theme, questions } = req.body;
		const quiz = await quizmodel.create(name, theme, questions);
		if (!quiz) {
			return res.status(500).json({ message: 'Error creating quiz' });
		}

		res.status(201).json(quiz);
	}
	async getQuizById(req, res) {
		const { id } = req.params;
		const quiz = await quizmodel.getQuizByIdWithQuestions(id);
		if (!quiz) {
			return res.status(404).json({ message: 'Quiz not found' });
		}
		res.status(200).json(quiz);
	}

	async getAllQuizzes(req, res) {
		const quizzes = await  quizmodel.findAllQuizzes();
		res.status(200).json(quizzes);
	}

	async updateQuiz(req, res) {
		const { id } = req.params;
		const { name, theme } = req.body;
		const updatedQuiz = await quizmodel.updateQuiz(id, name, theme);
		if (!updatedQuiz) {
			return res.status(500).json({ message: 'Error updating quiz' });
		}
		res.status(200).json(updatedQuiz);
	}

}

module.exports = new quizController();