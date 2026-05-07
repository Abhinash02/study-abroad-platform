import { Outlet } from "react-router-dom";
import CounselorSidebar from "../components/layout/CounselorSidebar";

export default function CounselorLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <CounselorSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}