import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, Users, Package, FileText,
  AlertCircle, Plus, Eye, ArrowRight, Calendar, Star,
} from "lucide-react";
import {
  MOCK_LEADS, ADMIN_PRODUCTS, LEAD_TREND_DATA, LEAD_SOURCE_DATA,
  KVA_DEMAND_DATA, PIPELINE_DATA, TOP_PRODUCTS_DATA,
} from "@/data/adminData";

// ─── Mini Chart (SVG Sparkline) ────────────────────────────────────────────
function Sparkline({ data, color = "#D97706" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Bar Chart ──────────────────────────────────────────────────────────────
function MiniBarChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2.5">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <div className="w-28 text-xs text-muted-foreground truncate flex-shrink-0">{item.name}</div>
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}
            />
          </div>
          <div className="w-8 text-right text-xs font-semibold text-muted-foreground">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Donut Chart (SVG) ──────────────────────────────────────────────────────
function DonutChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const r = 38, cx = 50, cy = 50, circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg width={100} height={100} className="flex-shrink-0 -rotate-90">
        {data.map((item) => {
          const pct = item.value / total;
          const dash = pct * circumference;
          const gap = circumference - dash;
          const el = (
            <circle
              key={item.name}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={item.color}
              strokeWidth="12"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset * circumference}
              strokeLinecap="butt"
            />
          );
          offset += pct;
          return el;
        })}
      </svg>
      <div className="flex flex-col gap-1.5 min-w-0">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] text-muted-foreground truncate">{item.name}</span>
            <span className="text-[11px] font-semibold text-foreground ml-auto pl-2">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Funnel ─────────────────────────────────────────────────────────────────
