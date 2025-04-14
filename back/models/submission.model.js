module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define("Submission", {
    submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  Submission.associate = (models) => {
    //Submission.belongsTo(models.User, { foreignKey: "user_id" });
    Submission.belongsTo(models.Quiz, { foreignKey: "quiz_id" });
    Submission.hasMany(models.SubmissionDetail, {
      foreignKey: "submission_id",
    });
  };

  return Submission;
};
