import { useState } from "react";
import {
  BarChart2, TrendingUp, Users, Package,
  Download, Calendar, Filter, Globe,
} from "lucide-react";
import {
  MOCK_LEADS, ADMIN_PRODUCTS, LEAD_TREND_DATA,
  KVA_DEMAND_DATA, PIPELINE_DATA, LEAD_SOURCE_DATA,
} from "@/data/adminData";

// ─── Simple Bar Chart (SVG) ──────────────────────────────────────────────────
function BarChart({
  data, color = "#D97706", height = 120,
}: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="w-full">
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground font-semibold">{item.value}</span>
            <div
              className="w-full rounded-t-md transition-all duration-700 hover:opacity-80 cursor-pointer"
              style={{
                height: `${Math.max((item.value / max) * (height - 24), 4)}px`,
                backgroundColor: color,
                opacity: 0.7 + (i / data.length) * 0.3,
              }}
              title={`${item.label}: ${item.value}`}
            />
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2 mt-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[9px] text-muted-foreground leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────
function MetricCard({
  label, value, sub, icon: Icon, color,
}: {
  label: string; value: string; sub: string; icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-card shadow-sm border border-border rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={15} className="text-current" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground font-display">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

export default function AdminReports() {
  const [dateRange, setDateRange] = useState("this_month");
  const [activeReport, setActiveReport] = useState<
    "overview" | "leads" | "products" | "regional"
  >("overview");

  const wonLeads = MOCK_LEADS.filter((l) => l.stage === "won");
  const lostLeads = MOCK_LEADS.filter((l) => l.stage === "lost");
  const conversionRate = Math.round((wonLeads.length / MOCK_LEADS.length) * 100);
  const totalInquiries = ADMIN_PRODUCTS.reduce((s, p) => s + p.inquiries, 0);

  const REPORT_TABS = [
    { key: "overview", label: "Overview", icon: BarChart2 },
    { key: "leads", label: "Lead Report", icon: Users },
    { key: "products", label: "Product Performance", icon: Package },
    { key: "regional", label: "Regional", icon: Globe },
  ] as const;

  const stateData = [
    { label: "Gujarat", value: 38 },
    { label: "Maharashtra", value: 29 },
    { label: "Rajasthan", value: 18 },
    { label: "MP", value: 9 },
    { label: "Goa", value: 6 },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Business intelligence across sales, leads, and products</p>
        </div>
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-card shadow-sm border border-border rounded-lg text-sm text-muted-foreground focus:outline-none focus:border-accent/50"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="this_quarter">This Quarter</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-accent/90 rounded-lg text-sm font-bold text-accent-foreground transition-colors">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex gap-1 border-b border-border">
        {REPORT_TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveReport(key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeReport === key
                ? "text-accent border-accent"
                : "text-muted-foreground border-transparent hover:text-muted-foreground"
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeReport === "overview" && (
        <div className="space-y-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              label="Total Leads"
              value={String(MOCK_LEADS.length)}
              sub="+33% vs last month"
              icon={Users}
              color="bg-blue-500/15 text-blue-400"
            />
            <MetricCard
              label="Won Deals"
              value={String(wonLeads.length)}
              sub={`Est. ₹48L revenue`}
              icon={TrendingUp}
              color="bg-green-500/15 text-green-400"
            />
            <MetricCard
              label="Conversion Rate"
              value={`${conversionRate}%`}
              sub={`${wonLeads.length} won of ${MOCK_LEADS.length} total`}
              icon={BarChart2}
              color="bg-accent/15 text-accent"
            />
            <MetricCard
              label="Product Inquiries"
              value={String(totalInquiries)}
              sub="Across all 8 products"
              icon={Package}
              color="bg-purple-500/15 text-purple-400"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card shadow-sm border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Lead Volume — Daily Trend</h3>
              <BarChart
                data={LEAD_TREND_DATA.map((d) => ({ label: d.day, value: d.leads }))}
                color="#D97706"
                height={140}
              />
            </div>

            <div className="bg-card shadow-sm border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Pipeline Conversion Funnel</h3>
              <div className="space-y-2.5">
                {PIPELINE_DATA.map((item) => (
                  <div key={item.stage} className="flex items-center gap-3">
                    <div className="w-24 text-xs text-muted-foreground">{item.stage}</div>
                    <div className="flex-1 h-6 bg-secondary rounded-md overflow-hidden">
                      <div
                        className="h-full rounded-md flex items-center pl-2 transition-all duration-700"
                        style={{
                          width: `${(item.count / PIPELINE_DATA[0].count) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      >
                        <span className="text-[11px] font-bold text-foreground/90">{item.count}</span>
                      </div>
                    </div>
                    <div className="w-12 text-right text-xs text-muted-foreground">
                      {Math.round((item.count / PIPELINE_DATA[0].count) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LEADS REPORT ── */}
      {activeReport === "leads" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "New Leads", value: MOCK_LEADS.filter(l => l.stage === "new").length, color: "text-slate-400" },
              { label: "In Pipeline", value: MOCK_LEADS.filter(l => !["won","lost","new"].includes(l.stage)).length, color: "text-accent" },
              { label: "Won", value: wonLeads.length, color: "text-green-400" },
              { label: "Lost", value: lostLeads.length, color: "text-red-400" },
            ].map((s) => (
              <div key={s.label} className="bg-card shadow-sm border border-border rounded-xl p-4">
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card shadow-sm border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Leads by Source</h3>
              <div className="space-y-3">
                {LEAD_SOURCE_DATA.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-sm text-muted-foreground flex-1">{s.name}</span>
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.value}%`, backgroundColor: s.color }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-10 text-right">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card shadow-sm border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Demand by kVA Range</h3>
              <BarChart
                data={KVA_DEMAND_DATA.map((d) => ({ label: d.range.split("–")[0], value: d.count }))}
                color="#1E40AF"
                height={120}
              />
            </div>
          </div>

          {/* Lead Summary Table */}
          <div className="bg-card shadow-sm border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Lead Summary by Assigned Rep</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  {["Sales Rep", "Assigned", "Won", "Lost", "Active", "Conversion"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {["Vikram Shah", "Priya Joshi", "Arjun Singh"].map((rep) => {
                  const repLeads = MOCK_LEADS.filter((l) => l.assignedTo === rep);
                  const won = repLeads.filter((l) => l.stage === "won").length;
                  const lost = repLeads.filter((l) => l.stage === "lost").length;
                  const active = repLeads.filter((l) => !["won","lost"].includes(l.stage)).length;
                  const conv = repLeads.length > 0 ? Math.round((won / repLeads.length) * 100) : 0;
                  return (
                    <tr key={rep} className="hover:bg-secondary transition-colors">
                      <td className="px-5 py-3 font-medium text-foreground">{rep}</td>
                      <td className="px-5 py-3 text-muted-foreground">{repLeads.length}</td>
                      <td className="px-5 py-3 text-green-400 font-semibold">{won}</td>
                      <td className="px-5 py-3 text-red-400">{lost}</td>
                      <td className="px-5 py-3 text-accent">{active}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${conv}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{conv}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PRODUCTS ── */}
      {activeReport === "products" && (
        <div className="space-y-4">
          <div className="bg-card shadow-sm border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Product Inquiry Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Product", "Category", "kVA", "Price", "Inquiries", "Share", "Stock"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ADMIN_PRODUCTS.sort((a, b) => b.inquiries - a.inquiries).map((p) => (
                    <tr key={p.id} className="hover:bg-secondary transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.model}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{p.category}</td>
                      <td className="px-4 py-3 text-accent font-semibold">{p.kva}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {p.price ? `₹${(p.price / 100000).toFixed(1)}L` : "On Request"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${(p.inquiries / totalInquiries) * 100 * 3}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{p.inquiries}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {Math.round((p.inquiries / totalInquiries) * 100)}%
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${
                          p.stock === "in_stock" ? "text-green-400" :
                          p.stock === "on_order" ? "text-accent" : "text-red-400"
                        }`}>
                          {p.stock === "in_stock" ? "In Stock" : p.stock === "on_order" ? "On Order" : "Discontinued"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── REGIONAL ── */}
      {activeReport === "regional" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card shadow-sm border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Leads by State</h3>
              <BarChart data={stateData} color="#D97706" height={140} />
            </div>
            <div className="bg-card shadow-sm border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">State-wise Breakdown</h3>
              <div className="space-y-3">
                {[
                  { state: "Gujarat", leads: 38, won: 4, revenue: "₹24L" },
                  { state: "Maharashtra", leads: 29, won: 2, revenue: "₹18L" },
                  { state: "Rajasthan", leads: 18, won: 2, revenue: "₹12L" },
                  { state: "Madhya Pradesh", leads: 9, won: 1, revenue: "₹6L" },
                  { state: "Goa", leads: 6, won: 0, revenue: "—" },
                ].map((row) => (
                  <div key={row.state} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{row.state}</p>
                      <p className="text-xs text-muted-foreground">{row.leads} leads · {row.won} won</p>
                    </div>
                    <span className="text-sm font-semibold text-accent">{row.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