function PipelineFunnel({ data }: { data: { stage: string; count: number; color: string }[] }) {
  const max = data[0]?.count || 1;
  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={item.stage} className="flex items-center gap-3">
          <div className="w-20 text-xs text-muted-foreground flex-shrink-0">{item.stage}</div>
          <div className="flex-1 flex justify-center">
            <div
              className="h-7 rounded-sm flex items-center justify-center text-xs font-bold text-foreground/90 transition-all duration-700"
              style={{
                width: `${Math.max((item.count / max) * 100, 25)}%`,
                backgroundColor: item.color,
                opacity: 1 - i * 0.07,
              }}
            >
              {item.count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── KPI Card ───────────────────────────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "neutral";
  change: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  sparkData?: number[];
  sparkColor?: string;
}

function KpiCard({ label, value, sub, trend, change, icon: Icon, iconColor, bgColor, sparkData, sparkColor }: KpiCardProps) {
  return (
    <div className="bg-card shadow-sm border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-border transition-colors group">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgColor}`}>
          <Icon size={18} className={iconColor} />
        </div>
        {sparkData && <Sparkline data={sparkData} color={sparkColor} />}
      </div>
      <div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-foreground font-display">{value}</span>
          <span className={`text-xs font-semibold pb-0.5 flex items-center gap-0.5 ${
            trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-muted-foreground"
          }`}>
            {trend === "up" ? <TrendingUp size={12} /> : trend === "down" ? <TrendingDown size={12} /> : null}
            {change}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// ─── Stage Badge ─────────────────────────────────────────────────────────────
const STAGE_COLORS: Record<string, string> = {
  new: "bg-slate-700/50 text-slate-300",
  contacted: "bg-blue-900/50 text-blue-300",
  qualified: "bg-amber-900/50 text-accent",
  site_assessment: "bg-purple-900/50 text-purple-300",
  quotation_sent: "bg-orange-900/50 text-orange-300",
  negotiation: "bg-yellow-900/50 text-yellow-300",
  won: "bg-green-900/50 text-green-300",
  lost: "bg-red-900/50 text-red-300",
};

const STAGE_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  site_assessment: "Site Assess",
  quotation_sent: "Quote Sent",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "products">("overview");

  const totalLeads = MOCK_LEADS.length;
  const openQuotes = MOCK_LEADS.filter((l) => l.stage === "quotation_sent").length;
  const wonDeals = MOCK_LEADS.filter((l) => l.stage === "won").length;
  const pendingFollowups = MOCK_LEADS.filter(
    (l) => !["won", "lost"].includes(l.stage)
  ).length;
  const recentLeads = MOCK_LEADS.slice(0, 5);
  const sparkTrend = LEAD_TREND_DATA.map((d) => d.leads);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Monday, 5 May 2025 — Welcome back, Admin</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/admin/leads")}
            className="flex items-center gap-1.5 px-3 py-2 bg-secondary hover:bg-secondary border border-border rounded-lg text-xs font-medium text-muted-foreground transition-colors"
          >
            <Eye size={13} /> View Leads
          </button>
          <button
            onClick={() => navigate("/admin/products/add")}
            className="flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-accent/90 rounded-lg text-xs font-bold text-accent-foreground transition-colors"
          >
            <Plus size={13} /> Add Product
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          label="Leads This Month"
          value={String(totalLeads)}
          sub="vs 6 last month"
          trend="up"
          change="+33%"
          icon={Users}
          iconColor="text-blue-400"
          bgColor="bg-blue-500/10"
          sparkData={sparkTrend}
          sparkColor="#3B82F6"
        />
        <KpiCard
          label="Open Quotations"
          value={String(openQuotes)}
          sub="Awaiting response"
          trend="neutral"
          change="—"
          icon={FileText}
          iconColor="text-accent"
          bgColor="bg-accent/10"
        />
        <KpiCard
          label="Products Listed"
          value={String(ADMIN_PRODUCTS.filter((p) => p.status === "published").length)}
          sub="7 published, 1 draft"
          trend="up"
          change="+2"
          icon={Package}
          iconColor="text-purple-400"
          bgColor="bg-purple-500/10"
        />
        <KpiCard
          label="Won Deals"
          value={String(wonDeals)}
          sub="Est. ₹48L revenue"
          trend="up"
          change="+1"
          icon={Star}
          iconColor="text-green-400"
          bgColor="bg-green-500/10"
          sparkData={[1, 1, 2, 2, 3, 3, 4]}
          sparkColor="#22C55E"
        />
        <KpiCard
          label="Pending Follow-ups"
          value={String(pendingFollowups)}
          sub="3 overdue today"
          trend="down"
          change="-2"
          icon={AlertCircle}
          iconColor="text-orange-400"
          bgColor="bg-orange-500/10"
        />
        <KpiCard
          label="AMC Renewals"
          value="4"
          sub="Due within 30 days"
          trend="neutral"
          change="Due soon"
          icon={Calendar}
          iconColor="text-rose-400"
          bgColor="bg-rose-500/10"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Lead Trend */}
        <div className="bg-card shadow-sm border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Lead Trend — May 2025</h3>
            <span className="text-xs text-green-400 font-medium">↑ 33% vs last month</span>
          </div>
          <div className="relative h-36">
            {(() => {
              const data = LEAD_TREND_DATA;
              const max = Math.max(...data.map((d) => d.leads));
              const w = 100, h = 100;
              const pts = data
                .map((d, i) => `${(i / (data.length - 1)) * w},${h - (d.leads / max) * h}`)
                .join(" ");
              const fillPts = `0,${h} ${pts} ${w},${h}`;
              return (
                <svg viewBox={`0 0 100 100`} className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D97706" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points={fillPts} fill="url(#leadGrad)" />
                  <polyline
                    points={pts}
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {data.map((d, i) => (
                    <circle
                      key={i}
                      cx={(i / (data.length - 1)) * w}
                      cy={h - (d.leads / max) * h}
                      r="1.5"
                      fill="#D97706"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              );
            })()}
          </div>
          <div className="flex items-center justify-between mt-2">
            {LEAD_TREND_DATA.filter((_, i) => i % 3 === 0).map((d) => (
              <span key={d.day} className="text-[10px] text-muted-foreground">{d.day}</span>
            ))}
          </div>
        </div>

        {/* Lead Source Donut */}
        <div className="bg-card shadow-sm border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Lead Sources</h3>
          <DonutChart data={LEAD_SOURCE_DATA} />
        </div>

        {/* Top Products */}
        <div className="bg-card shadow-sm border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Top Enquired Models</h3>
          <MiniBarChart
            data={TOP_PRODUCTS_DATA.map((d) => ({
              name: d.name,
              value: d.inquiries,
              color: "#D97706",
            }))}
          />
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pipeline Funnel */}
        <div className="bg-card shadow-sm border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Deal Pipeline</h3>
            <button
              onClick={() => navigate("/admin/leads/pipeline")}
              className="text-xs text-accent hover:text-accent flex items-center gap-1 transition-colors"
            >
              View Board <ArrowRight size={12} />
            </button>
          </div>
          <PipelineFunnel data={PIPELINE_DATA} />
        </div>

        {/* kVA Demand */}
        <div className="bg-card shadow-sm border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Demand by kVA Range</h3>
          <MiniBarChart
            data={KVA_DEMAND_DATA.map((d, i) => ({
              name: d.range,
              value: d.count,
              color: ["#D97706", "#EA580C", "#DC2626", "#7C3AED", "#1E40AF"][i],
            }))}
          />
        </div>
      </div>

      {/* Bottom Row: Recent Leads + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Leads */}
        <div className="xl:col-span-2 bg-card shadow-sm border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Recent Leads</h3>
            <button
              onClick={() => navigate("/admin/leads")}
              className="text-xs text-accent hover:text-accent flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center gap-4 px-5 py-3 hover:bg-secondary transition-colors cursor-pointer group"
                onClick={() => navigate(`/admin/leads/${lead.id}`)}
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-muted-foreground">{lead.name.slice(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{lead.company} · {lead.city}</p>
                </div>
                <div className="hidden sm:block text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-accent">{lead.kvaRequired}</p>
                  <p className="text-xs text-muted-foreground">{lead.application}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0 ${STAGE_COLORS[lead.stage]}`}>
                  {STAGE_LABELS[lead.stage]}
                </span>
                <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                  <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-6">{lead.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card shadow-sm border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Add New Lead", icon: Users, path: "/admin/leads", color: "text-blue-400 bg-blue-500/10" },
              { label: "Create Quotation", icon: FileText, path: "/admin/orders/quotations", color: "text-accent bg-accent/10" },
              { label: "Add Product", icon: Package, path: "/admin/products/add", color: "text-purple-400 bg-purple-500/10" },
              { label: "View Follow-ups", icon: AlertCircle, path: "/admin/leads/followups", color: "text-orange-400 bg-orange-500/10" },
              { label: "Service Tickets", icon: Calendar, path: "/admin/service", color: "text-rose-400 bg-rose-500/10" },
            ].map(({ label, icon: Icon, path, color }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors group text-left"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={14} />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                <ArrowRight size={13} className="ml-auto text-muted-foreground group-hover:text-muted-foreground transition-colors" />
              </button>
            ))}
          </div>

          {/* Today's summary */}
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Today's Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">New leads today</span>
                <span className="text-foreground font-medium">3</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Follow-ups due</span>
                <span className="text-orange-400 font-medium">5</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Overdue tasks</span>
                <span className="text-red-400 font-medium">2</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">AMC renewals (30d)</span>
                <span className="text-accent font-medium">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
