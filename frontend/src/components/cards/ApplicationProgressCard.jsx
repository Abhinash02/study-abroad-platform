const statusStyles = {
  draft: "bg-slate-100 text-slate-700",
  submitted: "bg-blue-100 text-blue-700",
  "under-review": "bg-amber-100 text-amber-700",
  "offer-received": "bg-emerald-100 text-emerald-700",
  "visa-processing": "bg-purple-100 text-purple-700",
  enrolled: "bg-teal-100 text-teal-700",
  rejected: "bg-red-100 text-red-700",
};

export default function ApplicationProgressCard({ application }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {application.program?.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {application.university?.name} • {application.destinationCountry} • Intake {application.intake}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[application.status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {application.status}
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {application.timeline?.map((step, index) => {
          const isLast = index === application.timeline.length - 1;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-primary" />
                {!isLast ? <div className="mt-1 h-full w-px bg-slate-200" /> : null}
              </div>

              <div className="pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold capitalize text-slate-900">
                    {step.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(step.changedAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{step.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}