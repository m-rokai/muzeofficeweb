import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { footerNav } from "@/lib/data/navigation";
import { BRAND } from "@/lib/utils/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* Top grid: brand + 3 link columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Muze Office Franchise — home">
              <Image
                src="/images/logo.png"
                alt="Muze Office Franchise"
                width={2048}
                height={2048}
                sizes="80px"
                className="h-20 w-20 object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400">{BRAND.tagline}</p>
            <a
              href={BRAND.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              &larr; Muze Office (main site)
            </a>
          </div>

          {/* Column 2: Opportunity */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold">The Opportunity</h3>
            <ul className="flex flex-col gap-2">
              {footerNav.opportunity.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Who It's For */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold">Who It&rsquo;s For</h3>
            <ul className="flex flex-col gap-2">
              {footerNav.audiences.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company + Contact */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="flex flex-col gap-2">
                {footerNav.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">Contact</h3>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {BRAND.email}
              </a>
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="flex items-center gap-2 text-sm text-white font-medium transition-colors hover:text-[#EAA820]"
              >
                <Phone className="h-4 w-4" />
                {BRAND.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* FTC Disclaimer */}
        <p className="mt-10 max-w-[860px] text-xs leading-relaxed text-gray-500">
          {BRAND.disclaimer}
        </p>

        {/* Bottom strip: copyright + socials */}
        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">
            &copy; 2023&ndash;{year} {BRAND.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {footerNav.socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
