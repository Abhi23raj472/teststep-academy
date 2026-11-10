import LearnClient from "@/components/learn/LearnClient";
import studyRaw from "@/data/study.json";
export const metadata = { title: "Learn — TestStep Academy" };

export interface Phase { title: string; from: number; to: number; tone: string; text: string }
export interface Unit  { id: number; title: string; text: string }
export interface Lesson {
  id: string; unit: number; title: string;
  definitions?: { term: string; text: string }[];
  simple?: string;
  body?: string;
  example?: string;
  points?: string[];
  mistake?: string;
  docs?: string;
}
export interface CheatEntry { label: string; value: string; group: string }
export interface GlossaryEntry { term: string; definition: string }
export interface StudyData {
  phases: Phase[];
  units: Unit[];
  lessons: Lesson[];
  cheatsheet: CheatEntry[];
  glossary: GlossaryEntry[];
}

export default function LearnPage() {
  return <LearnClient study={studyRaw as unknown as StudyData} />;
}
