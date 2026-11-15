import Link from "next/link";
import type { ReactNode } from "react";
import ui from "@/content/ui.json";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  children: ReactNode;
  tone: "red" | "orange" | "yellow" | "cream" | "paper";
  size: "compact" | "bar" | "large" | "tab";
  icon?: "arrow" | "external";
  external?: boolean;
  current?: boolean;
  className?: string;
};

const ICON_GLYPHS = { arrow: "→", external: "↗" };

export function Button({ href, children, tone, size, icon, external = false, current, className }: ButtonProps) {
  const classNames = [styles.button, styles[tone], styles[size], className].filter(Boolean).join(" ");
  const iconElement = icon && <span aria-hidden="true">{ICON_GLYPHS[icon]}</span>;
  const iconSitsInLabel = size === "bar";
  const content = (
    <>
      <span>
        {children}
        {iconSitsInLabel && iconElement && <> {iconElement}</>}
      </span>
      {!iconSitsInLabel && iconElement}
      {external && <span className="visually-hidden">{ui.actions.new_tab}</span>}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link className={classNames} href={href} aria-current={current ? "page" : undefined}>
        {content}
      </Link>
    );
  }
  return (
    <a className={classNames} href={href} {...(external && { target: "_blank", rel: "noopener" })}>
      {content}
    </a>
  );
}
