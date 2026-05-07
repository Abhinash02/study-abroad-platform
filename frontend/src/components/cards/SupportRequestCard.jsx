
import { useState } from "react";

export default function SupportRequestCard({
  request,
  user,
  onReply,
  onCounselorUpdate,
  onStudentUpdate,
  onStudentDelete,
}) {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(request.counselorFeedback || "");
  const [status, setStatus] = useState(request.status);
  const [subject, setSubject] = useState(request.subject);
  const [description, setDescription] = useState(request.description);
  const [category, setCategory] = useState(request.category);

  const studentId =
    typeof request.student === "object" ? request.student?._id : request.student;

  const isOwner = user?.role === "student" && studentId === user?.id;
  const canDelete = isOwner && request.status === "open";
  const canEdit = isOwner && request.status !== "resolved";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-semibold text-slate-900 sm:text-lg">
            {request.subject}
          </h3>
          <p className="break-words text-sm text-slate-500">
            {request.category} • {request.student?.fullName}
          </p>
        </div>
        <span className="inline-flex w-fit shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {request.status}
        </span>
      </div>

      <p className="mt-4 break-words text-sm text-slate-700">{request.description}</p>

      {request.counselorFeedback ? (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3 sm:p-4">
          <p className="text-xs font-semibold uppercase text-emerald-700">
            Counselor feedback
          </p>
          <p className="mt-1 break-words text-sm text-emerald-900">
            {request.counselorFeedback}
          </p>
        </div>
      ) : null}

      <div className="mt-4 space-y-3">
        {request.messages?.map((item, index) => (
          <div key={index} className="rounded-xl bg-slate-50 p-3 text-sm">
            <p className="break-words font-medium text-slate-800">
              {item.sender?.fullName || item.senderRole} ({item.senderRole})
            </p>
            <p className="mt-1 break-words text-slate-600">{item.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a reply..."
          className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm sm:px-4"
          rows={3}
        />
        <button
          onClick={() => {
            onReply(request._id, message);
            setMessage("");
          }}
          className="mt-3 w-full rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-700 sm:w-auto"
        >
          Send Reply
        </button>
      </div>

      {canEdit ? (
        <div className="mt-5 border-t border-slate-200 pt-4">
          <h4 className="text-sm font-semibold text-slate-900">
            Update support request
          </h4>

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm sm:px-4"
            placeholder="Subject"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm sm:px-4"
          >
            <option value="general">general</option>
            <option value="admission">admission</option>
            <option value="visa">visa</option>
            <option value="documents">documents</option>
            <option value="finance">finance</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm sm:px-4"
            rows={4}
            placeholder="Describe your issue"
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() =>
                onStudentUpdate(request._id, { subject, description, category })
              }
              className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
            >
              Update Request
            </button>

            {canDelete ? (
              <button
                onClick={() => onStudentDelete(request._id)}
                className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
              >
                Delete Request
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {user?.role === "counselor" ? (
        <div className="mt-5 border-t border-slate-200 pt-4">
          <h4 className="text-sm font-semibold text-slate-900">
            Update counselor feedback
          </h4>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm sm:px-4"
          >
            <option value="open">open</option>
            <option value="in-progress">in-progress</option>
            <option value="resolved">resolved</option>
          </select>

          <button
            onClick={() =>
              onCounselorUpdate(request._id, {
                counselorFeedback: feedback,
                status,
              })
            }
            className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
          >
            Save Feedback
          </button>
        </div>
      ) : null}
    </div>
  );
}