import type { Quiz } from "@/lib/types";
import QuizCard from "../quiz-card";

type QuizzesGridProps = {
	quizzes: Quiz[];
};

const QuizzesGrid = ({ quizzes }: QuizzesGridProps) => {
	if (!quizzes?.length)
		return (
			<div className='text-center text-muted-foreground py-8'>
				No quizzes found.
			</div>
		);

	return (
		<div className='grid gap-2 sm:grid-cols-2 md:grid-cols-3 w-full px-2 py-8 md:px-20'>
			{quizzes.map((quiz) => (
				<QuizCard key={quiz.id} quiz={quiz} />
			))}
		</div>
	);
};

export default QuizzesGrid;
