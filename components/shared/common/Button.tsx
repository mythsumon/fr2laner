import React from "react";
import Link from "next/link";
import { cn } from "../utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  htmlType?: "button" | "submit" | "reset";
  type?: "primary" | "secondary" | "outline" | "ghost" | "default" | "text";
  size?: "sm" | "md" | "lg" | "small" | "middle" | "large";
  shape?: "default" | "round" | "circle";
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, htmlType = "button", type = "primary", size = "md", shape = "default", loading = false, children, disabled, href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-[#2E5E99] text-white hover:bg-[#1e4a7a]",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      outline: "border border-[#2E5E99] text-[#2E5E99] hover:bg-[#E9EEF8]",
      ghost: "text-[#2E5E99] hover:bg-[#E9EEF8]",
      default: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
      text: "text-[#0F172A] hover:bg-[#E9EEF8]",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
      small: "h-8 px-3 text-sm",
      middle: "h-10 px-4 text-base",
      large: "h-12 px-6 text-lg",
    };
    
    const sizeKey = size === "small" ? "small" : size === "middle" ? "middle" : size === "large" ? "large" : size;

    const shapes = {
      default: "rounded-lg",
      round: "rounded-full",
      circle: "rounded-full aspect-square",
    };

    const buttonContent = (
      <>
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </>
    );

    const buttonClassName = cn(baseStyles, variants[type], sizes[sizeKey], shapes[shape], className);

    if (href) {
      return (
        <Link href={href} className={buttonClassName} {...(props as any)}>
          {buttonContent}
        </Link>
      );
    }

    return (
      <button
        type={htmlType}
        className={buttonClassName}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

