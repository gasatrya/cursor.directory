"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";
import { Button } from "./ui/button";

const navigationLinks = [
  { href: "/rules", label: "Rules" },
  { href: "/mcp", label: "MCP Store" },
  { href: "/learn", label: "Learn" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center">
      <div className="md:fixed z-50 flex justify-between items-center top-0 px-6 py-2 w-full bg-background backdrop-filter backdrop-blur-sm bg-opacity-30">
        <Link href="/" className="font-medium font-mono text-sm">
          cursor.directory
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                pathname === link.href ? "text-primary" : "text-[#878787]",
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link href="/login">
            <Button
              variant="outline"
              className="bg-white text-black h-8 rounded-full"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      <MobileMenu />
    </div>
  );
}
