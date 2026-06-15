import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Muze Office Franchise privacy policy. Learn how we collect, use, and protect your personal information when you visit our website or submit an inquiry.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#74726D]">Last updated: June 15, 2026</p>

        <div className="mt-12 flex flex-col gap-10 text-sm leading-relaxed text-[#74726D]">
          {/* 1. Introduction */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              1. Introduction
            </h2>
            <p className="mt-3">
              {BRAND.legalName} (&ldquo;{BRAND.name},&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website{" "}
              <strong>{BRAND.url}</strong> and provides information about its flexible
              workspace franchise, investment, and partnership opportunities. This
              Privacy Policy explains how we collect, use, disclose, and protect your
              personal information when you visit our website or submit an inquiry
              through our qualification form.
            </p>
          </div>

          {/* 2. Information We Collect */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              2. Information We Collect
            </h2>
            <p className="mt-3">We may collect the following types of information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Qualification form submissions:</strong> When you submit our
                franchise inquiry form, we collect your name, email address, phone
                number, interest track (operate / invest / partner), available capital
                range, target market or city, timeline to open, current role or
                business background, and your message. These fields help us
                pre-qualify inquiries and tailor our discovery call conversations.
              </li>
              <li>
                <strong>Usage data:</strong> Information about how you interact with
                our website, including pages visited, time spent, browser type, device
                type, and referring URLs.
              </li>
              <li>
                <strong>Cookies and tracking technologies:</strong> We use cookies and
                similar technologies to improve your experience, analyze traffic, and
                serve relevant content. See Section 7 for more detail.
              </li>
              <li>
                <strong>Scheduling information:</strong> If you book a discovery call
                through our scheduling link, that provider (e.g., Calendly) may collect
                and store scheduling-related data under its own privacy policy.
              </li>
            </ul>
          </div>

          {/* 3. How We Use Your Information */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              3. How We Use Your Information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                To review and respond to franchise, investment, and partnership
                inquiries.
              </li>
              <li>
                To schedule and conduct discovery calls with qualified prospects.
              </li>
              <li>To send transactional emails (inquiry confirmations, follow-ups).</li>
              <li>
                To send marketing communications about franchise opportunities (only
                with your consent; you may unsubscribe at any time).
              </li>
              <li>To improve our website and lead-qualification process through analytics.</li>
              <li>To detect and prevent spam and fraudulent submissions.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>

          {/* 4. Information Sharing */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              4. Information Sharing
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Service providers:</strong> Third-party vendors who help us
                operate our website, deliver emails, analyze traffic, and manage
                scheduling (e.g., email providers, analytics tools, scheduling
                platforms). These providers are contractually bound to use your data
                only for the services they perform for us.
              </li>
              <li>
                <strong>Legal requirements:</strong> When required by law, court order,
                or governmental authority.
              </li>
              <li>
                <strong>Business transfers:</strong> In connection with a merger,
                acquisition, or sale of assets, in which case your information may be
                transferred as part of that transaction.
              </li>
            </ul>
          </div>

          {/* 5. Data Retention */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              5. Data Retention
            </h2>
            <p className="mt-3">
              We retain inquiry and contact information for as long as necessary to
              manage the franchise sales process and meet legal requirements. You may
              request deletion of your data at any time by contacting us.
            </p>
          </div>

          {/* 6. Your Rights */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              6. Your Rights
            </h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may have the right to:
            </p>
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
                href={`mailto:${BRAND.email}`}
                className="text-[#EAA820] hover:underline"
              >
                {BRAND.email}
              </a>
              .
            </p>
          </div>

          {/* 7. Cookies */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              7. Cookies
            </h2>
            <p className="mt-3">
              Our website uses cookies to enhance functionality and analyze traffic.
              We use Vercel Analytics, which collects anonymized page-view data
              without storing personal identifiers. You can control cookie preferences
              through your browser settings. Disabling cookies may affect your
              experience on our website.
            </p>
          </div>

          {/* 8. Third-Party Links */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              8. Third-Party Links
            </h2>
            <p className="mt-3">
              Our website contains links to third-party websites, including{" "}
              <a
                href={BRAND.mainSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAA820] hover:underline"
              >
                {BRAND.mainSiteUrl}
              </a>{" "}
              and scheduling platforms. We are not responsible for the privacy
              practices of those sites and encourage you to review their policies
              before providing personal information.
            </p>
          </div>

          {/* 9. Security */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              9. Security
            </h2>
            <p className="mt-3">
              We use reasonable administrative, technical, and physical safeguards to
              protect your personal information. Form submissions are transmitted over
              HTTPS. However, no method of transmission over the Internet or
              electronic storage is 100% secure.
            </p>
          </div>

          {/* 10. Children's Privacy */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              10. Children&apos;s Privacy
            </h2>
            <p className="mt-3">
              This website is directed at adults interested in business and investment
              opportunities. We do not knowingly collect personal information from
              individuals under 18.
            </p>
          </div>

          {/* 11. Changes */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              11. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated &ldquo;Last updated&rdquo; date.
              Continued use of our website after changes constitutes acceptance of
              the updated policy.
            </p>
          </div>

          {/* 12. Contact */}
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
              12. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy or your personal
              information, contact us at:
            </p>
            <address className="mt-3 not-italic">
              <strong>{BRAND.legalName}</strong>
              <br />
              6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119
              <br />
              Email:{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-[#EAA820] hover:underline"
              >
                {BRAND.email}
              </a>
              <br />
              Phone:{" "}
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="text-[#EAA820] hover:underline"
              >
                {BRAND.phoneDisplay}
              </a>
            </address>
          </div>
        </div>
      </div>
    </Section>
  );
}
