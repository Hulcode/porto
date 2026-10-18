"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Sign in failed.");
      window.location.assign("/admin");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="glass glow-border w-full max-w-md rounded-3xl p-7 sm:p-9">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to portfolio
        </Link>
        <p className="mb-2 mt-8 text-sm uppercase tracking-[0.2em] text-primary">
          Private access
        </p>
        <h1 className="text-3xl font-bold">Admin sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Sign in to manage your portfolio content.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block space-y-2 text-sm font-medium">
            Username
            <input
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="admin-input"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="admin-input"
            />
          </label>
          {error && (
            <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
