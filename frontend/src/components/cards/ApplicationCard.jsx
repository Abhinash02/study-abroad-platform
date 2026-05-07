import { formatDate } from "../../utils/format";

export default function ApplicationCard({ application }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        {application.program?.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {application.university?.name} • Intake: {application.intake}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {application.status}
        </span>
        <span className="text-xs text-slate-400">
          {formatDate(application.createdAt)}
        </span>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Timeline
        </p>
        <div className="mt-2 space-y-2">
          {application.timeline?.map((item, index) => (
            <div key={index} className="text-sm text-slate-600">
              <span className="font-medium capitalize">{item.status}</span> —{" "}
              {item.note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}