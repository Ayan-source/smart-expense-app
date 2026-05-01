import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import {
  Wallet,
  Eye,
  EyeOff,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const FEATURES = [
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Visualize spending patterns with beautiful, interactive charts' },
  { icon: Shield, title: 'Bank-level Security', desc: 'Your financial data is encrypted and fully protected at all times' },
  { icon: Zap, title: 'Smart Insights', desc: 'AI-powered suggestions to help you save more every month' },
  { icon: TrendingUp, title: 'Goal Tracking', desc: 'Set financial goals and watch your progress grow over time' },
];

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: 'alex@example.com', password: '', rememberMe: false },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoginError('');
    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1400));
    setIsLoading(false);

    if (data.email === 'wrong@test.com') {
      setLoginError('Invalid email or password. Please check your credentials and try again.');
      return;
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[48%] p-14 relative overflow-hidden bg-primary text-primary-foreground">
        {/* Modern ambient glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 mix-blend-screen bg-[radial-gradient(circle,rgba(45,212,191,0.25)_0%,transparent_70%)] translate-x-[-20%] translate-y-[-20%]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30 mix-blend-screen bg-[radial-gradient(circle,rgba(129,140,248,0.25)_0%,transparent_70%)] translate-x-[20%] translate-y-[20%]" />

        {/* Top: Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-teal-500 shadow-lg shadow-teal-500/20">
            <Wallet size={22} className="text-white" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight leading-tight">SpendSmart</p>
            <p className="text-xs text-primary-foreground/70 font-medium">Finance Manager</p>
          </div>
        </div>

        {/* Middle: Hero content */}
        <div className="relative z-10 space-y-12 max-w-lg mt-8">
          <div>
            <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15] tracking-tight mb-6">
              Take control of your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
                financial future
              </span>
            </h1>
            <p className="text-base text-primary-foreground/80 leading-relaxed max-w-md">
              Track income, manage expenses, and gain clarity on your spending habits — all in one elegant, premium dashboard.
            </p>
          </div>

          <div className="space-y-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/10 backdrop-blur-sm border border-white/10">
                  <Icon size={18} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1 tracking-tight">{title}</p>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Stats bar */}
        <div className="relative z-10 flex gap-10 mt-12 pt-8 border-t border-white/10">
          {[
            { value: '12,400+', label: 'Active users' },
            { value: '$2.8M+', label: 'Tracked monthly' },
            { value: '4.9★', label: 'User rating' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold tracking-tight mb-1">{value}</p>
              <p className="text-xs text-primary-foreground/60 font-medium uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden mb-12">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-md">
              <Wallet size={18} className="text-white" />
            </div>
            <p className="text-xl font-bold text-foreground">SpendSmart</p>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          {/* Error alert */}
          {loginError && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive animate-in fade-in zoom-in-95 duration-300">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium leading-relaxed">{loginError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground block">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                  })}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-card text-card-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring/20 focus:border-ring ${
                    errors.email ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-border'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive font-medium flex items-center gap-1.5 mt-1 animate-in slide-in-from-top-1">
                  <AlertCircle size={12} /> {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-foreground block">
                  Password
                </label>
                <button type="button" className="text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  className={`w-full px-4 py-3.5 pr-12 rounded-xl border bg-card text-card-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring/20 focus:border-ring ${
                    errors.password ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : 'border-border'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive font-medium flex items-center gap-1.5 mt-1 animate-in slide-in-from-top-1">
                  <AlertCircle size={12} /> {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  {...register('rememberMe')}
                  className="w-4.5 h-4.5 rounded border-border text-secondary focus:ring-secondary/30 transition-all cursor-pointer"
                />
              </div>
              <label htmlFor="remember" className="text-sm text-muted-foreground font-medium cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:active:scale-100 shadow-xl shadow-primary/10 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
            <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-secondary-foreground font-medium leading-relaxed">
              <span className="font-bold">Demo mode:</span> Enter any email and password (min 6 chars) to explore the app.
            </p>
          </div>

          <p className="text-center text-sm font-medium text-muted-foreground pt-4">
            Don't have an account?{' '}
            <button className="text-secondary font-bold hover:underline underline-offset-4 transition-all">
              Create one free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
