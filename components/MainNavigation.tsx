"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { Button } from "@/components/Button";
import styles from "./MainNavigation.module.css";

type NavigationItem = { label: string; href: string; isCurrent: (path: string) => boolean };

const isMenuPage = (path: string) => path.startsWith("/carte/");
const isFormulesPage = (path: string) => path.startsWith("/carte/formules/");

const MOBILE_ITEMS: NavigationItem[] = [
  { label: ui.navigation.menu, href: "/carte/pizzas/", isCurrent: isMenuPage },
  { label: ui.navigation.infos, href: "/infos/", isCurrent: (path) => path.startsWith("/infos/") },
];

const DESKTOP_ITEMS: NavigationItem[] = [
  { label: ui.navigation.menu, href: "/carte/pizzas/", isCurrent: (path) => isMenuPage(path) && !isFormulesPage(path) },
  { label: ui.navigation.formules, href: "/carte/formules/", isCurrent: isFormulesPage },
  { label: ui.navigation.infos, href: "/#infos", isCurrent: () => false },
];

const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/**
 * Two navigations, one per layout, because the references link « Infos » to its own page on
 * mobile but to the home section on desktop. The hidden one is display: none, so assistive
 * technologies only ever meet one.
 */
export function MainNavigation() {
  const path = withTrailingSlash(usePathname());

  const renderLinks = (items: NavigationItem[]) =>
    items.map((item) => (
      <Link
        key={item.href}
        className={`${styles.link} bold`}
        href={item.href}
        aria-current={item.isCurrent(path) ? "page" : undefined}
      >
        {item.label}
      </Link>
    ));

  return (
    <>
      <nav className={styles.mobile} aria-label={ui.navigation.label}>
        {renderLinks(MOBILE_ITEMS)}
      </nav>
      <nav className={styles.desktop} aria-label={ui.navigation.label}>
        {renderLinks(DESKTOP_ITEMS)}
        <Button className={styles.phone} href={infos.phone_href} tone="yellow" size="compact">
          {infos.phone_display}
        </Button>
      </nav>
    </>
  );
}
