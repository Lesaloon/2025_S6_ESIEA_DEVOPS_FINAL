const router = require('express').Router();
const quizController = require('../controllers/quiz.controller.js');

router.post('/quizzes', quizController.createQuiz);
router.get('/quizzes/:id', quizController.getQuizById);
router.get('/quizzes', quizController.getAllQuizzes);
// router.put('/quizzes/:id', quizController.updateQuiz);

module.exports = router;