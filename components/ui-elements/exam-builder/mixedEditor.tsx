"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DescriptiveEditor from "./descriptiveEditor";
import McqEditor from "./mcqEditor";

interface MixedEditorProps {
  initialData?: any;
  onCancel: () => void;
  onSave: (q: any) => void;
}

export default function MixedEditor({
  initialData,
  onCancel,
  onSave,
}: MixedEditorProps) {
  const [type, setType] = useState<"mcq" | "descriptive" | null>(
    initialData?.type || null,
  );

  if (type === "mcq") {
    return (
      <McqEditor
        initialData={initialData}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  }

  if (type === "descriptive") {
    return (
      <DescriptiveEditor
        initialData={initialData}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      <h3 className="text-lg font-semibold">Select Question Type</h3>

      <div className="flex gap-4 justify-center">
        <Button onClick={() => setType("mcq")}>MCQ Question</Button>

        <Button onClick={() => setType("descriptive")}>
          Descriptive Question
        </Button>
      </div>

      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}
