"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconDashboard,
  IconLeads,
  IconCustomers,
  IconQuotes,
  IconJobs,
  IconCalendar,
  IconReviews,
  IconReports,
  IconSettings,
} from "@/components/dashboard/icons";

export const navItems = [
  { label: "Dashboard", href: "/dashboard",           icon: IconDashboard },
  { label: "Leads",     href: "/dashboard/leads",     icon: IconLeads },
  { label: "Customers", href: "/dashboard/customers", icon: IconCustomers },
  { label: "Quotes",    href: "/dashboard/quotes",    icon: IconQuotes },
  { label: "Jobs",      href: "/dashboard/jobs",      icon: IconJobs },
  { label: "Calendar",  href: "/dashboard/calendar",  icon: IconCalendar },
  { label: "Reviews",   href: "/dashboard/reviews",   icon: IconReviews },
  { label: "Reports",   href: "/dashboard/reports",   icon: IconReports },
];

export const bottomItems = [
  { label: "Settings", href: "/dashboard/settings", icon: IconSettings },
];

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof IconDashboard;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-2.5 px-3 py-[7px] rounded-[10px] text-[13px] transition-colors",
        isActive
          ? "bg-[#f2f2f2] text-[#000000] font-semibold"
          : "text-[#737373] font-medium hover:bg-[#f2f2f2] hover:text-[#0a0a0a]",
      ].join(" ")}
    >
      <Icon className="shrink-0" />
      {label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-56 shrink-0 h-screen sticky top-0 flex-col border-r border-[#e5e5e5] bg-white">
      {/* Brand */}
      <div className="h-[56px] flex items-center px-5 border-b border-[#e5e5e5]">
        <span className="text-[14px] font-semibold text-[#000000] tracking-tight">
          Business OS
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="py-3 px-2 border-t border-[#e5e5e5] flex flex-col gap-0.5">
        {bottomItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </div>
    </aside>
  );
}
