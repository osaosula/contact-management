"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "@/app/login/actions";
import { resetUserPassword } from "@/app/login/actions";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";

interface LoginFormProps extends React.ComponentProps<"div"> {
  errorMessage: string | null;
}

export default function LoginForm({
  errorMessage,
  className,
  ...props
}: LoginFormProps) {
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [resetPasswordSent, setResetPasswordSent] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {!resetPassword && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <span className="ml-auto flex text-xs underline-offset-4 ">
                        <span
                          className="hover:underline"
                          onClick={() => setResetPassword(!resetPassword)}
                        >
                          Forgot your password?{" "}
                        </span>
                        <span onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOff className="ml-auto top-9 h-5 w-5 text-gray-400 cursor-pointer pl-1" />
                          ) : (
                            <EyeIcon className="ml-auto top-9 h-5 w-5 text-gray-400 cursor-pointer pl-1" />
                          )}
                        </span>
                      </span>
                    </div>
                    <span className="relative flex items-center">
                      <Input
                        id="password"
                        name="password"
                        type={`${showPassword ? "text" : "password"}`}
                        required
                      />
                    </span>
                    <span className="text-red-600 text-xs mx-auto my-0">
                      {errorMessage ? errorMessage : ""}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0">
                    <Button type="submit" className="w-full" formAction={login}>
                      Login
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm mx-auto">
                  You do not have an account?&nbsp;
                  <Link
                    href="/signup"
                    className="text-blue-600 hover:underline"
                  >
                    Signup here.
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {resetPassword && (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  Enter your email below to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="resetEmail">Email</Label>
                    <Input
                      id="resetEmail"
                      name="reset_email"
                      type="email"
                      placeholder="username@domain.com"
                      onChange={(e) => setResetEmail(e.target.value)}
                      value={resetEmail}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-0">
                    {" "}
                    {resetPasswordSent ? (
                      <span className="text-green-600 text-xs mx-auto my-0">
                        Success! Check your email to reset your password
                      </span>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={async () => {
                          const { success } = await resetUserPassword(
                            resetEmail
                          );
                          setResetPasswordSent(success);
                        }}
                      >
                        Send Reset Instructions
                      </Button>
                    )}
                  </div>
                </div>
                {!resetPasswordSent ? (
                  <div className="mt-4 text-center text-sm mx-auto">
                    <span>Remember your password?&nbsp;</span>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                      onClick={() => setResetPassword(false)}
                    >
                      Login here.
                    </a>
                  </div>
                ) : (
                  <div className="mt-4 text-center text-sm mx-auto">
                    <span>Go back to&nbsp;</span>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setResetPassword(false);
                        setResetPasswordSent(false);
                      }}
                    >
                      Login.
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
