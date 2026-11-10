import CheatsheetClient from "@/components/learn/CheatsheetClient";
import studyRaw from "@/data/study.json";
export const metadata = { title: "TQL Cheatsheet — TestStep Academy" };
export default function CheatsheetPage() {
  return <CheatsheetClient study={studyRaw as any} />;
}
