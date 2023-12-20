import clsx from "clsx";
import { ClassValue } from "clsx";

export default function Container({
  children,
  className,
}: React.PropsWithChildren<{ className?: ClassValue }>) {
  return (
    <div
      className={clsx(className, "mx-auto w-[clamp(1vw,_100%_-_40px,_80rem)]")}
    >
      {children}
    </div>
  );
}
