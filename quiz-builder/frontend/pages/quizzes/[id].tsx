import { GetServerSideProps } from "next";
import type { Quiz } from "@/lib/types";
import QuizCard from "@/components/quizzes/quiz-card";
import QuizDetails from "@/components/quizzes/quiz-details";

type QuizPageProps = {
	quiz: Quiz | null;
	hasError?: boolean;
};

const QuizPage = ({ quiz, hasError }: QuizPageProps) => {
	if (hasError) {
		return (
			<main>
				<h1 className='text-destructive'>
					Failed to load quiz. Please try again later.
				</h1>
			</main>
		);
	}

	if (!quiz) {
		return (
			<main>
				<h1>Quiz not found</h1>
			</main>
		);
	}

	return (
		<main>
			<QuizCard
				quiz={quiz}
				renderQuestions={(questions) => (
					<QuizDetails questions={questions} />
				)}
			/>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id ?? "";
	let quiz = null;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes/${id}`
		);
		if (res.ok) {
			quiz = await res.json();
			return {
				props: {
					quiz,
				},
			};
		} else {
			return {
				props: {
					quiz: null,
					hasError: true,
				},
			};
		}
	} catch {
		return {
			props: {
				quiz: null,
				hasError: true,
			},
		};
	}
};

export default QuizPage;
