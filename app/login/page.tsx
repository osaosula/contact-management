"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "../../components/login-form";
import SignUpForm from "../../components/signup-form";
//import LoginButton from "@/components/login-button";

export default function AuthPage() {
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<string>("");
  const errorMessage = searchParams.get("m");

  useEffect(() => {
    const type = searchParams.get("mode");
    if (type === "signup") setMode("signup");
    else setMode("login");
  }, [searchParams]);

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <h1 className="flex text-2xl font-bold mb-4 justify-center">
        CONTACT MANAGER
      </h1>

      {mode === "login" ? (
        <LoginForm buttonMode={mode} errorMessage={errorMessage} />
      ) : (
        <SignUpForm buttonMode={mode} />
      )}

      {/* <LoginButton mode={mode} /> */}
    </div>
  );
}
