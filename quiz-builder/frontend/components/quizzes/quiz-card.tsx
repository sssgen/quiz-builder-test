import type { Quiz } from "@/lib/types";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { deleteQuiz } from "@/lib/quiz-actions";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type QuizCardProps = {
	quiz: Quiz;
	renderQuestions?: (questions: Quiz["questions"]) => React.ReactNode;
};

const QuizCard = ({ quiz, renderQuestions = () => null }: QuizCardProps) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (isDeleting) return;
		setIsDeleting(true);

		try {
			await deleteQuiz(quiz.id);
			toast.success("Quiz deleted!", {
				description: "The quiz has been successfully deleted.",
			});
			router.replace(router.asPath);
		} catch (error: unknown) {
			const errorMessage =
				typeof error === "object" &&
				error !== null &&
				"message" in error &&
				typeof error.message === "string"
					? error.message
					: "Failed to delete quiz.";
			toast.error("Error", {
				description: errorMessage,
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Link
			href={`/quizzes/${quiz.id}`}
			className='w-full border border-border rounded-md p-3 bg-background shadow flex flex-col gap-1 transition hover:shadow-lg hover:border-primary'
		>
			<div className='flex items-center justify-between'>
				<h2 className='text-base font-semibold text-primary mb-0.5'>
					{quiz.title}
				</h2>
				<Button
					variant='ghost'
					onClick={handleDelete}
					disabled={isDeleting}
				>
					<XIcon
						className={`w-4 h-4 text-destructive/70 hover:text-destructive cursor-pointer ${
							isDeleting ? "opacity-50 pointer-events-none" : ""
						}`}
					/>
				</Button>
			</div>
			<p className='text-xs text-muted-foreground'>
				Questions:{" "}
				<span className='font-medium'>{quiz.questions.length}</span>
			</p>
			<p className='text-[11px] text-muted-foreground'>
				Created: {new Date(quiz.createdAt).toLocaleString()}
			</p>
			{renderQuestions(quiz.questions)}
		</Link>
	);
};

export default QuizCard;
