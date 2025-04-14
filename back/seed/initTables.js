const db = require("../db");

async function initTables() {

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      is_approved BOOLEAN DEFAULT false,
      created_by INTEGER REFERENCES users(id),
      theme TEXT NOT NULL,
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      question_text TEXT NOT NULL,
      quiz_id INTEGER REFERENCES quizzes(id)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS answers (
      id SERIAL PRIMARY KEY,
      answer_text TEXT NOT NULL,
      is_correct BOOLEAN DEFAULT false,
      question_id INTEGER REFERENCES questions(id)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      quiz_id INTEGER REFERENCES quizzes(id)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS submission_details (
      id SERIAL PRIMARY KEY,
      submission_id INTEGER REFERENCES submissions(id),
      question_id INTEGER REFERENCES questions(id),
      selected_answer_id INTEGER REFERENCES answers(id)
    );
  `);

  console.log("All tables created successfully.");
}

initTables().catch((err) => console.error("Error creating tables", err));
