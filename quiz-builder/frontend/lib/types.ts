export type Quiz = {
	id: string;
	title: string;
	questions: Question[];
	createdAt: string;
};

export type Question = {
	id: string;
	quizId: string;
	text: string;
	type: QuestionType;
	correctAnswers: string[];
	options: string[];
};

export enum QuestionType {
	BOOLEAN = "BOOLEAN",
	INPUT = "INPUT",
	CHECKBOX = "CHECKBOX",
}

export const QUESTION_TYPES = [
	{ value: QuestionType.BOOLEAN, label: "Yes/No" },
	{ value: QuestionType.INPUT, label: "Text input" },
	{ value: QuestionType.CHECKBOX, label: "Multiple choice" },
];
