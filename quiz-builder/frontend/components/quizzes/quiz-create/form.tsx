"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { quizFormSchema, QuizFormData } from "./schema";
import { QuestionType, QUESTION_TYPES } from "@/lib/types";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

const QuizCreateForm = ({
	onSubmit,
}: {
	onSubmit: (data: QuizFormData) => Promise<void>;
}) => {
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const form = useForm<QuizFormData>({
		resolver: zodResolver(quizFormSchema),
		defaultValues: {
			title: "",
			questions: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "questions",
	});

	const handleFormSubmit = async (data: QuizFormData) => {
		setIsSubmitting(true);
		try {
			await onSubmit(data);
			toast.success("Quiz created!", {
				description: "Your quiz has been successfully created.",
			});
			form.reset({
				title: "",
				questions: [],
			});
		} catch (error: unknown) {
			const errorMessage =
				typeof error === "object" &&
				error !== null &&
				"message" in error &&
				typeof error.message === "string"
					? error.message
					: "Failed to create quiz.";
			toast.error("Error", {
				description: errorMessage,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className='space-y-8'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quiz Title</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter quiz title'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-6'>
					{fields.map((question, qIdx) => (
						<div
							key={question.id}
							className='border p-4 rounded space-y-4'
						>
							<FormField
								control={form.control}
								name={`questions.${qIdx}.text`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Question Text</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter question'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`questions.${qIdx}.type`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<select
												{...field}
												className='border rounded px-2 py-1'
												onChange={(e) => {
													field.onChange(e);
													if (
														e.target.value ===
														QuestionType.BOOLEAN
													) {
														form.setValue(
															`questions.${qIdx}.options`,
															["True", "False"]
														);
													} else if (
														e.target.value ===
														QuestionType.CHECKBOX
													) {
														form.setValue(
															`questions.${qIdx}.options`,
															[""]
														);
													} else {
														form.setValue(
															`questions.${qIdx}.options`,
															[]
														);
													}
													form.setValue(
														`questions.${qIdx}.correctAnswers`,
														[]
													);
												}}
											>
												{QUESTION_TYPES.map((type) => (
													<option
														key={type.value}
														value={type.value}
													>
														{type.label}
													</option>
												))}
											</select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.watch(`questions.${qIdx}.type`) ===
								QuestionType.CHECKBOX && (
								<FormField
									control={form.control}
									name={`questions.${qIdx}.options`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Options</FormLabel>
											<FormControl>
												<div className='space-y-2'>
													{field.value.map(
														(
															opt: string,
															oIdx: number
														) => (
															<div
																key={oIdx}
																className='flex gap-2'
															>
																<Input
																	value={opt}
																	onChange={(
																		e
																	) => {
																		const newOptions =
																			[
																				...field.value,
																			];
																		newOptions[
																			oIdx
																		] =
																			e.target.value;
																		field.onChange(
																			newOptions
																		);
																	}}
																	placeholder={`Option ${
																		oIdx + 1
																	}`}
																/>
																<Button
																	type='button'
																	variant='secondary'
																	onClick={() => {
																		const newOptions =
																			field.value.filter(
																				(
																					_: string,
																					idx: number
																				) =>
																					idx !==
																					oIdx
																			);
																		field.onChange(
																			newOptions
																		);
																	}}
																>
																	<DeleteIcon />
																</Button>
															</div>
														)
													)}
													<Button
														type='button'
														onClick={() =>
															field.onChange([
																...field.value,
																"",
															])
														}
													>
														<PlusIcon />
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{(() => {
								const type = form.watch(
									`questions.${qIdx}.type`
								);
								const options = form.watch(
									`questions.${qIdx}.options`
								);
								if (type === QuestionType.CHECKBOX) {
									return (
										<FormField
											control={form.control}
											name={`questions.${qIdx}.correctAnswers`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Correct Answers
													</FormLabel>
													<FormControl>
														<div className='flex flex-col gap-2'>
															{options.map(
																(
																	opt: string,
																	oIdx: number
																) => (
																	<label
																		key={
																			oIdx
																		}
																		className='flex items-center gap-2'
																	>
																		<input
																			type='checkbox'
																			checked={field.value.includes(
																				opt
																			)}
																			onChange={(
																				e
																			) => {
																				if (
																					e
																						.target
																						.checked
																				) {
																					field.onChange(
																						[
																							...field.value,
																							opt,
																						]
																					);
																				} else {
																					field.onChange(
																						field.value.filter(
																							(
																								v: string
																							) =>
																								v !==
																								opt
																						)
																					);
																				}
																			}}
																		/>
																		<span>
																			{opt ||
																				`Option ${
																					oIdx +
																					1
																				}`}
																		</span>
																	</label>
																)
															)}
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									);
								}
								if (type === QuestionType.BOOLEAN) {
									const boolOptions = ["True", "False"];
									return (
										<FormField
											control={form.control}
											name={`questions.${qIdx}.correctAnswers`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Correct Answer
													</FormLabel>
													<FormControl>
														<div className='flex gap-4'>
															{boolOptions.map(
																(opt, oIdx) => (
																	<label
																		key={
																			oIdx
																		}
																		className='flex items-center gap-2'
																	>
																		<input
																			type='radio'
																			checked={
																				field
																					.value[0] ===
																				opt
																			}
																			onChange={() =>
																				field.onChange(
																					[
																						opt,
																					]
																				)
																			}
																		/>
																		<span>
																			{
																				opt
																			}
																		</span>
																	</label>
																)
															)}
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									);
								}
								return (
									<FormField
										control={form.control}
										name={`questions.${qIdx}.correctAnswers`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Correct Answer
												</FormLabel>
												<FormControl>
													<Input
														value={
															field.value[0] || ""
														}
														onChange={(e) =>
															field.onChange([
																e.target.value,
															])
														}
														placeholder='Enter correct answer'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								);
							})()}
							<div className='w-full flex justify-end'>
								<Button
									variant='destructive'
									type='button'
									onClick={() => remove(qIdx)}
								>
									Remove question
								</Button>
							</div>
						</div>
					))}
					<Button
						type='button'
						onClick={() =>
							append({
								text: "",
								type: QuestionType.INPUT,
								options: [""],
								correctAnswers: [""],
							})
						}
					>
						<PlusIcon />
					</Button>
					<FormField
						control={form.control}
						name='questions'
						render={() => <FormMessage />}
					/>
				</div>

				<div className='w-full flex items-end'>
					<Button
						className='ms-auto text-lg'
						type='submit'
						disabled={isSubmitting}
					>
						{isSubmitting ? "Creating..." : "Create Quiz"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default QuizCreateForm;
