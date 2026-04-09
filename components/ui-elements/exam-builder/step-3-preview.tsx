"use client";

import { ExamData } from "@/types/exam";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Step3PreviewProps {
  examData: ExamData;
}

export function Step3Preview({ examData }: Step3PreviewProps) {
  const { title, instructions, duration, questions } = examData;

  return (
    <Card className="max-w-4xl mx-auto shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-semibold">{title}</CardTitle>

        <CardDescription>Duration: {duration} minutes</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="p-5 border rounded-md bg-muted/40 mb-6">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
            Instructions
          </h4>

          <p className="text-sm leading-relaxed whitespace-pre-line">
            {instructions || "No instructions provided."}
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-4">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-lg leading-snug">
                  {index + 1}. {q.text}
                </p>

                <Badge variant="outline">{q.marks} marks</Badge>
              </div>

              {q.image && (
                <div className="ml-4">
                  <img
                    src={q.image}
                    alt="Question"
                    className="max-h-52 rounded border"
                  />
                </div>
              )}

              {q.type === "mcq" && q.options?.length ? (
                <ul className="pl-6 space-y-2">
                  {q.options.map((opt) => (
                    <li key={opt.id} className="flex items-center gap-3">
                      <span className="h-5 w-5 border border-muted-foreground rounded-full" />
                      <span>{opt.text}</span>
                    </li>
                  ))}
                </ul>
              ) : q.type === "mcq" ? (
                <p className="text-muted-foreground">No options provided.</p>
              ) : (
                <div className="p-4 border border-dashed rounded-md">
                  <p className="text-muted-foreground text-sm">
                    (Space for descriptive answer)
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
