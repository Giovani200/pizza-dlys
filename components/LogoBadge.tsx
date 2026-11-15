import Image from "next/image";
import Link from "next/link";
import ui from "@/content/ui.json";
import logo from "@/public/images/logo-officiel.webp";
import styles from "./LogoBadge.module.css";

export function LogoBadge({ placement }: { placement: "header" | "footer" }) {
  const logoImage = <Image className={styles.logo} src={logo} alt={ui.meta.title} sizes="96px" priority={placement === "header"} />;

  if (placement === "footer") return <div className={`${styles.badge} ${styles.footer}`}>{logoImage}</div>;

  return (
    <Link className={`${styles.badge} ${styles.header}`} href="/" aria-label={ui.navigation.home}>
      {logoImage}
    </Link>
  );
}
