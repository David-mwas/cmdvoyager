import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { useAddCommand, useUpdateCommand } from "@/hooks/useCommandsQueries";

const CATEGORIES = ["Git", "Docker", "Linux", "NPM", "Database", "Other"];

export function CommandModal({ open, onClose, editing }) {
  const add = useAddCommand();
  const update = useUpdateCommand();
  const [form, setForm] = useState({
    title: "",
    command: "",
    description: "",
    category: "Git",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        command: editing.command,
        description: editing.description ?? "",
        category: editing.category ?? "Other",
        tags: editing.tags ?? [],
      });
    } else {
      setForm({ title: "", command: "", description: "", category: "Git", tags: [] });
    }
    setTagInput("");
  }, [editing, open]);

  if (!open) return null;

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (!t || form.tags.includes(t)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.command.trim()) return;
    if (editing) {
      await update.mutateAsync({ id: editing.id, patch: form });
    } else {
      await add.mutateAsync(form);
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg glass-card rounded-2xl p-4 sm:p-6 glow-ring max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            {editing ? "Edit Command" : "Log a New Command"}
          </h2>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-muted/50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <Field label="Title">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Undo last commit"
              className="w-full px-3 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Command">
            <textarea
              required
              value={form.command}
              onChange={(e) => setForm({ ...form, command: e.target.value })}
              rows={2}
              placeholder="git reset --soft HEAD~1"
              className="w-full px-3 py-2 rounded-lg bg-input border border-border font-mono text-sm text-accent focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="What does it do?"
              className="w-full px-3 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Add tag">
              <div className="flex gap-1">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="git, undo…"
                  className="flex-1 px-3 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-2 rounded-lg border border-border hover:bg-muted/50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </Field>
          </div>

          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, tags: form.tags.filter((x) => x !== t) })}
                  className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary hover:bg-destructive/20 hover:text-destructive transition"
                >
                  #{t} ✕
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={add.isPending || update.isPending}
            className="px-4 py-2 rounded-lg bg-gradient-cosmic text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50"
          >
            {editing ? "Save changes" : "Launch command"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1 block">{label}</span>
      {children}
    </label>
  );
}
