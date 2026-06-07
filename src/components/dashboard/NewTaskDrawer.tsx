"use client";

import { useRef, useState, useTransition } from "react";
import { createTask } from "@/app/dashboard/tasks/actions";

export default function NewTaskDrawer() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      await createTask(data);
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <>
      <button
        className="btn-primary shrink-0"
        type="button"
        onClick={() => setOpen(true)}
      >
        + New Task
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => !isPending && setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] shrink-0">
              <h2 className="text-[16px] font-semibold text-[#000000]">New Task</h2>
              <button
                type="button"
                onClick={() => !isPending && setOpen(false)}
                className="text-[#737373] hover:text-[#000000] text-lg leading-none transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5"
            >
              <Field label="Task Title" name="title" required placeholder="e.g. Follow up with client" />
              <Field label="Related To" name="relatedTo" placeholder="e.g. John Smith / Quote #001" />
              <Field label="Due Date" name="dueDate" type="date" required />

              <SelectField label="Priority" name="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </SelectField>

              <SelectField label="Status" name="status">
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </SelectField>

              {/* Actions */}
              <div className="mt-auto pt-2 flex gap-2">
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                  disabled={isPending}
                >
                  {isPending ? "Saving…" : "Create Task"}
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
            </form>
          </div>
        </>
      )}
    </>
  );
}

function Field({
  label, name, type = "text", placeholder, required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] placeholder:text-[#737373] outline-none focus:border-[#0a0a0a] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, name, children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="t-caption text-[#737373] font-medium uppercase tracking-widest">
        {label}
      </label>
      <select
        name={name}
        className="h-9 px-3 rounded-[10px] border border-[#e5e5e5] bg-white text-[13px] text-[#0a0a0a] outline-none focus:border-[#0a0a0a] transition-colors cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}
