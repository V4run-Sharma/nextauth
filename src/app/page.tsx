import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center gap-y-8 p-24">
      <h1 className="text-3xl font-bold">Next Auth</h1>
      <div className="flex items-center gap-x-12">
        <Link href="/sign-up" className="underline">
          Sign Up
        </Link>
        <Link href="/sign-in" className="underline">
          Sign In
        </Link>
      </div>
    </main>
  );
}
