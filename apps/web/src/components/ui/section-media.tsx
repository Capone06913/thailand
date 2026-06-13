import Image from "next/image";
import { cn } from "@/lib/utils";

interface SectionMediaProps {
  src: string;
  alt: string;
  reverse?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SectionMedia({
  src,
  alt,
  reverse,
  children,
  className,
}: SectionMediaProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[&>*:first-child]:order-2",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-teal-950/10 ring-1 ring-black/5">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-teal)]/30 to-transparent" />
      </div>
      <div>{children}</div>
    </div>
  );
}

