import { QuestionType, Quiz } from "@/lib/types";

import InputQuestionDetails from "./question-components/input-question";
import BooleanQuestionDetails from "./question-components/boolean-question";
import CheckboxQuestionDetails from "./question-components/checkbox-question";

export const questionTypeComponentMap: Record<
	QuestionType,
	React.ComponentType<{ q: Quiz["questions"][number]; idx: number }>
> = {
	[QuestionType.BOOLEAN]: BooleanQuestionDetails,
	[QuestionType.INPUT]: InputQuestionDetails,
	[QuestionType.CHECKBOX]: CheckboxQuestionDetails,
};
