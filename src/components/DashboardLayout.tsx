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
      <div className="ml-72">
        <main className="p-8 max-w-5xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
