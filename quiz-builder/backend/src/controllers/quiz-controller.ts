import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";
import { PRISMA_NOT_FOUND_CODE } from "./constants";

export const getQuizzes = async (req: Request, res: Response) => {
	try {
		const quizzes = await prisma.quiz.findMany({
			include: {
				questions: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		res.json({ quizzes });
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch quizzes", error });
	}
};

export const getQuizById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const quiz = await prisma.quiz.findUnique({
			where: { id },
			include: { questions: true },
		});

		if (!quiz) {
			return res.status(404).json({ message: "Quiz not found" });
		}

		res.json(quiz);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch quiz", error });
	}
};

export const createQuiz = async (req: Request, res: Response) => {
	try {
		const { title, questions } = req.body;

		if (!title || !Array.isArray(questions) || questions.length === 0) {
			return res
				.status(400)
				.json({ message: "Title and questions are required" });
		}

		const quiz = await prisma.quiz.create({
			data: {
				title,
				questions: {
					create: questions.map((q: any) => ({
						text: q.text,
						type: q.type,
						options: q.options,
						correctAnswers: q.correctAnswers,
					})),
				},
			},
			include: { questions: true },
		});

		res.status(201).json(quiz);
	} catch (error) {
		res.status(500).json({ message: "Failed to create quiz", error });
	}
};

export const deleteQuiz = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await prisma.quiz.delete({ where: { id } });
		res.status(204).send();
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === PRISMA_NOT_FOUND_CODE
		) {
			return res.status(404).json({ message: "Quiz not found" });
		}
		res.status(500).json({ message: "Failed to delete quiz", error });
	}
};

export default {
	getQuizzes,
	getQuizById,
	createQuiz,
	deleteQuiz,
};
