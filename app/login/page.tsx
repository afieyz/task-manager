import type { Metadata } from "next";
import LoginForm from "@/app/ui/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <LoginForm />
    </main>
  );
}