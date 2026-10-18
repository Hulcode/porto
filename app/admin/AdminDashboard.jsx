"use client";

import Link from "next/link";
import { useState } from "react";
import FieldEditor from "./FieldEditor";

const sections = [
  ["hero", "Hero"],
  ["about", "About"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["learning", "Currently learning"],
  ["contact", "Contact"],
  ["navigation", "Navigation"],
  ["footer", "Footer"],
];

const clone = (value) => JSON.parse(JSON.stringify(value));

export default function AdminDashboard({ initialContent }) {
  const [content, setContent] = useState(clone(initialContent));
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  function updateSection(value) {
    setContent((current) => ({ ...current, [activeSection]: value }));
    setDirty(true);
    setMessage("");
    setError("");
  }

  async function saveContent(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not save changes.");
      setDirty(false);
      setMessage("Changes saved. Your public portfolio is updated.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  async function logOut() {
    const response = await fetch("/api/admin/logout", { method: "POST" });
    if (!response.ok) {
      setError("Could not sign out. Please try again.");
      return;
    }
    window.location.assign("/admin/login");
  }

  const activeLabel = sections.find(([key]) => key === activeSection)?.[1];

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-primary">
              Portfolio control room
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">Admin dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              target="_blank"
              className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary"
            >
              View portfolio
            </Link>
            <button
              type="button"
              onClick={logOut}
              className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary"
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="glass h-fit rounded-2xl p-3">
            <p className="px-3 pb-3 pt-2 text-xs uppercase tracking-wider text-muted-foreground">
              Manage content
            </p>
            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {sections.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  className={`shrink-0 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    activeSection === key
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="glass min-w-0 rounded-2xl p-4 sm:p-7">
            <form onSubmit={saveContent} className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Editing section
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold">{activeLabel}</h2>
                </div>
              </div>

              {message && (
                <p
                  role="status"
                  className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300"
                >
                  {message}
                </p>
              )}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  {error}
                </p>
              )}

              <div className="space-y-5">
                {Object.entries(content[activeSection]).map(([key, value]) => (
                  <FieldEditor
                    key={`${activeSection}-${key}`}
                    label={key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/^\w/, (letter) => letter.toUpperCase())}
                    value={value}
                    template={initialContent[activeSection][key]}
                    onChange={(updated) =>
                      updateSection({
                        ...content[activeSection],
                        [key]: updated,
                      })
                    }
                  />
                ))}
              </div>

              <div className="flex justify-end border-t border-border pt-5">
                <button
                  type="submit"
                  disabled={saving || !dirty}
                  className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving..." : dirty ? "Save changes" : "Saved"}
                </button>
              </div>
            </form>
          </section>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Uploaded images are stored in Cloudinary. Portfolio content is saved
          in MongoDB.
        </p>
      </div>
    </main>
  );
}
