"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LoaderCircle } from "lucide-react";
import { z } from "zod";
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
import { cn } from "@/lib/utils";
import { loginSchema } from "@/server/auth/auth.validation";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = React.useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const [formError, setFormError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (field: keyof LoginFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setFormError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        email: flattened.email?.[0],
        password: flattened.password?.[0],
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
        user?: { role?: string } | null;
      } | null;

      if (!response.ok) {
        setFormError(data?.error ?? "Unable to sign in right now.");
        return;
      }

      window.dispatchEvent(new Event("auth-changed"));
      if (data?.user?.role === "ADMIN") {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setFormError("Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("w-full lg:max-w-[520px] lg:justify-self-end border-stone-200/70 bg-white/95 backdrop-blur-sm shadow-2xl shadow-black/5")}>
      <CardHeader className="space-y-3 border-b border-stone-200/70 px-6 py-6 sm:px-8">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#8c4f1c]">
          <span className="h-px w-10 bg-[#c3a267]/60" />
          Secure Login
        </div>
        <CardTitle className="font-serif text-2xl sm:text-3xl text-stone-950">
          Welcome back
        </CardTitle>
        <CardDescription className="max-w-md text-sm leading-relaxed text-stone-600">
          Sign in to access your orders, faster checkout, and the latest Rudraksha updates.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-6 sm:px-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {formError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {formError}
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-stone-700">
              Email
            </Label>
            <Input
              id="login-email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              className="h-12 rounded-xl border-stone-200 bg-white px-4 text-stone-900 placeholder:text-stone-400 focus-visible:border-[#c3a267] focus-visible:ring-[#c3a267]/20"
            />
            {fieldErrors.email ? <p className="text-xs text-red-600">{fieldErrors.email}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-stone-700">
              Password
            </Label>
            <Input
              id="login-password"
              type="password"
              value={values.password}
              onChange={handleChange("password")}
              placeholder="Your password"
              autoComplete="current-password"
              aria-invalid={Boolean(fieldErrors.password)}
              className="h-12 rounded-xl border-stone-200 bg-white px-4 text-stone-900 placeholder:text-stone-400 focus-visible:border-[#c3a267] focus-visible:ring-[#c3a267]/20"
            />
            {fieldErrors.password ? <p className="text-xs text-red-600">{fieldErrors.password}</p> : null}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-black text-[11px] font-bold tracking-[0.22em] uppercase text-white hover:bg-zinc-800"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Signing In
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>

          <div className="flex flex-col gap-2 border-t border-stone-200/70 pt-5 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between">
            <span>Need an account?</span>
            <Link href="/signup" className="font-semibold text-stone-950 hover:text-[#8c4f1c]">
              Create one
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
