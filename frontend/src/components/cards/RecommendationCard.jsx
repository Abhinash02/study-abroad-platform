

import React from "react";

export default function RecommendationCard({ item }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm transition-all hover:shadow-lg hover:shadow-teal-500/10 sm:p-5 lg:p-6 xl:hover:-translate-y-1">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="line-clamp-2 break-words text-lg font-bold text-slate-900 group-hover:text-teal-900 sm:text-xl">
          {item.title}
        </h3>

        <div className="flex h-10 w-fit min-w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-3 text-white shadow-lg">
          <span className="text-sm font-bold">
            {item.matchScore}/100
          </span>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 break-words text-sm text-slate-600 sm:line-clamp-1">
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
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
            <span className="break-words">{reason}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex w-fit rounded-lg bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {item.scholarshipAvailable ? "Scholarship" : "No Scholarship"}
        </span>
        <span className="break-words text-sm font-medium text-teal-700">
          ${item.tuitionFeeUsd?.toLocaleString()}
        </span>
      </div>
    </div>
  );
}