import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    targetCountries: "",
    interestedFields: "",
    preferredIntake: "",
    maxBudgetUsd: "",
    englishTestExam: "IELTS",
    englishTestScore: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setFormData({
      fullName: user.fullName || "",
      targetCountries: (user.targetCountries || []).join(", "),
      interestedFields: (user.interestedFields || []).join(", "),
      preferredIntake: user.preferredIntake || "",
      maxBudgetUsd: user.maxBudgetUsd || "",
      englishTestExam: user.englishTest?.exam || "IELTS",
      englishTestScore: user.englishTest?.score || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await updateProfile({
        fullName: formData.fullName.trim(),
        targetCountries: formData.targetCountries
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interestedFields: formData.interestedFields
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        preferredIntake: formData.preferredIntake.trim(),
        maxBudgetUsd: Number(formData.maxBudgetUsd),
        englishTest: {
          exam: formData.englishTestExam,
          score: Number(formData.englishTestScore),
        },
      });

      setMessage("Profile updated successfully. Recommendations are now ready to refresh.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const isProfileReady =
    user?.targetCountries?.length &&
    user?.interestedFields?.length &&
    user?.preferredIntake &&
    Number(user?.maxBudgetUsd) > 0;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Profile Summary - Full width on mobile, 1/3 on desktop */}
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-soft lg:col-span-1 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Profile Summary</h2>
            <div className="space-y-3 sm:space-y-4 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Full Name</p>
                <p className="font-medium text-base sm:text-sm">{user?.fullName || "-"}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Email</p>
                <p className="font-medium text-base sm:text-sm break-all">{user?.email || "-"}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Role</p>
                <p className="font-medium text-base sm:text-sm capitalize">{user?.role || "-"}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Target Countries</p>
                <p className="font-medium text-base sm:text-sm">
                  {user?.targetCountries?.length ? user.targetCountries.join(", ") : "-"}
                </p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Interested Fields</p>
                <p className="font-medium text-base sm:text-sm">
                  {user?.interestedFields?.length ? user.interestedFields.join(", ") : "-"}
                </p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Preferred Intake</p>
                <p className="font-medium text-base sm:text-sm">{user?.preferredIntake || "-"}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Budget</p>
                <p className="font-medium text-base sm:text-sm">
                  {user?.maxBudgetUsd ? `$${user.maxBudgetUsd.toLocaleString()}` : "-"}
                </p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Recommendation Status</p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs sm:text-sm font-semibold ${
                    isProfileReady
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {isProfileReady ? "Ready for recommendations" : "Profile incomplete"}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile - Full width on mobile, 2/3 on desktop */}
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-soft lg:col-span-2 order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-4">Edit Profile</h2>
            <p className="text-sm text-slate-500 mb-4 sm:mb-6 leading-relaxed">
              Add your country, field, intake, and budget preferences to unlock recommendations.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Target Countries
                </label>
                <input
                  name="targetCountries"
                  value={formData.targetCountries}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Canada, Australia, UK"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Interested Fields
                </label>
                <input
                  name="interestedFields"
                  value={formData.interestedFields}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Computer Science, Business"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Preferred Intake
                </label>
                <select
                  name="preferredIntake"
                  value={formData.preferredIntake}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  <option value="">Select intake</option>
                  <option value="January">January</option>
                  <option value="May">May</option>
                  <option value="September">September</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Max Budget (USD)
                </label>
                <input
                  name="maxBudgetUsd"
                  type="number"
                  value={formData.maxBudgetUsd}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="25000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  English Test
                </label>
                <select
                  name="englishTestExam"
                  value={formData.englishTestExam}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="PTE">PTE</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Test Score
                </label>
                <input
                  name="englishTestScore"
                  type="number"
                  step="0.1"
                  value={formData.englishTestScore}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="6.5"
                />
              </div>

              {message ? (
                <p className="sm:col-span-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {message}
                </p>
              ) : null}

              {error ? (
                <p className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl border border-teal-700 bg-primary px-6 py-3 text-sm font-semibold text-black shadow-sm transition-all hover:bg-teal-600 hover:border-teal-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-auto"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
}