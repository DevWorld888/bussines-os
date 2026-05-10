"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview",   href: "/dashboard" },
  { label: "Leads",      href: "/dashboard/leads" },
  { label: "Customers",  href: "/dashboard/customers" },
  { label: "Jobs",       href: "/dashboard/jobs" },
  { label: "Quotes",     href: "/dashboard/quotes" },
  { label: "Tasks",      href: "/dashboard/tasks" },
];

const bottomItems = [
  { label: "Settings", href: "/dashboard/settings" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "flex items-center px-3 py-[7px] rounded-[10px] text-[13px] transition-colors",
        isActive
          ? "bg-[#f2f2f2] text-[#000000] font-semibold"
          : "text-[#737373] font-medium hover:bg-[#f2f2f2] hover:text-[#0a0a0a]",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 h-screen sticky top-0 flex flex-col border-r border-[#e5e5e5] bg-white">
      {/* Brand */}
      <div className="h-[56px] flex items-center px-5 border-b border-[#e5e5e5]">
        <span className="text-[14px] font-semibold text-[#000000] tracking-tight">
          Business OS
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="py-3 px-2 border-t border-[#e5e5e5] flex flex-col gap-0.5">
        {bottomItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </div>
    </aside>
  );
}
