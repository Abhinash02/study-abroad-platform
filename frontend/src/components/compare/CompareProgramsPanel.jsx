export default function CompareProgramsPanel({ result }) {
  if (!result?.programs?.length) return null;

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="text-xl font-bold text-slate-900">Program Comparison</h3>
      <p className="mt-1 text-sm text-slate-500">
        Backend weighted comparison based on budget, IELTS, country, field, scholarship, and intake.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {result.programs.map((program) => (
          <div key={program._id} className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">{program.title}</h4>
                <p className="text-sm text-slate-500">
                  {program.universityName} • {program.country}
                </p>
              </div>
              <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-700">
                {program.comparisonPercentage}%
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${program.comparisonPercentage}%` }}
              />
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {program.reasons.map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}