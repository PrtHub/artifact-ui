import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        "max-w-screen relative flex flex-col items-center justify-center rounded-xl bg-background p-0 md:border md:p-16",
        className,
      )}
    >
      <div
        className={cn(
          `absolute inset-0 size-full`,
          `bg-[linear-gradient(45deg,#ffffff,#f0f0f0)] dark:bg-[linear-gradient(45deg,#000000,#080808)]`,
          "lab-bg [background-size:16px_16px]",
        )}
      />
      {children}
    </div>
  );
};

export default ComponentWrapper;
