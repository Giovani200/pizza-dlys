"use client";

import { useSyncExternalStore } from "react";
import { describeOpeningStatus, getOpeningStatus } from "@/lib/opening-hours";
import styles from "./StatusBadge.module.css";

const MINUTE_IN_MILLISECONDS = 60_000;

function subscribeToMinuteChanges(onMinuteChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const scheduleNextTick = () => {
    timer = setTimeout(() => {
      onMinuteChange();
      scheduleNextTick();
    }, MINUTE_IN_MILLISECONDS - (Date.now() % MINUTE_IN_MILLISECONDS));
  };
  scheduleNextTick();
  return () => clearTimeout(timer);
}

const getCurrentMinute = () => Math.floor(Date.now() / MINUTE_IN_MILLISECONDS);
const getMinuteDuringBuild = () => null;

type StatusBadgeProps = {
  variant: "stamp" | "inline";
  className?: string;
};

/**
 * Open/closed badge computed in the browser only: the static HTML is built once,
 * so a status rendered at build time would be wrong the next day.
 */
export function StatusBadge({ variant, className }: StatusBadgeProps) {
  const minute = useSyncExternalStore(subscribeToMinuteChanges, getCurrentMinute, getMinuteDuringBuild);
  const classNames = [styles.badge, styles[variant], className].filter(Boolean).join(" ");

  if (minute === null) return <p className={classNames} data-pending="" />;

  const { isOpen, label, detail } = describeOpeningStatus(getOpeningStatus(new Date(minute * MINUTE_IN_MILLISECONDS)));
  return (
    <p className={classNames}>
      <span className={isOpen ? styles.dotOpen : styles.dotClosed} aria-hidden="true" />
      <span className={styles.label}>{label}</span> {detail && <span>{detail}</span>}
    </p>
  );
}
