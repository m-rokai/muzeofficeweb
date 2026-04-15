"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/utils/button-variants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/lib/data/navigation";
import { BRAND } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAFAF7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAFAF7]/80 border-b border-[#E6E4DF]">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Muze Office — home">
          <Image
            src="/images/logo.png"
            alt="Muze Office"
            width={2048}
            height={2048}
            priority
            sizes="64px"
            className="h-16 w-16 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#74726D] transition-colors hover:text-[#1A1A1A]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+17023707515"
            className="flex items-center gap-1.5 text-sm text-[#74726D] hover:text-[#1A1A1A]"
          >
            <Phone className="h-3.5 w-3.5" />
            (702) 370-7515
          </a>
          <a
            href={BRAND.booking.tourUrl}
            className={cn(buttonVariants({ size: "sm" }), "rounded-lg bg-[#1A1A1A] hover:bg-[#333]")}
          >
            Book a Tour
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center size-11 rounded-lg hover:bg-muted">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] pt-12">
            <nav className="flex flex-col gap-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-[#1A1A1A]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-[#E6E4DF] pt-4">
                <a
                  href="tel:+17023707515"
                  className="flex items-center gap-2 text-sm text-[#74726D]"
                >
                  <Phone className="h-4 w-4" />
                  (702) 370-7515
                </a>
                <a
                  href={BRAND.booking.tourUrl}
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants(), "w-full rounded-lg bg-[#1A1A1A]")}
                >
                  Book a Tour
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
