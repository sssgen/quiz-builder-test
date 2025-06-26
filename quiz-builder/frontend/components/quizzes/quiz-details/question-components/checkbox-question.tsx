import type { Quiz } from "@/lib/types";

const CheckboxQuestionDetails = ({
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
		<div className='text-sm text-gray-500'>Type: Multiple Choice</div>
		{q.options && q.options.length > 0 && (
			<ul className='list-disc ml-6 mt-2'>
				{q.options.map((opt, i) =>
					opt ? <li key={i}>{opt}</li> : null
				)}
			</ul>
		)}
		{q.correctAnswers && q.correctAnswers.length > 0 && (
			<div className='mt-2 text-green-700'>
				Correct Answer{q.correctAnswers.length > 1 ? "s" : ""}:{" "}
				{q.correctAnswers.join(", ")}
			</div>
		)}
	</div>
);

export default CheckboxQuestionDetails;
