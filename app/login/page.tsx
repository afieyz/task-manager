import type { Metadata } from "next";
import LoginForm from "@/app/ui/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-6">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative flex w-full justify-center">
        <LoginForm />
      </div>
    </main>
  );
}