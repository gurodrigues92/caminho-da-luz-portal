import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium",
    "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // Shimmer / mirror sweep on hover
    "before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
    "before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "text-white bg-gradient-to-r from-cdl-primary via-cdl-primary-light to-cdl-primary shadow-lg shadow-cdl-primary/30 hover:shadow-xl hover:shadow-cdl-primary/40 hover:brightness-110",
        destructive:
          "text-white bg-gradient-to-r from-destructive via-destructive to-destructive/80 shadow-lg shadow-destructive/30 hover:brightness-110",
        outline:
          "before:hidden text-cdl-primary border-2 border-cdl-primary bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-cdl-primary hover:via-cdl-primary-light hover:to-cdl-primary hover:shadow-lg hover:shadow-cdl-primary/30",
        secondary:
          "text-white bg-gradient-to-r from-cdl-secondary via-cdl-secondary to-cdl-secondary/80 shadow-lg shadow-cdl-secondary/30 hover:brightness-110",
        ghost:
          "before:hidden text-cdl-text hover:bg-cdl-primary/10 hover:text-cdl-primary",
        link: "before:hidden text-cdl-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
