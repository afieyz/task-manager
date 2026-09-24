"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-white/80 bg-white/85 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur sm:p-10">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold text-white shadow-lg shadow-violet-200">
            ✓
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue to your Task Manager.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="mt-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              minLength={6}
              autoComplete="current-password"
              className="w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {errorMessage && (
            <div
              className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage}
            </div>
          )}

          <input
            type="hidden"
            name="redirectTo"
            value="/tasks"
          />

          <div className="mt-7">
            <LoginButton />
          </div>
        </form>

        {/* Footer */}
        <div className="mt-7 border-t border-purple-100 pt-5 text-center">
          <p className="text-xs text-gray-400">
            Stay organized. Stay focused. Get things done.
          </p>
        </div>
      </div>
    </div>
  );
}