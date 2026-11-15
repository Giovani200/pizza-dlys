import { LogoBadge } from "@/components/LogoBadge";
import { MainNavigation } from "@/components/MainNavigation";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <LogoBadge placement="header" />
      <MainNavigation />
    </header>
  );
}
