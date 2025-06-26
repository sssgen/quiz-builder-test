import { z } from "zod";
import { QuestionType } from "@/lib/types";

export const questionSchema = z
	.object({
		text: z.string().min(1, "Enter the question"),
		type: z.nativeEnum(QuestionType),
		options: z.array(z.string()),
		correctAnswers: z.array(z.string()),
	})
	.superRefine((data, ctx) => {
		if (data.type === QuestionType.CHECKBOX) {
			if (data.options.some((o) => !o)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["options"],
					message: "Fill in all options",
				});
			}
			if (!data.correctAnswers.length) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["correctAnswers"],
					message: "Select at least one correct answer",
				});
			}
		}
		if (data.type === QuestionType.BOOLEAN) {
			if (data.correctAnswers.length !== 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["correctAnswers"],
					message: "Select the correct answer",
				});
			}
		}
		if (data.type === QuestionType.INPUT) {
			if (data.correctAnswers.length !== 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["correctAnswers"],
					message: "Enter the correct answer",
				});
			}
		}
	});

export const quizFormSchema = z.object({
	title: z.string().min(1, "Enter quiz title"),
	questions: z.array(questionSchema).min(1, "Add at least one question"),
});

export type QuizFormData = z.infer<typeof quizFormSchema>;
