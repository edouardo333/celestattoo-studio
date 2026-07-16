import type { LucideIcon } from "lucide-react";

type IconBadgeSize = "xs" | "sm" | "md";
type IconBadgeVariant = "light" | "dark";

// Single source of truth for every medallion-style icon in the block-3
// sections (Processus, FAQ, Contact, Footer) so they all read as one
// consistent design system: thin gold circle, discreet fill, same
// transition curve, same hover glow.
const SIZE_MAP: Record<IconBadgeSize, { circle: string; icon: string }> = {
  xs: { circle: "h-[30px] w-[30px]", icon: "h-[15px] w-[15px]" },
  sm: { circle: "h-[34px] w-[34px]", icon: "h-4 w-4" },
  md: { circle: "h-10 w-10", icon: "h-[18px] w-[18px]" },
};

interface IconBadgeProps {
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: IconBadgeSize;
  variant?: IconBadgeVariant;
  /** Marks the badge as "open"/"selected" — brighter border and fill. */
  active?: boolean;
  /** Enables the group-hover lift + glow; the nearest ancestor must carry `className="group"`. */
  interactive?: boolean;
  className?: string;
}

export default function IconBadge({
  icon: Icon,
  size = "sm",
  variant = "light",
  active = false,
  interactive = false,
  className = "",
}: IconBadgeProps) {
  const { circle, icon } = SIZE_MAP[size];

  const restCircle =
    variant === "dark" ? "border-gold/30 bg-cream/5" : "border-gold/30 bg-cream";
  const activeCircle = "border-gold/55 bg-gold/10";
  const iconColor = variant === "dark" ? "text-gold-soft" : "text-gold";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-[400ms] ease-out ${circle} ${
        active ? activeCircle : restCircle
      } ${
        interactive
          ? "group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:shadow-[0_0_14px_1px_rgba(185,138,74,0.28)]"
          : ""
      } ${className}`}
    >
      <Icon
        className={`${icon} ${iconColor} transition-transform duration-[400ms] ease-out ${
          interactive ? "group-hover:-translate-y-0.5" : ""
        }`}
        strokeWidth={1.4}
      />
    </span>
  );
}
