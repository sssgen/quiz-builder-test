import { GetServerSideProps } from "next";
import QuizzesGrid from "@/components/quizzes/quizzes-grid";
import type { Quiz } from "@/lib/types";

type QuizzesPageProps = {
	quizzes: Quiz[];
	hasError?: boolean;
};

const QuizzesPage = ({ quizzes, hasError }: QuizzesPageProps) => {
	return (
		<main className='flex flex-col items-center py-4'>
			<h1 className='text-2xl text-primary-foreground'>Quizzes:</h1>
			{hasError ? (
				<p className='mt-4 text-destructive'>
					Failed to load quizzes. Please try again later.
				</p>
			) : quizzes.length === 0 ? (
				<p className='mt-4 text-muted-foreground'>No quizzes found.</p>
			) : (
				<QuizzesGrid quizzes={quizzes} />
			)}
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes`
		);
		if (!res.ok) throw new Error("Failed to fetch quizzes");
		const data = await res.json();
		return {
			props: {
				quizzes: data.quizzes || [],
			},
		};
	} catch {
		return {
			props: {
				quizzes: [],
				hasError: true,
			},
		};
	}
};

export default QuizzesPage;
