import { BookOpen } from "lucide-react";
import { SectionTitle } from "../components/SectionTitle";
import DashboardMenuToolbar from "../components/DashboardMenuToolbar";

export default function DashboardPageMenu() {
  return (
    <section>
      <SectionTitle
        title="منو"
        icon={<BookOpen size={20} className="text-gray-500" />}
      />
      <DashboardMenuToolbar />
    </section>
  );
}
