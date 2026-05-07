import { NavLink } from "react-router-dom";

export default function CounselorSidebar() {
  const linkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4">
      <h2 className="mb-6 text-lg font-bold text-slate-900">Counselor Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/counselor/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/counselor/applications" className={linkClass}>
          Applications
        </NavLink>

        <NavLink to="/counselor/students" className={linkClass}>
          Students
        </NavLink>

        <NavLink to="/counselor/programs" className={linkClass}>
          Programs
        </NavLink>
      </nav>
    </aside>
  );
}