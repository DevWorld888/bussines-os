"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, bottomItems } from "@/components/dashboard/Sidebar";

const titles: Record<string, string> = {
  "/dashboard":           "Dashboard",
  "/dashboard/leads":     "Leads",
  "/dashboard/customers": "Customers",
  "/dashboard/quotes":    "Quotes",
  "/dashboard/jobs":      "Jobs",
  "/dashboard/calendar":  "Calendar",
  "/dashboard/reviews":   "Reviews",
  "/dashboard/reports":   "Reports",
  "/dashboard/tasks":     "Tasks",
  "/dashboard/settings":  "Settings",
};

function MobileNavLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: (typeof navItems)[number]["icon"];
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-[14px] transition-colors",
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

export default function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const close = () => setDrawerOpen(false);

  return (
    <>
      <header className="h-[56px] flex items-center justify-between px-4 sm:px-6 border-b border-[#e5e5e5] bg-white shrink-0">
        {/* Hamburger — mobile only */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="w-5 h-px bg-[#0a0a0a] block" />
          <span className="w-5 h-px bg-[#0a0a0a] block" />
          <span className="w-5 h-px bg-[#0a0a0a] block" />
        </button>

        <h1 className="t-heading text-[#000000]">{title}</h1>

        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full bg-[#f2f2f2] border border-[#e5e5e5] flex items-center justify-center"
            style={{ fontSize: "11px", fontWeight: 600, color: "#737373" }}
          >
            A
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={close}
          />
          <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-[#e5e5e5] z-50 flex flex-col md:hidden">
            <div className="h-[56px] flex items-center justify-between px-5 border-b border-[#e5e5e5]">
              <span className="text-[14px] font-semibold text-[#000000] tracking-tight">
                Business OS
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="w-7 h-7 flex items-center justify-center text-[#737373] hover:text-[#0a0a0a] text-[16px]"
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5 overflow-y-auto">
              {navItems.map((item) => (
                <MobileNavLink key={item.href} href={item.href} label={item.label} icon={item.icon} onClick={close} />
              ))}
            </nav>
            <div className="py-3 px-2 border-t border-[#e5e5e5] flex flex-col gap-0.5">
              {bottomItems.map((item) => (
                <MobileNavLink key={item.href} href={item.href} label={item.label} icon={item.icon} onClick={close} />
              ))}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
