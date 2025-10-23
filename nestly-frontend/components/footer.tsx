import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 w-full shrink-0 border-t">
      <div className="container flex items-center justify-center gap-4 px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Nestly. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
