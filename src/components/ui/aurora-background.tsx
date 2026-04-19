import { cn } from "@/lib/utils";
import React from "react";

interface AuroraLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  showRadialGradient?: boolean;
}

/**
 * Animated aurora light layer. Render as an absolutely-positioned overlay
 * (e.g. on top of a hero background image). Uses CSS vars + animate-aurora.
 */
export const AuroraLayer = ({
  className,
  showRadialGradient = true,
  ...props
}: AuroraLayerProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn("overflow-hidden pointer-events-none", className)}
      {...props}
    >
      <div
        className={cn(
          `absolute -inset-[10px] opacity-100 blur-[4px] invert-0
           [--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)]
           [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#6366f1_15%,#06b6d4_20%,#a855f7_25%,#2563eb_30%)]
           [background-image:var(--white-gradient),var(--aurora)]
           [background-size:300%,_200%]
           [background-position:50%_50%,50%_50%]
           after:content-[''] after:absolute after:inset-0
           after:[background-image:var(--white-gradient),var(--aurora)]
           after:[background-size:200%,_100%]
           after:mix-blend-screen
           animate-aurora`,
          showRadialGradient &&
            "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]",
        )}
      />
    </div>
  );
};

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

/**
 * Full wrapper variant with aurora as background. Use AuroraLayer instead
 * when you need to overlay on top of an existing background image.
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-cdl-bg-light text-cdl-text transition-bg",
        className,
      )}
      {...props}
    >
      <AuroraLayer
        showRadialGradient={showRadialGradient}
        className="absolute inset-0"
      />
      {children}
    </div>
  );
};
