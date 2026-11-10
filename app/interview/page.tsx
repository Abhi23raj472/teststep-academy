import InterviewClient from "@/components/interview/InterviewClient";
import questions from "@/data/questions.json";

export const metadata = { title: "Interview Prep — TestStep Academy" };

export interface SyntaxStep { label: string; code: string }
export interface Question {
  id: number;
  question: string;
  approach: string[];
  syntax: string | SyntaxStep[];
  docs: string;
  answer: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  source: { title: string; url: string };
}

export default function InterviewPage() {
  return <InterviewClient questions={questions as unknown as Question[]} />;
}
