export default function Loader() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="space-y-2">
        <div className="mx-auto h-12 w-12 animate-spin rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg" />
        <p className="text-sm text-slate-500 text-center">Loading...</p>
      </div>
    </div>
  );
}