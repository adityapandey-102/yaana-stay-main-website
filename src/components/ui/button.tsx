"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-btn text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-lavender-600 text-white hover:bg-lavender-700 active:bg-lavender-800 shadow-md hover:shadow-lg",
        outline: "border-2 border-lavender-600 bg-transparent hover:bg-lavender-100 text-lavender-700 hover:text-lavender-900",
        ghost: "hover:bg-lavender-100 text-lavender-700 hover:text-lavender-900",
        gold: "bg-lavender-600 text-white hover:bg-lavender-700 active:bg-lavender-800 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-xs",
        sm: "h-9 px-4 text-[10px]",
        md:"h-10 px-4 text-[10px]",
        lg: "h-14 px-10 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
