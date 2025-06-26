import QuizCreateForm from "@/components/quizzes/quiz-create/form";
import { createQuizAction } from "@/lib/quiz-actions";

const CreateQuizPage = () => {
	return (
		<main className='flex flex-col items-center py-4'>
			<h1 className='text-2xl text-primary-foreground'>
				Create Quiz Page:
			</h1>
			<div className='w-full mt-8 px-2 md:max-w-[40rem] md:px-8'>
				<QuizCreateForm onSubmit={createQuizAction} />
			</div>
		</main>
	);
};

export default CreateQuizPage;
