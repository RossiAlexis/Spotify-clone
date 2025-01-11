import type { PropsWithChildren } from "react";

export default function SideMenuItem({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  return (
    <li>
      <a
        className="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium"
        href={href}
      >
        {children}
      </a>
    </li>
  );
}
