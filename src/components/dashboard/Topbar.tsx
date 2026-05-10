"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard":           "Overview",
  "/dashboard/leads":     "Leads",
  "/dashboard/customers": "Customers",
  "/dashboard/jobs":      "Jobs",
  "/dashboard/quotes":    "Quotes",
  "/dashboard/tasks":     "Tasks",
  "/dashboard/settings":  "Settings",
};

export default function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";

  return (
    <header className="h-[56px] flex items-center justify-between px-6 border-b border-[#e5e5e5] bg-white shrink-0">
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
  );
}
