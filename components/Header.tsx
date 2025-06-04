"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-screen flex justify-between bg-slate-100 px-8 py-4">
      <nav className="flex gap-4">
        <Link href={"/"} className="hover:text-slate-500">
          Home
        </Link>
        <Link href={"/photos"} className="hover:text-slate-500">
          Photos
        </Link>
        <Link href={"/posts"} className="hover:text-slate-500">
          Posts
        </Link>
      </nav>
      <nav>
        <Link href={"/login"} className="hover:text-slate-500">
          Login
        </Link>
      </nav>
    </header>
  );
}
