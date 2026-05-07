

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
    <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-semibold text-slate-900 sm:text-lg">
            {application.program?.title}
          </h3>
          <p className="mt-1 break-words text-xs text-slate-500 sm:text-sm">
            {application.university?.name} • {application.destinationCountry} • Intake {application.intake}
          </p>
        </div>

        <span
          className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[application.status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {application.status}
        </span>
      </div>

      <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
        {application.timeline?.map((step, index) => {
          const isLast = index === application.timeline.length - 1;

          return (
            <div key={index} className="flex gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 shrink-0 rounded-full bg-primary" />
                {!isLast ? <div className="mt-1 h-full w-px bg-slate-200" /> : null}
              </div>

              <div className="min-w-0 flex-1 pb-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                  <span className="break-words text-sm font-semibold capitalize text-slate-900">
                    {step.status}
                  </span>
                  <span className="break-words text-xs text-slate-400">
                    {new Date(step.changedAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 break-words text-sm leading-6 text-slate-500">
                  {step.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
