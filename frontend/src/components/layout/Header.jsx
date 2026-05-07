// import { useAuth } from "../../hooks/useAuth";

// export default function Header() {
//   const { user, logout } = useAuth();

//   return (
//     <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
//       <div>
//         <h2 className="text-lg font-semibold text-slate-800">
//           Welcome back, {user?.fullName}
//         </h2>
//         <p className="text-sm text-slate-500">Manage your study abroad journey</p>
//       </div>

//       <button
//         onClick={logout}
//         className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
//       >
//         Logout
//       </button>
//     </header>
//   );
// }

import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Welcome back, {user?.fullName}
        </h2>
        <p className="text-sm text-slate-500">Manage your study abroad journey</p>
      </div>

      <button
        onClick={logout}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Logout
      </button>
    </header>
  );
}