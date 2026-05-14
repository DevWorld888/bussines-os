"use client";

import { useState } from "react";

type Tab = "profile" | "business" | "notifications";

/* ── Shared sub-components ────────────────────────────────────────── */

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "profile",       label: "Profile" },
    { id: "business",      label: "Business Info" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="flex border-b border-[#e5e5e5] overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            "px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors border-b-2 -mb-px shrink-0",
            active === tab.id
              ? "border-[#000000] text-[#000000]"
              : "border-transparent text-[#737373] hover:text-[#0a0a0a]",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] outline-none focus:border-[#0a0a0a] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] outline-none focus:border-[#0a0a0a] transition-colors appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="t-small text-[#737373]">{label} settings coming soon.</p>
    </div>
  );
}

/* ── Profile section ──────────────────────────────────────────────── */

function ProfileSection() {
  const [name,  setName]  = useState("Augusto Suarez");
  const [email, setEmail] = useState("augusto@businessos.com");
  const [phone, setPhone] = useState("+61 400 000 000");
  const [role,  setRole]  = useState("Owner");
  const [saved, setSaved] = useState(false);

  const initials = name
    .trim()
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Avatar row */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#f2f2f2] border border-[#e5e5e5] flex items-center justify-center text-[18px] font-semibold text-[#0a0a0a] shrink-0">
          {initials}
        </div>
        <div>
          <p className="t-small font-semibold text-[#000000]">{name || "—"}</p>
          <p className="t-caption text-[#737373]">{role || "—"}</p>
        </div>
      </div>

      <div className="border-t border-[#e5e5e5]" />

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" value={name}  onChange={setName}  />
        <Field label="Role"      value={role}  onChange={setRole}  />
        <Field label="Email"     value={email} onChange={setEmail} type="email" />
        <Field label="Phone"     value={phone} onChange={setPhone} type="tel"   />
      </div>

      {/* Save row */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={handleSave} className="btn-primary">
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
        {saved && (
          <span className="t-caption text-[#737373]">Changes saved locally.</span>
        )}
      </div>

    </div>
  );
}

/* ── Business Info section ────────────────────────────────────────── */

const INDUSTRIES = [
  "Painting & Decorating",
  "Cleaning Services",
  "Landscaping & Gardening",
  "Plumbing",
  "Electrical",
  "Building & Construction",
  "Pest Control",
  "HVAC",
  "Other",
];

const CURRENCIES = ["AUD", "USD", "GBP", "EUR", "NZD", "CAD"];

function BusinessSection() {
  const [bizName,   setBizName]   = useState("Suarez Painting Co.");
  const [abn,       setAbn]       = useState("12 345 678 901");
  const [industry,  setIndustry]  = useState("Painting & Decorating");
  const [website,   setWebsite]   = useState("https://suarezpainting.com.au");
  const [address,   setAddress]   = useState("14 Harbour St, Sydney NSW 2000");
  const [currency,  setCurrency]  = useState("AUD");
  const [saved,     setSaved]     = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Identity */}
      <div className="flex flex-col gap-1">
        <p className="t-small font-semibold text-[#000000]">Business Identity</p>
        <p className="t-caption text-[#737373]">
          This information appears on quotes and invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Business Name" value={bizName}  onChange={setBizName}  />
        <Field label="ABN / Tax ID"  value={abn}      onChange={setAbn}      />
        <SelectField
          label="Industry"
          value={industry}
          options={INDUSTRIES}
          onChange={setIndustry}
        />
        <SelectField
          label="Currency"
          value={currency}
          options={CURRENCIES}
          onChange={setCurrency}
        />
      </div>

      <div className="border-t border-[#e5e5e5]" />

      {/* Contact & location */}
      <div className="flex flex-col gap-1">
        <p className="t-small font-semibold text-[#000000]">Contact & Location</p>
        <p className="t-caption text-[#737373]">
          Used for map links and customer communications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field label="Business Address" value={address} onChange={setAddress} />
        </div>
        <div className="sm:col-span-2">
          <Field label="Website" value={website} onChange={setWebsite} type="url" />
        </div>
      </div>

      {/* Save row */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={handleSave} className="btn-primary">
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
        {saved && (
          <span className="t-caption text-[#737373]">Changes saved locally.</span>
        )}
      </div>

    </div>
  );
}

