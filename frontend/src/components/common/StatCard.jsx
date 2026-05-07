import React from "react";

export default function StatCard({ icon: Icon, title, value, subtitle, trend, color = "slate" }) {
  const colors = {
    teal: "from-teal-500 to-teal-600 text-teal-600 ring-teal-100/50",
    blue: "from-blue-500 to-blue-600 text-blue-600 ring-blue-100/50",
    indigo: "from-indigo-500 to-indigo-600 text-indigo-600 ring-indigo-100/50",
    emerald: "from-emerald-500 to-emerald-600 text-emerald-600 ring-emerald-100/50",
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-500/10">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl bg-gradient-to-r opacity-10 blur-xl" />
      <div className="flex items-start justify-between">
        <div className="relative z-10">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 p-3 group-hover:scale-110 transition-transform">
            <Icon className="h-8 w-8 text-slate-600 group-hover:text-slate-800" />
          </div>
          <p className="mb-1 text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{value}</p>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          {trend && (
            <p className="mt-2 flex items-center gap-1 text-sm font-semibold">
              <span className={`text-${color}-600`}>↗️</span>
              {trend}
            </p>
          )}
        </div>
        <div className={`h-24 w-24 rounded-2xl bg-gradient-to-r ${colors[color]} ring-1 ring-inset opacity-20 blur-sm`} />
      </div>
    </div>
  );
}