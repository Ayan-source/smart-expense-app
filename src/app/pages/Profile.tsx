import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Camera,
  Save,
  Lock,
  Bell,
  Palette,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  timezone: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const TIMEZONES = [
  'UTC-08:00 Pacific Time',
  'UTC-07:00 Mountain Time',
  'UTC-06:00 Central Time',
  'UTC-05:00 Eastern Time',
  'UTC+00:00 UTC / GMT',
  'UTC+01:00 Central European Time',
  'UTC+03:00 East Africa Time',
  'UTC+05:30 India Standard Time',
  'UTC+08:00 China Standard Time',
  'UTC+09:00 Japan Standard Time',
];

function DeleteAccountModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [confirmText, setConfirmText] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onCancel} />
      <div className="relative rounded-2xl shadow-2xl p-6 w-full max-w-sm bg-card border border-border animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-destructive/10 border border-destructive/20 shadow-sm">
              <AlertTriangle size={24} className="text-destructive" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-card-foreground tracking-tight">Delete Account</h3>
              <p className="text-[13px] font-medium text-muted-foreground mt-0.5">This action cannot be undone</p>
            </div>
          </div>
          <p className="text-[13.5px] text-muted-foreground leading-relaxed">
            All your data, transactions, and settings will be permanently deleted. Type <strong className="text-foreground">DELETE</strong> to confirm.
          </p>
          <input
            type="text"
            placeholder="Type DELETE to confirm"
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 text-[14px] font-bold text-foreground outline-none focus:bg-background focus:ring-2 focus:ring-destructive/20 focus:border-destructive transition-all"
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-border bg-muted/50 text-foreground font-semibold text-[14px] transition-all hover:bg-muted hover:border-muted-foreground/30"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={confirmText !== 'DELETE'}
              className="flex-1 py-2.5 rounded-xl font-semibold text-[14px] transition-all"
              style={{
                background: confirmText === 'DELETE' ? '#ef4444' : 'var(--muted)',
                color: confirmText === 'DELETE' ? 'white' : 'var(--muted-foreground)',
                cursor: confirmText === 'DELETE' ? 'pointer' : 'not-allowed',
                opacity: confirmText === 'DELETE' ? 1 : 0.7,
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  const navigate = useNavigate();
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPw, setIsSavingPw] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    weeklyReport: true,
    budgetAlerts: true,
    newExpense: false,
    monthlyDigest: true,
  });

  // Theme
  const [accentColor, setAccentColor] = useState<'indigo' | 'teal' | 'violet'>('indigo');

  const {
    register: regProfile,
    handleSubmit: handleProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1 (555) 012-3456',
      timezone: 'UTC-05:00 Eastern Time',
    },
    mode: 'onChange',
  });

  const {
    register: regPw,
    handleSubmit: handlePw,
    reset: resetPw,
    watch,
    formState: { errors: pwErrors, isValid: pwValid },
  } = useForm<PasswordForm>({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const newPasswordValue = watch('newPassword');

  const onSaveProfile = async (data: ProfileForm) => {
    setIsSavingProfile(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSavingProfile(false);
    toast.success('Profile updated successfully!', { description: `Changes saved for ${data.name}` });
  };

  const onChangePassword = async () => {
    setIsSavingPw(true);
    await new Promise(r => setTimeout(r, 900));
    setIsSavingPw(false);
    resetPw();
    toast.success('Password changed successfully!', { description: 'Your new password is active.' });
  };

  const handleLogout = () => {
    toast.info('Signing out…');
    setTimeout(() => navigate('/login'), 800);
  };

  const accentColors = {
    indigo: { name: 'Indigo', bg: '#6366f1', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/20' },
    teal: { name: 'Teal', bg: '#0d9488', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-500/20' },
    violet: { name: 'Violet', bg: '#7c3aed', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/20' },
  };

  return (
    <div className="p-6 lg:p-10 max-w-[900px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
          Profile & Settings
        </h1>
        <p className="text-[15px] text-muted-foreground font-medium">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile card */}
      <div className="rounded-[1.25rem] border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
            <User size={18} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-[18px] font-bold text-card-foreground">Personal Information</h2>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
          <div
            className="relative cursor-pointer group"
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
            onClick={() => toast.info('Photo upload coming soon!')}
          >
            <div className="w-24 h-24 rounded-[1.25rem] flex items-center justify-center text-white transition-all duration-300 shadow-md group-hover:scale-105 group-active:scale-95 bg-gradient-to-br from-indigo-500 to-teal-500">
              <span className="text-3xl font-bold tracking-tight">AJ</span>
            </div>
            <div className={`absolute inset-0 rounded-[1.25rem] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300 ${avatarHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-[18px] font-bold text-card-foreground mb-1">Alex Johnson</p>
            <p className="text-[14px] font-medium text-muted-foreground mb-3">alex@example.com</p>
            <button
              onClick={() => toast.info('Photo upload coming soon!')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all text-foreground font-semibold text-[13px] shadow-sm"
            >
              <Camera size={14} className="text-muted-foreground" />
              Change Photo
            </button>
          </div>
        </div>

        {/* Profile form */}
        <form onSubmit={handleProfile(onSaveProfile)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider block">
                Full Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  {...regProfile('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-muted/50 text-[14px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 ${profileErrors.name ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border focus:ring-secondary/20 focus:border-secondary'}`}
                />
              </div>
              {profileErrors.name && <p className="text-[11px] font-bold text-destructive">{profileErrors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider block">
                Email <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  {...regProfile('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-muted/50 text-[14px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 ${profileErrors.email ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border focus:ring-secondary/20 focus:border-secondary'}`}
                />
              </div>
              {profileErrors.email && <p className="text-[11px] font-bold text-destructive">{profileErrors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider block">
                Phone
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  {...regProfile('phone')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/50 text-[14px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                />
              </div>
            </div>

            {/* Timezone */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider block">
                Timezone
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  {...regProfile('timezone')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-muted/50 text-[14px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-secondary/20 focus:border-secondary appearance-none cursor-pointer"
                >
                  {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSavingProfile}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold text-[14px] transition-all hover:bg-secondary/90 hover:shadow-md hover:shadow-secondary/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSavingProfile ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-current/40 border-t-current animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="rounded-[1.25rem] border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
            <Lock size={18} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-card-foreground">Change Password</h2>
            <p className="text-[13px] font-medium text-muted-foreground mt-0.5">Keep your account secure</p>
          </div>
        </div>

        <form onSubmit={handlePw(onChangePassword)} className="space-y-6">
          {/* Current password */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider block">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPw ? 'text' : 'password'}
                placeholder="Enter current password"
                {...regPw('currentPassword', { required: 'Current password is required' })}
                className={`w-full px-4 py-3 pr-11 rounded-xl border bg-muted/50 text-[14px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 ${pwErrors.currentPassword ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border focus:ring-secondary/20 focus:border-secondary'}`}
              />
              <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* New password */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider block">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  {...regPw('newPassword', {
                    required: 'New password is required',
                    minLength: { value: 8, message: 'At least 8 characters' },
                  })}
                  className={`w-full px-4 py-3 pr-11 rounded-xl border bg-muted/50 text-[14px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 ${pwErrors.newPassword ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border focus:ring-secondary/20 focus:border-secondary'}`}
                />
                <button type="button" onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {pwErrors.newPassword && <p className="text-[11px] font-bold text-destructive">{pwErrors.newPassword.message}</p>}
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  placeholder="Repeat new password"
                  {...regPw('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: val => val === newPasswordValue || 'Passwords do not match',
                  })}
                  className={`w-full px-4 py-3 pr-11 rounded-xl border bg-muted/50 text-[14px] font-bold text-foreground outline-none transition-all focus:bg-background focus:ring-2 ${pwErrors.confirmPassword ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border focus:ring-secondary/20 focus:border-secondary'}`}
                />
                <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {pwErrors.confirmPassword && <p className="text-[11px] font-bold text-destructive">{pwErrors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Password strength hint */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <ShieldCheck size={18} className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <p className="text-[13px] font-medium text-sky-700 dark:text-sky-300 leading-relaxed">
              Use 8+ characters with a mix of letters, numbers, and symbols for a strong password.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSavingPw || !pwValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[14px] transition-all ${
                pwValid && !isSavingPw
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 active:scale-95'
                  : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'
              }`}
            >
              {isSavingPw ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-current/40 border-t-current animate-spin" />
                  Updating…
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-[1.25rem] border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 shadow-inner">
            <Bell size={18} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-card-foreground">Notification Preferences</h2>
            <p className="text-[13px] font-medium text-muted-foreground mt-0.5">Choose what you want to be notified about</p>
          </div>
        </div>

        <div className="space-y-0">
          {[
            { key: 'weeklyReport', label: 'Weekly Summary Report', desc: 'Get a weekly digest of your spending and savings' },
            { key: 'budgetAlerts', label: 'Budget Limit Alerts', desc: 'Notify me when I\'m approaching my monthly budget limit' },
            { key: 'newExpense', label: 'New Expense Confirmation', desc: 'Receive a notification whenever an expense is logged' },
            { key: 'monthlyDigest', label: 'Monthly Financial Digest', desc: 'Detailed monthly performance report with insights' },
          ].map(({ key, label, desc }, i, arr) => (
            <div
              key={key}
              className={`flex items-center justify-between py-5 ${i < arr.length - 1 ? 'border-b border-border/60' : ''}`}
            >
              <div className="pr-6">
                <p className="text-[14.5px] font-bold text-foreground mb-1">{label}</p>
                <p className="text-[13px] font-medium text-muted-foreground leading-relaxed">{desc}</p>
              </div>
              <button
                onClick={() => {
                  setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifications] }));
                  toast.success(`${label} ${notifications[key as keyof typeof notifications] ? 'disabled' : 'enabled'}`);
                }}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shrink-0 ${
                  notifications[key as keyof typeof notifications] ? 'bg-secondary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    notifications[key as keyof typeof notifications] ? 'translate-x-[22px]' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Display preferences */}
      <div className="rounded-[1.25rem] border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/10 border border-violet-500/20 shadow-inner">
            <Palette size={18} className="text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-card-foreground">Display Preferences</h2>
            <p className="text-[13px] font-medium text-muted-foreground mt-0.5">Customize the app appearance</p>
          </div>
        </div>

        <div>
          <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Accent Color
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {(Object.entries(accentColors) as [string, { name: string; bg: string; text: string; border: string }][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => { setAccentColor(key as typeof accentColor); toast.success(`Theme changed to ${val.name}`); }}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border transition-all font-bold text-[13px] shadow-sm active:scale-95 ${
                  accentColor === key 
                    ? `bg-muted/30 ${val.border} ${val.text}` 
                    : 'bg-card border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
                  style={{ background: val.bg }}
                />
                {val.name}
                {accentColor === key && (
                  <CheckCircle2 size={16} className="ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-[1.25rem] border border-destructive/30 bg-destructive/5 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-destructive/10 border border-destructive/20 shadow-inner">
            <AlertTriangle size={18} className="text-destructive" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-destructive">Danger Zone</h2>
            <p className="text-[13px] font-medium text-destructive/80 mt-0.5">Irreversible and destructive actions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-destructive/20">
          <div className="pr-4">
            <p className="text-[14.5px] font-bold text-foreground mb-1">Sign Out</p>
            <p className="text-[13px] font-medium text-muted-foreground leading-relaxed">Sign out of your account on this device</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-all text-foreground font-bold text-[13px] shadow-sm shrink-0 active:scale-95"
          >
            <LogOut size={16} className="text-muted-foreground" />
            Sign Out
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6">
          <div className="pr-4">
            <p className="text-[14.5px] font-bold text-foreground mb-1">Delete Account</p>
            <p className="text-[13px] font-medium text-muted-foreground leading-relaxed">Permanently delete your account and all associated data</p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-destructive/20 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all font-bold text-[13px] shadow-sm shrink-0 active:scale-95"
          >
            <Trash2 size={16} />
            Delete Account
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal
          onConfirm={() => {
            setShowDeleteModal(false);
            toast.success('Account deleted. Goodbye!');
            setTimeout(() => navigate('/login'), 1200);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
