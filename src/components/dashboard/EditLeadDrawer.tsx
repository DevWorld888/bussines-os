"use client";

import { useRef, useState, useTransition } from "react";
import { updateLead, deleteLead } from "@/app/dashboard/leads/actions";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  status: string;
  source: string;
  followUp: string | null;
};

export default function EditLeadDrawer({ lead }: { lead: Lead }) {
  const [open, setOpen]         = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateLead(lead.id, data);
      setOpen(false);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteLead(lead.id);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setConfirmDel(false); }}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-[8px] text-[12px] text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f2f2f2] transition-colors"
        aria-label="Edit lead"
      >
        <PencilIcon />
        Edit
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => !isPending && setOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl">

            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] shrink-0">
              <h2 className="text-[16px] font-semibold text-[#000000]">Edit Lead</h2>
              <button
                type="button"
                onClick={() => !isPending && setOpen(false)}
                className="text-[#737373] hover:text-[#000000] text-lg leading-none transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5"
            >
              <Field label="Name"    name="name"    required defaultValue={lead.name}    placeholder="Jane Smith" />
              <Field label="Phone"   name="phone"            defaultValue={lead.phone}   placeholder="+61 400 000 000" />
              <Field label="Email"   name="email"   type="email" defaultValue={lead.email ?? ""} placeholder="jane@example.com" />
              <Field label="Service" name="service" required defaultValue={lead.service} placeholder="e.g. House Painting" />

              <SelectField label="Source" name="source" defaultValue={lead.source}>
                <option value="referral">Referral</option>
                <option value="google">Google</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="website">Website</option>
                <option value="walk-in">Walk-in</option>
                <option value="other">Other</option>
              </SelectField>

              <SelectField label="Status" name="status" defaultValue={lead.status}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quote-sent">Quote Sent</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </SelectField>

              <Field label="Follow-up Date" name="followUp" type="date" defaultValue={lead.followUp ?? ""} />

              {/* Save / Cancel */}
              <div className="mt-auto pt-2 flex gap-2">
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                  disabled={isPending}
                >
                  {isPending ? "Saving…" : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </button>
              </div>

              {/* Delete zone */}
              <div className="border-t border-[#e5e5e5] pt-4">
                {confirmDel ? (
                  <div className="flex flex-col gap-2">
                    <p className="t-caption text-[#737373]">This will permanently delete this lead.</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="flex-1 h-9 rounded-[10px] bg-[#c22b10] text-white text-[13px] font-medium hover:bg-[#a82209] transition-colors disabled:opacity-50"
                      >
                        {isPending ? "Deleting…" : "Yes, delete"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDel(false)}
                        disabled={isPending}
                        className="btn-ghost"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDel(true)}
                    className="t-caption text-[#c22b10] hover:underline transition-colors"
                  >
                    Delete this lead
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

function Field({
  label, name, type = "text", placeholder, required, defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">
        {label}{required && <span className="text-[#c22b10] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none focus:border-[#0a0a0a] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, name, defaultValue, children,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] outline-none focus:border-[#0a0a0a] transition-colors cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
