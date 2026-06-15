"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { mainNav } from "@/lib/data/navigation";
import { BRAND } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAFAF7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAFAF7]/80 border-b border-[#E6E4DF]">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Muze Office Franchise — home">
          <Image
            src="/images/logo.png"
            alt="Muze Office Franchise"
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
            href={`tel:${BRAND.phoneTel}`}
            className="flex items-center gap-1.5 text-sm text-[#74726D] hover:text-[#1A1A1A]"
          >
            <Phone className="h-3.5 w-3.5" />
            {BRAND.phoneDisplay}
          </a>
          <Link
            href="/discovery-call"
            data-cta="book_discovery_call"
            data-cta-location="header_desktop"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]"
            )}
          >
            Book a Discovery Call
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
