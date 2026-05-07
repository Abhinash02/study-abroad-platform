// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Building2,
//   BookOpen,
//   Sparkles,
//   FileText,
//   User,
// } from "lucide-react";

// const items = [
//   { name: "Dashboard", path: "/", icon: LayoutDashboard },
//   { name: "Universities", path: "/universities", icon: Building2 },
//   { name: "Programs", path: "/programs", icon: BookOpen },
//   { name: "Recommendations", path: "/recommendations", icon: Sparkles },
//   { name: "Applications", path: "/applications", icon: FileText },
//   { name: "Profile", path: "/profile", icon: User },
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white p-5">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-primary">Waygood</h1>
//         <p className="text-sm text-slate-500">Study abroad dashboard</p>
//       </div>

//       <nav className="space-y-2">
//         {items.map((item) => {
//           const Icon = item.icon;
//           const active = location.pathname === item.path;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
//                 active
//                   ? "bg-teal-50 text-primary"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               <Icon size={18} />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }


// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Building2,
//   BookOpen,
//   Sparkles,
//   FileText,
//   User,
// } from "lucide-react";

// const items = [
//   { name: "Dashboard", path: "/", icon: LayoutDashboard },
//   { name: "Universities", path: "/universities", icon: Building2 },
//   { name: "Programs", path: "/programs", icon: BookOpen },
//   { name: "Recommendations", path: "/recommendations", icon: Sparkles },
//   { name: "Applications", path: "/applications", icon: FileText },
//   { name: "Profile", path: "/profile", icon: User },
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <aside className="hidden min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-primary">Waygood</h1>
//         <p className="text-sm text-slate-500">Study abroad dashboard</p>
//       </div>

//       <nav className="space-y-2">
//         {items.map((item) => {
//           const Icon = item.icon;
//           const active = location.pathname === item.path;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
//                 active
//                   ? "bg-teal-50 text-primary"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               <Icon size={18} />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Building2,
//   BookOpen,
//   Sparkles,
//   FileText,
//   User,
//   Scale,
//   LifeBuoy,
// } from "lucide-react";

// const items = [
//   { name: "Dashboard", path: "/", icon: LayoutDashboard },
//   { name: "Discover Universities", path: "/universities", icon: Building2 },
//   { name: "Programs", path: "/programs", icon: BookOpen },
//   { name: "Compare Programs", path: "/compare-programs", icon: Scale },
//   { name: "Recommendations", path: "/recommendations", icon: Sparkles },
//   { name: "Applications", path: "/applications", icon: FileText },
//   { name: "Counselor Support", path: "/support", icon: LifeBuoy },
//   { name: "Profile", path: "/profile", icon: User },
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white p-5">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-primary">Waygood</h1>
//         <p className="text-sm text-slate-500">Study abroad dashboard</p>
//       </div>

//       <nav className="space-y-2">
//         {items.map((item) => {
//           const Icon = item.icon;
//           const active = location.pathname === item.path;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
//                 active
//                   ? "bg-teal-50 text-primary"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`}
//             >
//               <Icon size={18} />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }



import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Sparkles,
  FileText,
  User,
  LifeBuoy,
} from "lucide-react";

const items = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Universities", path: "/universities", icon: Building2 },
  { name: "Programs", path: "/programs", icon: BookOpen },
  { name: "Recommendations", path: "/recommendations", icon: Sparkles },
  { name: "Applications", path: "/applications", icon: FileText },
  { name: "Support", path: "/support", icon: LifeBuoy },
  { name: "Profile", path: "/profile", icon: User },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Waygood</h1>
        <p className="text-sm text-slate-500">Study abroad dashboard</p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-teal-50 text-primary" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}