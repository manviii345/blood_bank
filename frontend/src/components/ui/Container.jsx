import { cn } from "@/lib/utils";

export function Container({ children, className, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1400px] px-6 md:px-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
