jest.mock("../models/quiz.model.js", () => ({
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  getQuizByIdWithQuestions: jest.fn(),
  findAllQuizzes: jest.fn(),
}));
const quizController = require('../controllers/quiz.controller.js');
const QuizModel = require('../models/quiz.model.js');

describe('Quiz Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createQuiz', () => {
        it('should create quiz and return 201', async () => {
            const req = { body: { name: 'Test Quiz', theme: 'History', questions: [] } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const createdQuiz = { id: 1, name: 'Test Quiz', theme: 'History', questions: [] };
            QuizModel.create.mockResolvedValue(createdQuiz);
            await quizController.createQuiz(req, res);
            expect(QuizModel.create).toHaveBeenCalledWith('Test Quiz', 'History', []);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdQuiz);
        });

        it('should return 500 if quiz creation fails', async () => {
            const req = { body: { name: 'Test Quiz', theme: 'History', questions: [] } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            QuizModel.create.mockResolvedValue(null);
            await quizController.createQuiz(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating quiz' });
        });
    });

    describe('getQuizById', () => {
        it('should return quiz with status 200 when found', async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const quiz = { id: 1, name: 'Test Quiz', theme: 'Math', questions: [] };
            QuizModel.getQuizByIdWithQuestions.mockResolvedValue(quiz);
            await quizController.getQuizById(req, res);
            expect(QuizModel.getQuizByIdWithQuestions).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(quiz);
        });

        it('should return 404 when quiz not found', async () => {
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            QuizModel.getQuizByIdWithQuestions.mockResolvedValue(null);
            await quizController.getQuizById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Quiz not found' });
        });
    });

    describe('getAllQuizzes', () => {
        it('should return all quizzes with status 200', async () => {
            const req = { };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const quizzes = [{ id: 1, name: 'Test Quiz 1' }, { id: 2, name: 'Test Quiz 2' }];
            QuizModel.findAllQuizzes.mockResolvedValue(quizzes);
            await quizController.getAllQuizzes(req, res);
            expect(QuizModel.findAllQuizzes).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(quizzes);
        });
    });
});


