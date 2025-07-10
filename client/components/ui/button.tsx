import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-xl",
        premium: "btn-premium text-white",
        gradient:
          "bg-gradient-royal text-white hover:scale-105 hover:shadow-2xl transform transition-all duration-300",
        sage: "bg-gradient-sage text-white hover:scale-105 hover:shadow-xl transform transition-all duration-300",
        glass:
          "glass-card text-royal-blue-700 hover:bg-white/20 backdrop-blur-md border border-white/30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline:
          "border-2 border-royal-blue-500 text-royal-blue-600 bg-transparent hover:bg-royal-blue-50 hover:scale-105 transition-all duration-300",
        secondary:
          "bg-cool-gray-100 text-cool-gray-700 hover:bg-cool-gray-200 hover:scale-105",
        ghost:
          "hover:bg-royal-blue-50 hover:text-royal-blue-700 hover:scale-105",
        link: "text-royal-blue-600 underline-offset-4 hover:underline hover:text-royal-blue-700",
        gold: "bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 hover:scale-105 hover:shadow-xl transform transition-all duration-300",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-2xl px-10 text-lg font-semibold",
        xl: "h-16 rounded-2xl px-12 text-xl font-bold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
