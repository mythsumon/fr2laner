import { cn } from "@/components/shared/utils";

export type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const alignmentClasses = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const SectionHeader = ({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-2", alignmentClasses[align], className)}>
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-700 md:text-xs">
          {label}
        </span>
      )}
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-sm text-slate-500 md:text-[15px]">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;