/* ── Notifications section ────────────────────────────────────────── */

type NotifPrefs = {
  newLead:        { email: boolean; sms: boolean };
  quoteAccepted:  { email: boolean; sms: boolean };
  quoteRejected:  { email: boolean; sms: boolean };
  jobCompleted:   { email: boolean; sms: boolean };
  taskOverdue:    { email: boolean; sms: boolean };
  weeklyDigest:   { email: boolean; sms: boolean };
};

const NOTIF_ROWS: { key: keyof NotifPrefs; label: string; description: string }[] = [
  { key: "newLead",       label: "New Lead",        description: "When a new lead is added to the system."         },
  { key: "quoteAccepted", label: "Quote Accepted",  description: "When a customer accepts a quote."                },
  { key: "quoteRejected", label: "Quote Rejected",  description: "When a customer rejects a quote."                },
  { key: "jobCompleted",  label: "Job Completed",   description: "When a job is marked as completed."              },
  { key: "taskOverdue",   label: "Task Overdue",    description: "When a task passes its due date without action." },
  { key: "weeklyDigest",  label: "Weekly Digest",   description: "A weekly summary of leads, jobs, and revenue."   },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={[
        "relative w-9 h-5 rounded-[9999px] transition-colors shrink-0",
        on ? "bg-[#000000]" : "bg-[#e5e5e5]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform",
          on ? "translate-x-4" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState<NotifPrefs>({
    newLead:       { email: true,  sms: false },
    quoteAccepted: { email: true,  sms: true  },
    quoteRejected: { email: true,  sms: false },
    jobCompleted:  { email: true,  sms: false },
    taskOverdue:   { email: true,  sms: true  },
    weeklyDigest:  { email: true,  sms: false },
  });
  const [saved, setSaved] = useState(false);

  function toggle(key: keyof NotifPrefs, channel: "email" | "sms") {
    setPrefs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-1">
        <p className="t-small font-semibold text-[#000000]">Notification Preferences</p>
        <p className="t-caption text-[#737373]">
          Choose how you want to be notified for each event.
        </p>
      </div>

      {/* Table header */}
      <div className="flex flex-col divide-y divide-[#e5e5e5] border border-[#e5e5e5] rounded-[10px] overflow-hidden">
        <div className="grid grid-cols-[1fr_64px_64px] px-4 py-2 bg-[#f9f9f9]">
          <span className="t-caption text-[#737373] font-medium uppercase tracking-widest">Event</span>
          <span className="t-caption text-[#737373] font-medium uppercase tracking-widest text-center">Email</span>
          <span className="t-caption text-[#737373] font-medium uppercase tracking-widest text-center">SMS</span>
        </div>

        {NOTIF_ROWS.map((row) => (
          <div key={row.key} className="grid grid-cols-[1fr_64px_64px] px-4 py-3 items-center gap-2 bg-white hover:bg-[#f9f9f9] transition-colors">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="t-small font-medium text-[#0a0a0a]">{row.label}</span>
              <span className="t-caption text-[#737373] leading-snug">{row.description}</span>
            </div>
            <div className="flex justify-center">
              <Toggle on={prefs[row.key].email} onChange={() => toggle(row.key, "email")} />
            </div>
            <div className="flex justify-center">
              <Toggle on={prefs[row.key].sms} onChange={() => toggle(row.key, "sms")} />
            </div>
          </div>
        ))}
      </div>

      {/* Save row */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={handleSave} className="btn-primary">
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
        {saved && (
          <span className="t-caption text-[#737373]">Preferences saved locally.</span>
        )}
      </div>

    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div>
        <h2 className="t-heading text-[#000000]">Settings</h2>
        <p className="t-small text-[#737373] mt-1">
          Manage your profile and business preferences.
        </p>
      </div>

      {/* Card */}
      <div className="card-elevated p-0 overflow-hidden">
        <TabBar active={tab} onChange={setTab} />
        <div className="p-4 sm:p-6">
          {tab === "profile"       && <ProfileSection />}
          {tab === "business"      && <BusinessSection />}
          {tab === "notifications" && <NotificationsSection />}
        </div>
      </div>

    </div>
  );
}
