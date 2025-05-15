import Sidebar from "./Sidebar";

export default function DashboardLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {/*
        Removed ml-72 from the main content div. The sidebar uses fixed positioning and its own width (w-72 or w-20),
        so the main content should not be pushed with a left margin. This prevents excessive left spacing and keeps
        the layout consistent. If you need to account for the sidebar, use padding or a responsive layout instead.
        LEARNING: Always check for fixed margin or padding in layout components when debugging spacing issues.
      */}
      <div>
        <main className="p-8 max-w-5xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
