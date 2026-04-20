import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Clock } from "lucide-react";
import { footerNav } from "@/lib/data/navigation";
import { BRAND } from "@/lib/utils/constants";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex max-w-[320px] flex-col gap-6">
            <Link href="/" aria-label="Muze Office — home">
              <Image
                src="/images/logo.png"
                alt="Muze Office"
                width={2048}
                height={2048}
                sizes="80px"
                className="h-20 w-20 object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400">
              Flexible workspace in Las Vegas and Houston &mdash; month-to-month
              memberships, no long-term leases.
            </p>
            <p className="text-sm text-gray-500">
              &copy; 2023&ndash;{new Date().getFullYear()} Muze International Corporation. All
              rights reserved.
            </p>
            <a
              href="https://muzeofficefranchise.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Muze Office Franchise
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-8 sm:gap-12 md:gap-16">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Navigation</h3>
              <ul className="flex flex-col gap-3">
                {footerNav.navigation.map((item) => (
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

            {/* Socials */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Socials</h3>
              <ul className="flex flex-col gap-3">
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

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Contact</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    {BRAND.email}
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+17023707515"
                    className="flex items-center gap-2 text-sm text-white font-medium transition-colors hover:text-[#EAA820]"
                  >
                    <Phone className="h-4 w-4" />
                    (702) 370-7515
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  Mon&ndash;Fri, 10am to 7pm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
