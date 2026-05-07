import { useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { Mail, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";

export default function CounselorSupportPage() {
  const [formData, setFormData] = useState({
    category: "Admission Guidance",
    priority: "Medium",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Counselor Support</h2>
        <p className="text-sm text-slate-500">
          Connect with a counselor for program shortlisting, application review, visa guidance, and next steps.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Email Support</p>
                <p className="text-sm text-slate-500">support@waygood.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <PhoneCall size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Call Counselor Desk</p>
                <p className="text-sm text-slate-500">+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Live Counseling Window</p>
                <p className="text-sm text-slate-500">Mon - Sat • 10:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-teal-50 p-3 text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Support Scope</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-500">
                  <li>• University shortlisting</li>
                  <li>• SOP and document review</li>
                  <li>• Application follow-up</li>
                  <li>• Visa preparation guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">Raise a support request</h3>
          <p className="mt-2 text-sm text-slate-500">
            Submit your issue and a counselor can respond based on category and priority.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Support category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              >
                <option>Admission Guidance</option>
                <option>Program Selection</option>
                <option>Application Review</option>
                <option>Visa Assistance</option>
                <option>Scholarship Support</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Describe your issue
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Explain what help you need with your application, shortlist, visa, or documents..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              />
            </div>

            {submitted ? (
              <div className="md:col-span-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Support request submitted successfully. A counselor will review it soon.
              </div>
            ) : null}

            <div className="md:col-span-2">
   <button className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-700">
  Submit Request
</button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}