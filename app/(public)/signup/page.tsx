import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignupForm from "@/components/Auth/SignupForm";
import { getAuthUserFromCookieStore } from "@/server/auth/auth.cookies";

export default async function SignupPage() {
  const cookieStore = await cookies();

  if (getAuthUserFromCookieStore(cookieStore)) {
    redirect("/");
  }

  return (
    <main className="relative min-h-[calc(100dvh-80px)] overflow-hidden bg-[#FCFBF7] pt-20 pb-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(195,162,103,0.14),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#fcfbf7_0%,#f4efe7_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-8 lg:py-12">
        <div className="grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(440px,560px)] lg:gap-20">
          <section className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#c3a267]/25 bg-white/70 px-4 py-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#8c4f1c] shadow-xs">
              <span className="h-px w-10 bg-[#c3a267]" />
              Create Account
            </div>

            <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-stone-950 sm:text-5xl md:text-6xl">
              Join RudraLaksh and save your spiritual essentials.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              Create an account to keep your details secure, track orders, and move through checkout with less friction.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Saved Details",
                  text: "Keep your name and contact information ready.",
                },
                {
                  title: "Order History",
                  text: "Review previous purchases whenever you need them.",
                },
                {
                  title: "Faster Support",
                  text: "Share order context more easily with the team.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-stone-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
                >
                  <h2 className="font-serif text-lg text-stone-950">{item.title}</h2>
                  <p className="mt-2 text-xs leading-6 text-stone-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              <span className="rounded-full border border-stone-200 bg-white/70 px-4 py-2">Authentic</span>
              <span className="rounded-full border border-stone-200 bg-white/70 px-4 py-2">Secure</span>
              <span className="rounded-full border border-stone-200 bg-white/70 px-4 py-2">Private</span>
            </div>

            <p className="mt-8 text-sm text-stone-500">
              Already registered?{" "}
              <Link href="/login" className="font-semibold text-stone-950 hover:text-[#8c4f1c]">
                Sign in
              </Link>
            </p>
          </section>

          <div className="w-full lg:justify-self-end">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
