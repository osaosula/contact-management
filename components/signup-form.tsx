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

import { signup } from "@/app/login/actions";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
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
                  <span className="ml-auto inline-block text-sm">
                    Choose a password
                  </span>
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="ml-auto top-9 h-5 w-5 text-gray-400 cursor-pointer pl-1" />
                    ) : (
                      <EyeIcon className="ml-auto top-9 h-5 w-5 text-gray-400 cursor-pointer pl-1" />
                    )}
                  </span>
                </div>
                <Input
                  id="password"
                  name="password"
                  type={`${showPassword ? "text" : "password"}`}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" formAction={signup}>
                  Signup
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here.
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
