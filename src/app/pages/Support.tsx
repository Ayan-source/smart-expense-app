import { useRef } from "react";
import { useData } from "../context/DataContext";
import {
  Info,
  ShieldCheck,
  Sparkles,
  BookOpen,
  RefreshCw,
  Trash2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How does budgeting work?",
    answer:
      "Set monthly limits for categories, track your spending, and get real-time alerts when you approach or exceed your plan.",
  },
  {
    question: "Can I undo a deleted transaction?",
    answer:
      "Yes. Deleted items go to Trash and can be restored immediately from this Help page.",
  },
  {
    question: "How do I export my data?",
    answer:
      "Use the Export buttons on the income and expense pages to download CSV or JSON backups of your transactions.",
  },
  {
    question: "What is the Monthly Health Score?",
    answer:
      "It combines your saving rate and spending trend into a simple score so you can see how healthy your month looks at a glance.",
  },
];

export function Support() {
  const { trashTransactions, recoverTransaction, clearTrash } = useData();
  const restoreButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[1.5rem] border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-3xl grid place-items-center bg-indigo-500/10 text-indigo-600 shadow-inner">
              <Info size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Help Center
              </p>
              <h1 className="mt-3 text-3xl font-bold text-foreground">
                Smart finance guidance
              </h1>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Secure banking-style design",
                desc: "Protect your transaction history with clear privacy notices and trusted UI patterns.",
              },
              {
                icon: Sparkles,
                title: "Smart recommendations",
                desc: "Get savings tips, anomaly warnings, and recurring spend reminders that feel personal.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-background/70 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl grid place-items-center bg-secondary/10 text-secondary">
                    <item.icon size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-border bg-muted/50 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="mt-1 rounded-2xl bg-secondary/10 p-3 text-secondary">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  Getting started tutorial
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Follow a short walkthrough to set up your first goal, log a
                  transaction, and review your spending health.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Add your first income or expense",
                "Review the home dashboard insights",
                "Set category budgets and savings goals",
                "Use Quick Search with Ctrl/Cmd+K",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-3xl border border-border bg-background p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-3xl grid place-items-center bg-emerald-500/10 text-emerald-600">
                <RefreshCw size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Quick support
                </p>
                <h2 className="text-xl font-bold text-foreground">
                  Recover deleted items
                </h2>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Deleted transactions are kept for recovery for a short time.
              Restore anything by clicking restore below.
            </p>
            {trashTransactions.length === 0 ? (
              <div className="rounded-3xl border border-border bg-background/80 px-4 py-6 text-center">
                <CheckCircle2
                  size={24}
                  className="mx-auto mb-3 text-emerald-500"
                />
                <p className="text-sm font-semibold text-foreground">
                  Trash is empty
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  No deleted transactions need recovery right now.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {trashTransactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between gap-3 rounded-3xl border border-border bg-background p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {tx.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.category} · {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      ref={restoreButtonRef}
                      onClick={() => recoverTransaction(tx.id)}
                      className="rounded-2xl bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary hover:bg-secondary/20 transition-all"
                    >
                      Restore
                    </button>
                  </div>
                ))}
                <button
                  onClick={clearTrash}
                  className="w-full rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-all"
                >
                  Empty Trash
                </button>
              </div>
            )}
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-3xl grid place-items-center bg-secondary/10 text-secondary">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  FAQ
                </p>
                <h2 className="text-xl font-bold text-foreground">
                  Frequently asked questions
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.question}
                  className="rounded-3xl border border-border bg-background p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.question}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.25em]">
              Learn more
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">
              How budgeting and savings goals work
            </h2>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-secondary/10 px-5 py-3 text-sm font-semibold text-secondary hover:bg-secondary/20 transition-all">
            <ArrowRight size={16} /> Explore tips
          </button>
        </div>
        <div className="grid gap-5 mt-8 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">
              Set clear goals
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Create a small list of savings milestones and check progress each
              week.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">
              Track recurring spend
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Review subscriptions and automatic payments to avoid surprise
              charges.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">
              Review monthly health
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Use the health score and cashflow insights to stay on track
              without stress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
