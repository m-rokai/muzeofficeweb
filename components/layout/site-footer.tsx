import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Clock, MapPin, Star } from "lucide-react";
import { footerNav } from "@/lib/data/navigation";
import { BRAND } from "@/lib/utils/constants";
import { locations } from "@/lib/data/locations";
import { services as allServices } from "@/lib/data/services";

const cityServiceLabel = (serviceId: string): string => {
  const service = allServices.find((s) => s.id === serviceId);
  if (service) return service.name;
  return serviceId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export function SiteFooter() {
  const lasVegas = locations.find((l) => l.id === "las-vegas");
  const houston = locations.find((l) => l.id === "houston");

  return (
    <footer className="w-full bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* Top section: brand + city-service link columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-6">
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
            <a
              href="https://muzeofficefranchise.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Muze Office Franchise &rarr;
            </a>
          </div>

          {/* Las Vegas city-services */}
          {lasVegas && lasVegas.status === "active" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Las Vegas</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/locations/las-vegas"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Las Vegas Location
                  </Link>
                </li>
                {lasVegas.services.map((serviceId) => (
                  <li key={`lv-${serviceId}`}>
                    <Link
                      href={`/las-vegas-${serviceId}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {cityServiceLabel(serviceId)}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://beauty-booking-three.vercel.app"
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Esthetics &amp; Waxing Booth
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Houston city-services */}
          {houston && houston.status === "active" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Houston</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/locations/houston"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Houston Location
                  </Link>
                </li>
                {houston.services.map((serviceId) => (
                  <li key={`hou-${serviceId}`}>
                    <Link
                      href={`/houston-${serviceId}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {cityServiceLabel(serviceId)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company + Contact */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="flex flex-col gap-2">
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
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    data-cta="contact_us"
                    data-cta-location="footer"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book-a-tour"
                    data-cta="book_tour"
                    data-cta-location="footer"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    Book a Tour
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Contact</h3>
              <ul className="flex flex-col gap-3">
                {lasVegas && (
                  <li className="flex items-start gap-2 text-sm text-gray-400">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <Link
                      href="/locations/las-vegas"
                      className="transition-colors hover:text-white"
                    >
                      {lasVegas.address.street}, {lasVegas.address.city},{" "}
                      {lasVegas.address.state} {lasVegas.address.zip}
                    </Link>
                  </li>
                )}
                <li className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {BRAND.email}
                  </a>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#EAA820]">
                    Preferred
                  </span>
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
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Phone: Mon&ndash;Fri, 10am&ndash;5pm
                    <br />
                    Front desk: Mon&ndash;Fri, 10am&ndash;7pm
                  </span>
                </li>
                <li>
                  <a
                    href={BRAND.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="leave_review"
                    data-cta-location="footer"
                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <Star className="h-4 w-4 text-[#EAA820]" />
                    Leave us a Google review
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom strip: copyright + socials */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">
            &copy; 2023&ndash;{new Date().getFullYear()} Muze International
            Corporation. All rights reserved.
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
