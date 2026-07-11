import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const LayoutContainer = forwardRef<HTMLDivElement, LayoutContainerProps>(
  function LayoutContainer({ children, className, as: Tag = "div" }, ref) {
    return (
      <Tag
        ref={ref}
        className={cn(
          "container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          className
        )}
      >
        {children}
      </Tag>
    );
  }
);

export default LayoutContainer;
