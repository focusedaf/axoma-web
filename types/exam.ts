import { z } from "zod";

export const settingsSchema = z.object({
  title: z.string().min(3),
  duration: z.number().min(1),
  instructions: z.string().optional(),
  scheduledOn: z.string().min(1, "Schedule date required"),
  examType: z.enum(["mcq", "descriptive"]),
  deliveryType: z.enum(["paper", "computer"]),
  questionView: z.enum(["all-in-one", "one-by-one"]),
  allowPrevious: z.boolean(),
  restrictTime: z.boolean(),
  shuffleQuestions: z.boolean(),
  showResults: z.boolean(),
});

export type SettingsData = z.infer<typeof settingsSchema>;

export type QuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  text: string;
  marks: number;
  type: "mcq" | "descriptive";
  options?: QuestionOption[];
  image?: string | null;
  answer?: string;
};

export type ExamData = SettingsData & {
  questions: Question[];
};

export const defaultExamData: ExamData = {
  title: "",
  duration: 60,
  scheduledOn: "",
  instructions: "",
  examType: "mcq",
  deliveryType: "computer",
  questionView: "all-in-one",
  allowPrevious: false,
  restrictTime: false,
  shuffleQuestions: false,
  showResults: false,
  questions: [],
};