import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { OG_DEFAULTS } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Muze Office privacy policy. Learn how we collect, use, and protect your personal information when you visit our website or use our workspace services.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { ...OG_DEFAULTS, type: "website", url: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#74726D]">
          Last updated: March 30, 2026
        </p>

        <div className="mt-12 flex flex-col gap-10 text-sm leading-relaxed text-[#74726D]">
          {/* Introduction */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              1. Introduction
            </h2>
            <p className="mt-3">
              Muze International Corporation (&ldquo;Muze Office,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
              the website{" "}
              <strong>muzeoffice.com</strong> and provides coworking, virtual
              office, private office, meeting room, and event space services. This
              Privacy Policy explains how we collect, use, disclose, and protect
              your personal information when you visit our website or use our
              services.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              2. Information We Collect
            </h2>
            <p className="mt-3">
              We may collect the following types of information:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone
                number, company name, and mailing address provided through contact
                forms, tour bookings, or membership sign-ups.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with
                our website, including pages visited, time spent, browser type, and
                referring URLs.
              </li>
              <li>
                <strong>Cookies and Tracking:</strong> We use cookies and similar
                technologies to improve your experience, analyze traffic, and serve
                relevant content.
              </li>
              <li>
                <strong>Payment Information:</strong> If you purchase a membership
                or service, payment details are processed by our third-party payment
                processor and are not stored on our servers.
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              3. How We Use Your Information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To respond to inquiries and process tour bookings.</li>
              <li>To provide and manage workspace memberships and services.</li>
              <li>To send transactional emails (confirmations, receipts).</li>
              <li>
                To send marketing communications (only with your consent; you can
                unsubscribe at any time).
              </li>
              <li>To improve our website and services through analytics.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>

          {/* Information Sharing */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              4. Information Sharing
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may share information
              with:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who help us
                operate our website, process payments, and deliver services (e.g.,
                email providers, analytics tools, payment processors).
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or governmental authority.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger,
                acquisition, or sale of assets.
              </li>
            </ul>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              5. Data Retention
            </h2>
            <p className="mt-3">
              We retain personal information only for as long as necessary to
              fulfill the purposes described in this policy or as required by law.
              You may request deletion of your data at any time by contacting us.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              6. Your Rights
            </h2>
            <p className="mt-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:access@muzeoffice.com"
                className="text-[#EAA820] hover:underline"
              >
                access@muzeoffice.com
              </a>
              .
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              7. Cookies
            </h2>
            <p className="mt-3">
              Our website uses cookies to enhance functionality and analyze traffic.
              You can control cookie preferences through your browser settings.
              Disabling cookies may affect your experience on our website.
            </p>
          </div>

          {/* Third-Party Links */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              8. Third-Party Links
            </h2>
            <p className="mt-3">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of those sites and encourage you
              to review their policies.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              9. Security
            </h2>
            <p className="mt-3">
              We use reasonable administrative, technical, and physical safeguards
              to protect your personal information. However, no method of
              transmission over the Internet or electronic storage is 100% secure.
            </p>
          </div>

          {/* Children's Privacy */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              10. Children&apos;s Privacy
            </h2>
            <p className="mt-3">
              Our services are not directed at individuals under 18. We do not
              knowingly collect personal information from children.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              11. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated &ldquo;Last updated&rdquo; date.
              Continued use of our website after changes constitutes acceptance.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              12. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy or your personal
              information, contact us at:
            </p>
            <address className="mt-3 not-italic">
              <strong>Muze International Corporation</strong>
              <br />
              6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119
              <br />
              Email:{" "}
              <a
                href="mailto:access@muzeoffice.com"
                className="text-[#EAA820] hover:underline"
              >
                access@muzeoffice.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+17023707515"
                className="text-[#EAA820] hover:underline"
              >
                (702) 370-7515
              </a>
            </address>
          </div>
        </div>
      </div>
    </Section>
  );
}
