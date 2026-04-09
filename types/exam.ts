import { z } from "zod";

export const settingsSchema = z.object({
  title: z.string().min(3, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  instructions: z.string().optional(),
  scheduledOn: z.string().min(1, "Schedule date required"),
  examType: z.enum(["mcq", "descriptive", "mixed"]),
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
  marks: string;
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
  duration: "",
  scheduledOn: "",
  instructions: "",
  examType: "mcq",
  questions: [],
};
