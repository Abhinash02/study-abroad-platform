import React from "react";

export default function RecommendationCard({ item }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-teal-500/10 xl:hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-teal-900">
          {item.title}
        </h3>
        <div className="flex h-10 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
          <span className="text-sm font-bold">
            {item.matchScore}/100
          </span>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-600 line-clamp-1">
        {item.universityName} • {item.country} • {item.city}
      </p>

      <div className="mt-4">
        <div className="h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 shadow-inner"
            style={{ width: `${(item.matchScore / 100) * 100}%` }}
          />
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {item.reasons?.map((reason, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-teal-500" />
            {reason}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {item.scholarshipAvailable ? "Scholarship" : "No Scholarship"}
        </span>
        <span className="text-sm font-medium text-teal-700">
          ${item.tuitionFeeUsd?.toLocaleString()}
        </span>
      </div>
    </div>
  );
}