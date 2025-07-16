"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "../../components/login-form";
export default function AuthPage() {
  const searchParams = useSearchParams();

  const errorMessage = searchParams.get("m");

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <h1 className="flex text-2xl font-bold mb-4 justify-center">
        CONTACT MANAGEMENT LOGIN
      </h1>
      <LoginForm errorMessage={errorMessage} />
    </div>
  );
}
