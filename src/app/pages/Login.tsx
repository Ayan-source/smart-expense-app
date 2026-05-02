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
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1.45fr_1fr]">
        <section className="relative hidden overflow-hidden border-r border-border bg-sidebar p-10 text-sidebar-foreground lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.12),transparent_24%)]" />
          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-3 rounded-3xl bg-card/80 px-4 py-3 ring-1 ring-border shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-secondary/10 text-secondary ring-1 ring-border">
                <Wallet size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  SpendSmart
                </p>
                <p className="text-xs text-muted-foreground">
                  Premium expense intelligence
                </p>
              </div>
            </div>

            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                  Welcome back
                </p>
                <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                  Smart, secure access for your everyday finance flow.
                </h1>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted-foreground/95">
                Sign in quickly with confidence, stay in control of every
                transaction, and keep your money goals moving forward.
              </p>

              <div className="space-y-4">
                {BENEFITS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-3xl border border-border bg-card/80 p-4"
                  >
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-secondary ring-1 ring-border">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 rounded-[2rem] border border-border bg-card/90 p-6 shadow-2xl shadow-black/10">
            <div className="flex items-center gap-3 text-foreground">
              <Shield size={18} className="text-secondary" />
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
                  className="rounded-3xl bg-card p-4 text-center ring-1 ring-border"
                >
                  <p className="text-xl font-semibold text-foreground">
                    {badge.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-2xl">
            <div className="rounded-[2rem] border border-border bg-card/95 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-foreground">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary/10 text-secondary ring-1 ring-border">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                      Secure login
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      Access your SpendSmart workspace.
                    </h2>
                  </div>
                </div>

                <p className="text-base leading-7 text-muted-foreground">
                  Enter your details to continue. Your session is protected by
                  encryption and smart authentication.
                </p>
              </div>

              {loginError && (
                <div
                  className="mt-8 rounded-3xl border border-destructive/20 bg-destructive/10 p-5 text-destructive-foreground"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle size={18} className="text-destructive" />
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
                    className="text-sm font-semibold text-foreground block"
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
                    className={`w-full rounded-3xl border px-4 py-4 text-input bg-input-background outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                      errors.email
                        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                        : "border-border"
                    }`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-foreground block"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-sm font-semibold text-secondary hover:text-secondary/80"
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
                      className={`w-full rounded-3xl border px-4 py-4 pr-12 text-input bg-input-background outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                        errors.password
                          ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                          : "border-border"
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    {errors.password ? (
                      <p
                        id="password-error"
                        className="text-sm text-destructive"
                      >
                        {errors.password.message}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
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
                  <label className="inline-flex items-center gap-3 text-sm text-foreground">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      className="h-5 w-5 rounded-lg border border-border bg-input-background text-secondary focus:ring-secondary/30"
                    />
                    <span className="font-medium">Remember me for 30 days</span>
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Secure session for trusted devices.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="flex w-full items-center justify-center gap-3 rounded-3xl bg-primary text-primary-foreground px-5 py-4 text-base font-semibold shadow-xl shadow-primary/20 transition duration-200 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                >
                  {isLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
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

              <div className="mt-6 rounded-3xl border border-border bg-muted p-5">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 size={18} className="text-secondary" />
                  <p className="text-sm leading-6">
                    Prefer to explore first? Continue as a demo and preview the
                    dashboard instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Continue as demo
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Secure by default
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-6">
                    Every login is protected by encrypted transport and trusted
                    session controls.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Privacy assured
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-6">
                    We never share your credentials and your details stay
                    private in your browser.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-5 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button className="font-semibold text-foreground hover:text-primary transition-colors">
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
