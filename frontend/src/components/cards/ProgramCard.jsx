

import { formatCurrency } from "../../utils/format";

export default function ProgramCard({ program, onApply }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-semibold text-slate-900 sm:text-lg">
            {program.title}
          </h3>
          <p className="break-words text-sm text-slate-500">
            {program.universityName} • {program.country}
          </p>
        </div>
        <span className="inline-flex w-fit shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          {program.degreeLevel}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:mt-4 sm:grid-cols-2 sm:gap-3">
        <p className="break-words">Field: {program.field}</p>
        <p className="break-words">Tuition: {formatCurrency(program.tuitionFeeUsd)}</p>
        <p className="break-words">IELTS: {program.minimumIelts}</p>
        <p className="break-words">Intakes: {program.intakes.join(", ")}</p>
      </div>

      {onApply ? (
        <button
          onClick={() => onApply(program)}
          className="mt-4 w-full rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-700 sm:mt-5 sm:w-auto"
        >
          Apply Now
        </button>
      ) : null}
    </div>
  );
}