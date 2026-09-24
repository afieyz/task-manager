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
      className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
      <div className="rounded-xl bg-white p-8 shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Task Manager
          </h1>

          <p className="mt-2 text-gray-600">
            Sign in to manage your tasks.
          </p>
        </div>

        <form action={formAction} className="mt-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          {errorMessage && (
            <p
              className="mt-4 text-sm text-red-600"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage}
            </p>
          )}

          <input
            type="hidden"
            name="redirectTo"
            value="/tasks"
          />

          <div className="mt-6">
            <LoginButton />
          </div>
        </form>
      </div>
    </div>
  );
}