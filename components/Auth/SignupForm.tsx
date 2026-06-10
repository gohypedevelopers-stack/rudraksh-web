"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle, UserPlus } from "lucide-react";
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
import { signupClientSchema } from "@/server/auth/auth.validation";

type SignupFormValues = z.infer<typeof signupClientSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<SignupFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = React.useState<Partial<Record<keyof SignupFormValues, string>>>({});
  const [formError, setFormError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (field: keyof SignupFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setFormError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});

    const parsed = signupClientSchema.safeParse(values);

    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        password: flattened.password?.[0],
        confirmPassword: flattened.confirmPassword?.[0],
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          password: parsed.data.password,
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setFormError(data?.error ?? "Unable to create your account right now.");
        return;
      }

      window.dispatchEvent(new Event("auth-changed"));
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setFormError("Unable to create your account right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("w-full lg:max-w-[560px] lg:justify-self-end border-stone-200/70 bg-white/95 backdrop-blur-sm shadow-2xl shadow-black/5")}>
      <CardHeader className="space-y-3 border-b border-stone-200/70 px-6 py-6 sm:px-8">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#8c4f1c]">
          <span className="h-px w-10 bg-[#c3a267]/60" />
          Create Account
        </div>
        <CardTitle className="font-serif text-2xl sm:text-3xl text-stone-950">
          Join RudraLaksh
        </CardTitle>
        <CardDescription className="max-w-md text-sm leading-relaxed text-stone-600">
          Create an account to track orders, save details, and move faster through checkout.
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
            <Label htmlFor="signup-name" className="text-stone-700">
              Full Name
            </Label>
            <Input
              id="signup-name"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.name)}
              className="h-12 rounded-xl border-stone-200 bg-white px-4 text-stone-900 placeholder:text-stone-400 focus-visible:border-[#c3a267] focus-visible:ring-[#c3a267]/20"
            />
            {fieldErrors.name ? <p className="text-xs text-red-600">{fieldErrors.name}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-stone-700">
              Email
            </Label>
            <Input
              id="signup-email"
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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-stone-700">
                Password
              </Label>
              <Input
                id="signup-password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="Create password"
                autoComplete="new-password"
                aria-invalid={Boolean(fieldErrors.password)}
                className="h-12 rounded-xl border-stone-200 bg-white px-4 text-stone-900 placeholder:text-stone-400 focus-visible:border-[#c3a267] focus-visible:ring-[#c3a267]/20"
              />
              {fieldErrors.password ? <p className="text-xs text-red-600">{fieldErrors.password}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-confirm-password" className="text-stone-700">
                Confirm
              </Label>
              <Input
                id="signup-confirm-password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="Repeat password"
                autoComplete="new-password"
                aria-invalid={Boolean(fieldErrors.confirmPassword)}
                className="h-12 rounded-xl border-stone-200 bg-white px-4 text-stone-900 placeholder:text-stone-400 focus-visible:border-[#c3a267] focus-visible:ring-[#c3a267]/20"
              />
              {fieldErrors.confirmPassword ? <p className="text-xs text-red-600">{fieldErrors.confirmPassword}</p> : null}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-black text-[11px] font-bold tracking-[0.22em] uppercase text-white hover:bg-zinc-800"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Creating Account
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </>
            )}
          </Button>

          <div className="flex flex-col gap-2 border-t border-stone-200/70 pt-5 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between">
            <span>Already have an account?</span>
            <Link href="/login" className="font-semibold text-stone-950 hover:text-[#8c4f1c]">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
