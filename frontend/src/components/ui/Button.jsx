import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary:
        "bg-accent-main text-white hover:bg-accent-hover shadow-sm",
      secondary:
        "bg-text-primary text-white hover:bg-text-secondary shadow-sm",
      outline:
        "border border-text-primary/20 bg-transparent hover:bg-surface-muted text-text-primary",
      ghost: "hover:bg-surface-muted text-text-primary",
    }

    const sizes = {
      default: "h-11 px-6 py-2 text-sm",
      sm: "h-9 rounded-md px-4 text-xs",
      lg: "h-14 rounded-md px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-main disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
