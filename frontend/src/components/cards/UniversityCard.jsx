import { Building2, Globe2, MapPin, Trophy } from "lucide-react";

export default function UniversityCard({ university }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-xl bg-slate-100 p-2.5 sm:p-3">
            <Building2 className="h-5 w-5 text-slate-700 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="break-words text-base font-semibold text-slate-900 sm:text-lg">
              {university.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 break-words text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5" />
              {university.city}, {university.country}
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-primary">
          {university.partnerType}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:mt-5 sm:grid-cols-2 sm:gap-3">
        <div className="rounded-xl bg-slate-50 p-2.5 sm:p-3">
          <p className="text-slate-500">QS Ranking</p>
          <p className="mt-1 flex items-center gap-1 font-semibold text-slate-900">
            <Trophy className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5" />
            {university.qsRanking || "N/A"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-2.5 sm:p-3">
          <p className="text-slate-500">Scholarship</p>
          <p className="font-semibold text-slate-900">
            {university.scholarshipAvailable ? "Available" : "Not available"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 sm:mt-4">
        <Globe2 className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5" />
        Popular score: {university.popularScore || 0}
      </div>
    </div>
  );
}
