import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  Wallet,
  Eye,
  EyeOff,
  Shield,
  Zap,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Faster money oversight",
    desc: "Access budgets, income, and expenses from one secure dashboard.",
  },
  {
    icon: Shield,
    title: "Protected every session",
    desc: "Bank-grade encryption and privacy-first sign-in reassurance.",
  },
  {
    icon: Zap,
    title: "Instant demo mode",
    desc: "Try the product immediately without waiting for setup.",
  },
];

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "alex@example.com",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoginError("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);

    if (data.email === "wrong@test.com") {
      setLoginError(
        "Invalid email or password. Please check your credentials and try again.",
      );
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[1.45fr_1fr]">
        <section className="relative hidden overflow-hidden border-r border-slate-800/80 bg-slate-900/95 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.14),transparent_24%)]" />
          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-3 rounded-3xl bg-slate-950/70 px-4 py-3 ring-1 ring-white/10 shadow-sm shadow-slate-950/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-400/10 text-sky-300 ring-1 ring-slate-800">
                <Wallet size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
                  SpendSmart
                </p>
                <p className="text-xs text-slate-400">
                  Premium expense intelligence
                </p>
              </div>
            </div>

            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
                  Welcome back
                </p>
                <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  Smart, secure access for your everyday finance flow.
                </h1>
              </div>
              <p className="max-w-xl text-base leading-7 text-slate-300/95">
                Sign in quickly with confidence, stay in control of every
                transaction, and keep your money goals moving forward.
              </p>

              <div className="space-y-4">
                {BENEFITS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4"
                  >
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-sky-300 ring-1 ring-slate-700">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 rounded-[2rem] border border-slate-800/80 bg-slate-950/85 p-6 shadow-2xl shadow-slate-950/20">
            <div className="flex items-center gap-3 text-slate-200">
              <Shield size={18} className="text-sky-300" />
              <p className="text-sm leading-6">
                Bank-grade security and privacy-first protection on every login.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "98%", label: "Satisfaction" },
                { value: "AES-256", label: "Encryption" },
                { value: "Instant", label: "Access" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-3xl bg-slate-900/80 p-4 text-center ring-1 ring-slate-700/70"
                >
                  <p className="text-xl font-semibold text-white">
                    {badge.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-2xl">
            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-300 ring-1 ring-slate-800">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
                      Secure login
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Access your SpendSmart workspace.
                    </h2>
                  </div>
                </div>

                <p className="text-base leading-7 text-slate-300">
                  Enter your details to continue. Your session is protected by
                  encryption and smart authentication.
                </p>
              </div>

              {loginError && (
                <div
                  className="mt-8 rounded-3xl border border-rose-500/20 bg-rose-500/10 p-5 text-rose-100"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle size={18} className="text-rose-300" />
                    <p className="font-semibold">Sign in failed</p>
                  </div>
                  <p className="mt-2 text-sm leading-6">{loginError}</p>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
                noValidate
              >
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-200 block"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "Enter your email address",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className={`w-full rounded-3xl border px-4 py-4 text-slate-50 bg-slate-950/90 outline-none transition-all placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 ${
                      errors.email
                        ? "border-rose-500/50 focus:border-rose-400 focus:ring-rose-500/20"
                        : "border-slate-800"
                    }`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-rose-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-200 block"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-sm font-semibold text-slate-300 hover:text-white"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Enter your password",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      onKeyUp={(event) =>
                        setCapsLockOn(event.getModifierState("CapsLock"))
                      }
                      className={`w-full rounded-3xl border px-4 py-4 pr-12 text-slate-50 bg-slate-950/90 outline-none transition-all placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 ${
                        errors.password
                          ? "border-rose-500/50 focus:border-rose-400 focus:ring-rose-500/20"
                          : "border-slate-800"
                      }`}
                      aria-invalid={errors.password ? "true" : "false"}
                      aria-describedby={
                        errors.password
                          ? "password-error"
                          : capsLockOn
                            ? "capslock-warning"
                            : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100 transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    {errors.password ? (
                      <p id="password-error" className="text-sm text-rose-300">
                        {errors.password.message}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400">
                        Password must contain at least 6 characters.
                      </p>
                    )}
                    {capsLockOn && !errors.password && (
                      <p
                        id="capslock-warning"
                        className="text-sm text-amber-300"
                      >
                        Caps lock is on.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      className="h-5 w-5 rounded-lg border border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-400"
                    />
                    <span className="font-medium">Remember me for 30 days</span>
                  </label>
                  <p className="text-sm text-slate-400">
                    Secure session for trusted devices.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="flex w-full items-center justify-center gap-3 rounded-3xl bg-sky-500 px-5 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/20 transition duration-200 hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                >
                  {isLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5">
                <div className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={18} className="text-sky-300" />
                  <p className="text-sm leading-6">
                    Prefer to explore first? Continue as a demo and preview the
                    dashboard instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                >
                  Continue as demo
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4">
                  <p className="text-sm font-semibold text-slate-100">
                    Secure by default
                  </p>
                  <p className="mt-2 text-sm text-slate-400 leading-6">
                    Every login is protected by encrypted transport and trusted
                    session controls.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4">
                  <p className="text-sm font-semibold text-slate-100">
                    Privacy assured
                  </p>
                  <p className="mt-2 text-sm text-slate-400 leading-6">
                    We never share your credentials and your details stay
                    private in your browser.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-800/80 pt-5 text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <button className="font-semibold text-slate-100 hover:text-white transition-colors">
                  Create one free
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
