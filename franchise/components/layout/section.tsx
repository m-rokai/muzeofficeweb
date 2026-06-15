import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "white" | "gray" | "dark";
  id?: string;
}

export function Section({
  children,
  className,
  variant = "white",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-16 px-4 sm:px-6 md:py-24",
        variant === "white" && "bg-[#FAFAF7] text-[#1A1A1A]",
        variant === "gray" && "bg-[#F2F1ED] text-[#1A1A1A]",
        variant === "dark" && "bg-[#1A1A1A] text-white",
        className
      )}
    >
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}
