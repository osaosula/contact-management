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
import Link from "next/link";

interface LoginFormProps extends React.ComponentProps<"div"> {
  errorMessage: string | null;
}

export default function LoginForm({
  errorMessage,
  className,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
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
              <Link href="/signup" className="text-blue-600 hover:underline">
                Signup here.
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
