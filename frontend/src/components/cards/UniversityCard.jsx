import { Building2, Globe2, MapPin, Trophy } from "lucide-react";

export default function UniversityCard({ university }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
            <Building2 size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{university.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={14} />
              {university.city}, {university.country}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-primary">
          {university.partnerType}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">QS Ranking</p>
          <p className="mt-1 flex items-center gap-1 font-semibold text-slate-900">
            <Trophy size={14} />
            {university.qsRanking || "N/A"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Scholarship</p>
          <p className="mt-1 font-semibold text-slate-900">
            {university.scholarshipAvailable ? "Available" : "Not available"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <Globe2 size={14} />
        Popular score: {university.popularScore || 0}
      </div>
    </div>
  );
}