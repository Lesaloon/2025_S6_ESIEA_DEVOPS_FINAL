const express = require("express");
const cors = require("cors");
const sequelize = require("sequelize");

const bodyParser = require("body-parser");
const app = express();

const port = 3000;

const quizRoutes = require("./routes/quiz.routes");


app.use(cors());
app.use(bodyParser.json());

app.use("/api/", quizRoutes);

app.listen(port, () => {
	  console.log(`Server is running on http://localhost:${port}`);
})