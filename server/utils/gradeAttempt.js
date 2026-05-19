// utils/gradeAttempt.js
import Question from "../models/question.model.js";

export const gradeAttempt = async (attempt) => {
  let score = 0;

  for (const a of attempt.answers) {
    const q = await Question.findById(a.questionId);
    if (q.correctAnswer === a.answer) score++;
  }

  attempt.score = score;
  await attempt.save();
};
