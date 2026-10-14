"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { usePathname } from "next/navigation";

const DISMISS_KEY = "muze-free-workday-popup-dismissed-v1";
const ELIGIBLE_PATHS = new Set([
  "/",
  "/workspace-memberships",
  "/locations/las-vegas",
  "/las-vegas-coworking",
  "/las-vegas-hot-desk",
  "/las-vegas-dedicated-desk",
  "/las-vegas-private-office",
]);

export function FreeWorkdayPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const eligible = ELIGIBLE_PATHS.has(pathname);

  useEffect(() => {
    if (!eligible || dismissed) return;

    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "true") return;
    } catch {
      // The popup can still be dismissed for this visit if storage is unavailable.
    }

    const timer = window.setTimeout(() => setVisible(true), 6000);
    return () => window.clearTimeout(timer);
  }, [eligible, dismissed]);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Keep the popup dismissed until this component unmounts.
    }
  }

  if (!eligible || !visible || dismissed) return null;

  return (
    <aside
      aria-labelledby="free-workday-popup-title"
      className="fixed inset-x-4 bottom-[84px] z-40 mx-auto max-w-[420px] overflow-hidden rounded-2xl border border-[#E6E4DF] bg-[#FAFAF7] shadow-[0_20px_60px_rgba(26,26,26,0.22)] md:inset-x-auto md:bottom-6 md:right-6 md:mx-0 md:w-[420px]"
    >
      <div className="h-1.5 bg-[#EAA820]" />
      <div className="relative p-6 pr-14">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss free workday offer"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#74726D] transition-colors hover:bg-[#F2F1ED] hover:text-[#1A1A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A6000]">
          Your invitation to Muze Office
        </p>
        <h2 id="free-workday-popup-title" className="mt-2 text-2xl font-semibold leading-tight text-[#1A1A1A]">
          Tour the space. Work here free for a day.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#555550]">
          Come see our Las Vegas workspace, then stay and try coworking for yourself. Bring your laptop; the day is on us.
        </p>
        <Link
          href="/book-a-tour"
          onClick={dismiss}
          data-cta="book_tour"
          data-cta-location="free_workday_popup"
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
        >
          Book your tour <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
