"use server";
import { QuizFormData } from "@/components/quizzes/quiz-create/schema";

export async function createQuizAction(data: QuizFormData) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || "Failed to create quiz");
		}

		return res.json();
	} catch (error) {
		throw new Error((error as Error).message || "Failed to create quiz");
	}
}

export async function getAllQuizzes() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes`
		);
		if (!res.ok) {
			throw new Error("Failed to fetch quizzes");
		}
		return res.json();
	} catch (error) {
		throw new Error((error as Error).message || "Failed to fetch quizzes");
	}
}

export async function getQuizById(id: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes/${id}`
		);
		if (!res.ok) {
			throw new Error("Failed to fetch quiz");
		}
		return res.json();
	} catch (error) {
		throw new Error((error as Error).message || "Failed to fetch quiz");
	}
}

export async function deleteQuiz(id: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes/${id}`,
			{
				method: "DELETE",
			}
		);
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || "Failed to delete quiz");
		}
		return true;
	} catch (error) {
		throw new Error((error as Error).message || "Failed to delete quiz");
	}
}
