import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-8xl px-5 md:px-10 lg:px-10",
        className
      )}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;

// ,
