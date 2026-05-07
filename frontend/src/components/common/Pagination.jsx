// export default function Pagination({ current = 1, totalPages = 1, onChange }) {
//   if (totalPages <= 1) return null;

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;
//     let start = Math.max(1, current - 2);
//     let end = Math.min(totalPages, start + maxVisible - 1);

//     if (end - start < maxVisible - 1) {
//       start = Math.max(1, end - maxVisible + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   return (
//     <div className="flex items-center justify-center gap-2">
//       <button
//         disabled={current <= 1}
//         onClick={() => onChange(current - 1)}
//         className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//       >
//         Previous
//       </button>

//       {getPageNumbers().map((page) => (
//         <button
//           key={page}
//           onClick={() => onChange(page)}
//           className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
//             current === page
//               ? "bg-teal-600 text-white shadow-md"
//               : "border border-slate-200 text-slate-700 hover:bg-slate-50"
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         disabled={current >= totalPages}
//         onClick={() => onChange(current + 1)}
//         className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
        <button
          key={item}
          onClick={() => onPageChange(item)}
          className={`rounded-lg px-3 py-2 text-sm ${
            page === item
              ? "bg-primary text-white"
              : "border border-slate-200 bg-white text-slate-700"
          }`}
        >
          {item}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}