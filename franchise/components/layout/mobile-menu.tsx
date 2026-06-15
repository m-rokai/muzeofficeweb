"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  TrendingUp,
  Workflow,
  DollarSign,
  Users,
  BadgeCheck,
  HelpCircle,
  Building2,
  Phone,
  ArrowUpRight,
  X,
} from "lucide-react";
import { mainNav } from "@/lib/data/navigation";
import { BRAND } from "@/lib/utils/constants";

// Per-item icon, keyed by route. Falls back to the arrow if a route is added
// to mainNav without an icon here.
const NAV_ICONS: Record<string, React.ElementType> = {
  "/the-opportunity": TrendingUp,
  "/the-model": Workflow,
  "/investment": DollarSign,
  "/franchisees": Users,
  "/why-muze": BadgeCheck,
  "/faq": HelpCircle,
  "/about": Building2,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Portals need `document`; enable only after client mount. One-time flag —
  // the set-state-in-effect rule doesn't apply to a mount latch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // While open: lock body scroll, close on Escape, keep focus inside the panel,
  // and restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    }, 80);

    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-xl text-[#1A1A1A] transition-[scale,background-color] duration-200 ease-out hover:bg-[#1A1A1A]/5 active:scale-[0.95]"
      >
        <span className="block h-3.5 w-6">
          <span className="block h-0.5 w-6 rounded-full bg-current" />
          <span className="mt-[5px] block h-0.5 w-6 rounded-full bg-current" />
        </span>
      </button>

      {/* Portalled to <body>: the sticky header uses backdrop-filter, which
          creates a containing block that would otherwise trap these
          position:fixed layers (clipping the panel to the header's height).
          initial={false} is intentionally omitted — the layers are absent until
          opened, so we DO want the enter animation to play on each open. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && [
          <motion.button
            key="overlay"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] cursor-default bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          />,
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed right-0 top-0 z-[61] flex h-full w-[86%] max-w-[360px] flex-col bg-[#1A1A1A] text-white shadow-[-12px_0_40px_-12px_rgba(0,0,0,0.6)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.22, ease: EASE } }}
            transition={{ type: "spring", duration: 0.45, bounce: 0 }}
          >
            {/* Header: logo + close */}
            <div className="flex items-center justify-between px-5 pb-4 pt-5">
              <Image
                src="/images/logo.png"
                alt="Muze Office Franchise"
                width={2048}
                height={2048}
                sizes="48px"
                className="h-12 w-12 object-contain"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-white/80 transition-[scale,background-color,color] duration-200 ease-out hover:bg-white/10 hover:text-white active:scale-[0.95]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav (staggered) */}
            <motion.nav
              className="flex-1 overflow-y-auto px-3 py-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
              }}
            >
              {mainNav.map((item) => {
                const Icon = NAV_ICONS[item.href] ?? ArrowUpRight;
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition-[scale,background-color] duration-200 ease-out hover:bg-white/5 active:scale-[0.98]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#EAA820] transition-colors duration-200 group-hover:bg-[#EAA820] group-hover:text-[#1A1A1A]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-lg font-medium text-white">{item.label}</span>
                      <ArrowUpRight className="h-5 w-5 text-white/25 transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#EAA820]" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom CTA */}
            <motion.div
              className="border-t border-white/10 px-5 pb-8 pt-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.28, duration: 0.4, ease: EASE } }}
            >
              <Link
                href="/discovery-call"
                onClick={() => setOpen(false)}
                data-cta="book_discovery_call"
                data-cta-location="header_mobile_menu"
                className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-[#EAA820] text-base font-semibold text-[#1A1A1A] shadow-[0_8px_24px_-8px_rgba(234,168,32,0.6)] transition-[scale,background-color] duration-200 ease-out hover:bg-[#C17A28] active:scale-[0.96]"
              >
                Book a Discovery Call
              </Link>
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="mt-3 flex items-center justify-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {BRAND.phoneDisplay}
              </a>
              <p className="mt-3 text-center text-xs text-white/40">
                Free 1:1 franchise consultation
              </p>
            </motion.div>
          </motion.div>,
            ]}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
