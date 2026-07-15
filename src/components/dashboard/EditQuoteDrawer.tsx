"use client";

import { useRef, useState, useTransition } from "react";
import { updateQuote, deleteQuote } from "@/app/dashboard/quotes/actions";

type Quote = {
  id: number;
  quoteNumber: string;
  customerId: number;
  service: string;
  date: string;
  expiresOn: string;
  scheduledVisit: string | null;
  total: number;
  status: string;
  notes: string | null;
};

type CustomerOption = { id: number; name: string };

export default function EditQuoteDrawer({ quote, customers }: { quote: Quote; customers: CustomerOption[] }) {
  const [open, setOpen]         = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateQuote(quote.id, data);
      setOpen(false);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteQuote(quote.id);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setConfirmDel(false); }}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-[8px] text-[12px] text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f2f2f2] transition-colors"
        aria-label="Edit quote"
      >
        <PencilIcon />
        Edit
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => !isPending && setOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl">

            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] shrink-0">
              <h2 className="text-[16px] font-semibold text-[#000000]">Edit Quote <span className="text-[#737373] font-normal">{quote.quoteNumber}</span></h2>
              <button type="button" onClick={() => !isPending && setOpen(false)} className="text-[#737373] hover:text-[#000000] text-lg leading-none transition-colors" aria-label="Close">✕</button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">
                  Customer<span className="text-[#c22b10] ml-0.5">*</span>
                </label>
                <select name="customerId" required defaultValue={String(quote.customerId)}
                  className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] outline-none focus:border-[#0a0a0a] transition-colors cursor-pointer">
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <Field label="Service"      name="service"   required defaultValue={quote.service}   placeholder="e.g. House Painting" />
              <Field label="Quote Date"   name="date"      type="date" required defaultValue={quote.date} />
              <Field label="Expires On"   name="expiresOn" type="date" required defaultValue={quote.expiresOn} />
              <Field label="Total ($)"    name="total"     type="number" defaultValue={String(quote.total)} placeholder="0.00" />
              <Field label="Scheduled Visit" name="scheduledVisit" type="date" defaultValue={quote.scheduledVisit ?? ""} />

              <SelectField label="Status" name="status" defaultValue={quote.status}>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </SelectField>

              <TextAreaField label="Notes" name="notes" defaultValue={quote.notes ?? ""} placeholder="Any internal notes about this quote…" />

              <div className="mt-auto pt-2 flex gap-2">
                <button type="submit" className="btn-primary flex-1 justify-center" disabled={isPending}>
                  {isPending ? "Saving…" : "Save Changes"}
                </button>
                <button type="button" className="btn-ghost" onClick={() => setOpen(false)} disabled={isPending}>Cancel</button>
              </div>

              <div className="border-t border-[#e5e5e5] pt-4">
                {confirmDel ? (
                  <div className="flex flex-col gap-2">
                    <p className="t-caption text-[#737373]">This will permanently delete this quote.</p>
                    <div className="flex gap-2">
                      <button type="button" onClick={handleDelete} disabled={isPending} className="flex-1 h-9 rounded-[10px] bg-[#c22b10] text-white text-[13px] font-medium hover:bg-[#a82209] transition-colors disabled:opacity-50">
                        {isPending ? "Deleting…" : "Yes, delete"}
                      </button>
                      <button type="button" onClick={() => setConfirmDel(false)} disabled={isPending} className="btn-ghost">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmDel(true)} className="t-caption text-[#c22b10] hover:underline transition-colors">
                    Delete this quote
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

function Field({ label, name, type = "text", placeholder, required, defaultValue }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">
        {label}{required && <span className="text-[#c22b10] ml-0.5">*</span>}
      </label>
      <input type={type} name={name} placeholder={placeholder} required={required} defaultValue={defaultValue}
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none focus:border-[#0a0a0a] transition-colors" />
    </div>
  );
}

function SelectField({ label, name, defaultValue, children }: {
  label: string; name: string; defaultValue?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">{label}</label>
      <select name={name} defaultValue={defaultValue}
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] outline-none focus:border-[#0a0a0a] transition-colors cursor-pointer">
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
