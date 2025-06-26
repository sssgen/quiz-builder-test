import type { Quiz } from "@/lib/types";
import { questionTypeComponentMap } from "./helpers";

type QuizDetailsProps = {
	questions: Quiz["questions"];
};

const QuizDetails = ({ questions }: QuizDetailsProps) => {
	return (
		<div>
			{questions.map((q, idx) => {
				const QuestionComponent = questionTypeComponentMap[q.type];

				if (QuestionComponent)
					return <QuestionComponent key={q.id} q={q} idx={idx} />;

				return (
					<div key={q.id} className='mb-6 p-4 border rounded'>
						<div className='font-semibold'>
							Question {idx + 1}: {q.text}
						</div>
						<div className='text-sm text-gray-500'>
							Type: {q.type}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default QuizDetails;
