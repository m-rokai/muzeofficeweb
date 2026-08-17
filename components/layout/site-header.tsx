"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, Phone } from "lucide-react";
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
            loading="eager"
            sizes="64px"
            className="h-16 w-16 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-haspopup="menu"
                  className="flex min-h-10 items-center gap-1 text-sm text-[#74726D] transition-colors hover:text-[#1A1A1A] focus-visible:text-[#1A1A1A]"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-1 rounded-xl bg-white p-2 opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] transition-[opacity,transform] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex min-h-10 items-center rounded-lg px-3 text-sm text-[#494742] transition-colors hover:bg-[#F2F1ED] hover:text-[#1A1A1A] focus-visible:bg-[#F2F1ED] focus-visible:text-[#1A1A1A]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-10 items-center text-sm text-[#74726D] transition-colors hover:text-[#1A1A1A]"
              >
                {item.label}
              </Link>
            )
          )}
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
            data-cta="book_tour"
            data-cta-location="header_desktop"
            className={cn(buttonVariants({ size: "sm" }), "rounded-lg bg-[#1A1A1A] hover:bg-[#333]")}
          >
            Book a Tour
          </a>
          <a
            href={BRAND.booking.signupUrl}
            data-cta="signup_online"
            data-cta-location="header_desktop"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]"
            )}
          >
            Sign Up
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
              {mainNav.map((item) =>
                item.children ? (
                  <div key={item.href} className="flex flex-col gap-2">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-10 items-center text-lg font-medium text-[#1A1A1A]"
                    >
                      {item.label}
                    </Link>
                    <div className="grid grid-cols-2 gap-1 border-l-2 border-[#E6E4DF] pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-10 items-center rounded-lg px-2 text-sm text-[#74726D] transition-colors hover:bg-[#F2F1ED] hover:text-[#1A1A1A]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-10 items-center text-lg font-medium text-[#1A1A1A]"
                  >
                    {item.label}
                  </Link>
                )
              )}
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
                  data-cta="book_tour"
                  data-cta-location="header_mobile_menu"
                  className={cn(buttonVariants(), "w-full rounded-lg bg-[#1A1A1A]")}
                >
                  Book a Tour
                </a>
                <a
                  href={BRAND.booking.signupUrl}
                  onClick={() => setOpen(false)}
                  data-cta="signup_online"
                  data-cta-location="header_mobile_menu"
                  className={cn(
                    buttonVariants(),
                    "w-full rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]"
                  )}
                >
                  Sign Up
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
