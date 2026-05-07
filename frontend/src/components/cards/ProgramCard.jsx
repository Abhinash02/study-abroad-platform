import { formatCurrency } from "../../utils/format";

export default function ProgramCard({ program, onApply }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{program.title}</h3>
          <p className="text-sm text-slate-500">
            {program.universityName} • {program.country}
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          {program.degreeLevel}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
        <p>Field: {program.field}</p>
        <p>Tuition: {formatCurrency(program.tuitionFeeUsd)}</p>
        <p>IELTS: {program.minimumIelts}</p>
        <p>Intakes: {program.intakes.join(", ")}</p>
      </div>

      {onApply ? (
       <button
  onClick={() => onApply(program)}
  className="mt-5 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-700"
>
  Apply Now
</button>
) : null}
    </div>
  );
}