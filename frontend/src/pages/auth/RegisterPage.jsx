import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    const value = formData.password;
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (!value) return { label: "Add a secure password", color: "bg-slate-200", width: "w-0" };
    if (score <= 1) return { label: "Weak password", color: "bg-red-500", width: "w-1/4" };
    if (score === 2) return { label: "Fair password", color: "bg-amber-500", width: "w-2/4" };
    if (score === 3) return { label: "Good password", color: "bg-blue-500", width: "w-3/4" };
    return { label: "Strong password", color: "bg-emerald-500", width: "w-full" };
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between bg-slate-900 px-10 py-12 text-white">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur">
              <GraduationCap size={18} />
              Waygood Student Platform
            </div>

            <div className="mt-12 max-w-xl">
              <h1 className="text-5xl font-bold leading-tight">
                Build your study abroad journey with a smarter application workspace
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Discover universities, compare programs, track applications, and unlock personalized recommendations from one professional dashboard.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-teal-500/15 p-2 text-teal-300">
                  <Globe2 size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">Global discovery</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Search universities and programs by country, intake, field, and budget.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-300">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">Personalized matching</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Use your preferences to get recommendation-ready program suggestions.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-500/15 p-2 text-blue-300">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">Secure account access</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Protected routes, token-based authentication, and profile-based workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl">
            <div className="mb-6 lg:hidden">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <GraduationCap size={18} className="text-primary" />
                Waygood Student Platform
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Create your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Register to explore programs, manage applications, and unlock tailored recommendations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-teal-50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-teal-50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-teal-50"
                    required
                  />
                  <div className="mt-3">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{passwordStrength.label}</span>
                      <span className="text-slate-400">
                        Use 8+ chars, uppercase, number, symbol
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Register as
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-teal-50"
                  >
                    <option value="student">Student</option>
                    <option value="counselor">Counselor</option>
                  </select>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

              <button
  type="submit"
  disabled={loading}
  className="w-full rounded-2xl bg-teal-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-teal-400 disabled:opacity-70"
>
  {loading ? "Creating account..." : "Create account"}
</button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Account access
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary transition hover:text-teal-800"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-slate-500">
              By creating an account, you can manage profiles, explore universities, and track your application progress in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}