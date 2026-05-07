export default function EmptyState({ title, subtitle, action, actionText, icon: Icon }) {
  return (
    <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-16 text-center shadow-xl">
      <div className="mx-auto h-24 w-24 rounded-3xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white shadow-2xl mb-6">
        {Icon ? <Icon className="h-12 w-12" /> : "📭"}
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <p className="max-w-md text-lg text-slate-600 mx-auto">{subtitle}</p>
        {action && (
          <button
            onClick={action}
            className="rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-teal-500/25 transition-all"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}