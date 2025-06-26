import { Router } from "express";
import quizApi from "../controllers/quiz-controller";

const router = Router();

router.get("/quizzes", quizApi.getQuizzes);
router.get("/quizzes/:id", quizApi.getQuizById);

router.post("/quizzes", quizApi.createQuiz);

router.delete("/quizzes/:id", quizApi.deleteQuiz);

export default router;
