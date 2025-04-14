jest.mock("../db", () => ({
  query: jest.fn()
}));
jest.mock("../models/submissionDetail.model.js", () => ({
  createSubmissionDetail: jest.fn().mockResolvedValue({ id: 1 })
}));

const submissionController = require('../controllers/submission.controller.js');
const db = require("../db");
const submissionDetailModel = require("../models/submissionDetail.model.js");

describe("Submission Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createSubmission", () => {
    it("should create submission and return 201", async () => {
      // Prepare request and response objects
      const req = {
        body: {
          quiz_id: 123,
          details: [
            { question_id: 10, answer_id: 100 },
            { question_id: 11, answer_id: 101 }
          ]
        }
      };
      const submissionFromDb = { id: 1, quiz_id: 123 };
      db.query.mockResolvedValue([[submissionFromDb]]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await submissionController.createSubmission(req, res);

      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO submissions (quiz_id) VALUES (?) RETURNING *`,
        [123]
      );
      expect(submissionDetailModel.createSubmissionDetail).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        ...submissionFromDb,
        details: req.body.details
      });
    });

    it("should return 500 if db query fails", async () => {
      const req = {
        body: {
          quiz_id: 123,
          details: []
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const errorMessage = "DB error";
      db.query.mockRejectedValue(new Error(errorMessage));

      await submissionController.createSubmission(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating submission',
        error: errorMessage
      });
    });
  });
});