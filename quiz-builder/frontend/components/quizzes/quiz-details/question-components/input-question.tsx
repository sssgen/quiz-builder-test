import type { Quiz } from "@/lib/types";

const InputQuestionDetails = ({
	q,
	idx,
}: {
	q: Quiz["questions"][number];
	idx: number;
}) => {
	return (
		<div key={q.id} className='mb-6 p-4 border rounded'>
			<div className='font-semibold'>
				Question {idx + 1}: {q.text}
			</div>
			<div className='text-sm text-gray-500'>Type: Input</div>
			{q.correctAnswers && q.correctAnswers.length > 0 && (
				<div className='mt-2 text-green-700'>
					Correct Answer{q.correctAnswers.length > 1 ? "s" : ""}:{" "}
					{q.correctAnswers.join(", ")}
				</div>
			)}
		</div>
	);
};

export default InputQuestionDetails;
