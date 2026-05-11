import OverviewCard from "@/components/dashboard/OverviewCard";

const overviewStats = [
  { label: "Open Leads",        value: "12",    note: "3 new this week"        },
  { label: "Active Customers",  value: "48",    note: "2 added this month"     },
  { label: "Jobs In Progress",  value: "7",     note: "2 due this week"        },
  { label: "Pending Quotes",    value: "5",     note: "$14,200 total value"    },
  { label: "Open Tasks",        value: "23",    note: "6 overdue"              },
  { label: "Revenue (MTD)",     value: "$8,400",note: "vs $7,100 last month"   },
];

const recentActivity = [
  { text: "New lead from Google Ads",        time: "2 hours ago",  badge: "Lead"     },
  { text: "Quote #042 sent to John Carter",  time: "Yesterday",    badge: "Quote"    },
  { text: "Job #018 marked as complete",     time: "Yesterday",    badge: "Job"      },
  { text: "Task overdue: Follow up call",    time: "2 days ago",   badge: "Task"     },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-[83px]">

      {/* Section: Overview */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="t-heading text-[#000000]">Good morning</h2>
          <p className="t-small text-[#737373] mt-1">
            Here&apos;s what&apos;s happening in your business today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[8px]">
          {overviewStats.map((stat) => (
            <OverviewCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              note={stat.note}
            />
          ))}
        </div>
      </section>

      {/* Section: Recent Activity */}
      <section className="flex flex-col gap-4">
        <h3 className="t-caption text-[#737373] uppercase tracking-widest font-medium">
          Recent Activity
        </h3>
        <div className="card-elevated flex flex-col divide-y divide-[#e5e5e5] p-0 overflow-hidden">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="badge-neutral shrink-0">{item.badge}</span>
                <span className="t-small text-[#0a0a0a] truncate">{item.text}</span>
              </div>
              <span className="t-caption text-[#737373] shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
