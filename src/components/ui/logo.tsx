import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("font-headline font-bold text-2xl tracking-wider", className)}>
      MAJID<span className="text-primary">LABS</span>
    </div>
  );
};

export default Logo;
