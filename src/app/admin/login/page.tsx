import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  return (
    <main id="main-content" className="grid min-h-screen place-items-center bg-surface p-4">
      <LoginForm />
    </main>
  );
}
