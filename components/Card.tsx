import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";

export type CardTone = "paper" | "red" | "orange" | "yellow" | "ink";
export type CardTilt = "left" | "right";

type CardStyle = { tone: CardTone; tilt?: CardTilt; flush?: boolean };
type CardProps = HTMLAttributes<HTMLDivElement> & CardStyle;

export function Card({ tone, tilt, flush, className, ...props }: CardProps) {
  return <div className={cardClassName({ tone, tilt, flush, className })} {...props} />;
}

/**
 * Shared with elements that need the card look without being a <div> (link cards).
 * `flush` removes the inner padding through --card-inner-padding, so the result never
 * depends on the load order of the caller's CSS module.
 */
export function cardClassName({ tone, tilt, flush, className }: CardStyle & { className?: string }) {
  return [styles.card, "reveal-on-scroll", styles[tone], tilt && styles[`tilt-${tilt}`], flush && styles.flush, className]
    .filter(Boolean)
    .join(" ");
}
