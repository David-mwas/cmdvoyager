import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { useAddCommand, useUpdateCommand } from "@/hooks/useCommandsQueries";

const CATEGORIES = [
  "Alpine", "Android", "Angular", "Ansible", "Apache", "Arch Linux", "Arduino",
  "AWS", "Azure", "Babel", "Bash", "Bitbucket", "Blender", "Bun", "C", "C++",
  "C#", "Cargo", "Cassandra", "CentOS", "CI/CD", "CircleCI", "Clojure", "Cloudflare",
  "CMake", "CocoaPods", "Composer", "Conda", "Consul", "CouchDB", "CSS", "Cypress",
  "Dart", "Database", "Debian", "Deno", "DigitalOcean", "Django", "Docker", "Dotnet",
  "DynamoDB", "Eclipse", "Elasticsearch", "Elixir", "Elm", "Emacs", "Ember", "Erlang",
  "ESLint", "Express", "Fastify", "Fedora", "Figma", "Firebase", "Flask", "Flutter",
  "Frontend", "Gatsby", "GCP", "Git", "GitHub Actions", "GitLab CI", "Go", "Gradle",
  "GraphQL", "gRPC", "Gulp", "Haskell", "Helm", "Heroku", "Homebrew", "HTML", "Hugo",
  "Insomnia", "iOS", "Java", "JavaScript", "Jenkins", "Jest", "Jira", "jQuery", "Julia",
  "Kafka", "Kotlin", "Kubernetes", "Laravel", "Linux", "Lua", "MacOS", "Make",
  "MariaDB", "Maven", "Memcached", "Meteor", "MongoDB", "MySQL", "Nano", "Neo4j",
  "NestJS", "Networking", "Next.js", "Nginx", "Nix", "Node.js", "NPM", "Nuxt",
  "Objective-C", "OCaml", "OpenShift", "OpenStack", "Oracle", "PHP", "Pip", "PNPM",
  "Podman", "PostgreSQL", "Postman", "PowerShell", "Prettier", "Prisma", "Prometheus",
  "Puppeteer", "Python", "R", "RabbitMQ", "React", "React Native", "Redis", "Redux",
  "Rollup", "Ruby", "Ruby on Rails", "Rust", "RxJS", "SASS", "Scala", "Security",
  "Selenium", "Serverless", "Shell", "Snowpack", "Solr", "Spring Boot", "SQL",
  "SQLite", "Supabase", "Svelte", "SVN", "Swift", "Symfony", "Tailwind", "Terraform",
  "Tmux", "Tomcat", "TravisCI", "TypeScript", "Ubuntu", "Unity", "Vagrant", "Vercel",
  "Vim", "Vite", "Vitest", "Vue", "Webpack", "WebRTC", "Windows", "WordPress",
  "Xcode", "Yarn", "Zsh", "Other"
];

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

  function handleTagInput(e) {
    const val = e.target.value;
    if (val.includes(",")) {
      const newTags = val
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t && !form.tags.includes(t));
      if (newTags.length > 0) {
        setForm((f) => ({ ...f, tags: [...f.tags, ...newTags] }));
      }
      setTagInput("");
    } else {
      setTagInput(val);
    }
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const t = tagInput.trim().toLowerCase();
      if (t && !form.tags.includes(t)) {
        setForm((f) => ({ ...f, tags: [...f.tags, t] }));
      }
      setTagInput("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.command.trim()) return;

    let finalTags = [...form.tags];
    const pendingTag = tagInput.trim().toLowerCase();
    if (pendingTag && !finalTags.includes(pendingTag)) {
      finalTags.push(pendingTag);
    }

    const payload = { ...form, tags: finalTags };

    if (editing) {
      await update.mutateAsync({ id: editing.id, patch: payload });
    } else {
      await add.mutateAsync(payload);
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

            <Field label="Tags">
              <input
                value={tagInput}
                onChange={handleTagInput}
                onKeyDown={handleTagKeyDown}
                placeholder="e.g. git, network, fix..."
                className="w-full px-3 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
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
