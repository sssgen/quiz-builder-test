import type { Quiz } from "@/lib/types";

const BooleanQuestionDetails = ({
	q,
	idx,
}: {
	q: Quiz["questions"][number];
	idx: number;
}) => (
	<div key={q.id} className='mb-6 p-4 border rounded'>
		<div className='font-semibold'>
			Question {idx + 1}: {q.text}
		</div>
		<div className='text-sm text-gray-500'>Type: True/False</div>
		{q.correctAnswers && q.correctAnswers.length > 0 && (
			<div className='mt-2 text-green-700'>
				Correct Answer:{" "}
				{q.correctAnswers[0] === "true" ? "True" : "False"}
			</div>
		)}
	</div>
);

export default BooleanQuestionDetails;
