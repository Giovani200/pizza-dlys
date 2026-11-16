"use client";

import { useLayoutEffect, useRef, type MouseEvent } from "react";
import ui from "@/content/ui.json";
import { Button } from "@/components/Button";
import styles from "./MenuTabs.module.css";

const SECTIONS = ["pizzas", "tacos", "burgers", "formules"] as const;
type MenuSection = (typeof SECTIONS)[number];

let tabsWereStuckOnLastClick = false;

/** Document offset of a sticky element at its place in the flow, as if it were not stuck. */
function naturalTop(element: HTMLElement) {
  element.style.position = "static";
  const top = element.getBoundingClientRect().top + window.scrollY;
  element.style.position = "";
  return top;
}

function isPlainClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

/**
 * Each section is its own page, so switching tabs mounts a new page. When the tabs were stuck
 * to the top of the screen, the new page opens with them stuck too, its content right below.
 */
export function MenuTabs({ current }: { current: MenuSection }) {
  const navigationRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const navigation = navigationRef.current;
    if (!tabsWereStuckOnLastClick || !navigation) return;
    tabsWereStuckOnLastClick = false;
    window.scrollTo(0, naturalTop(navigation));
  }, []);

  function rememberWhetherTabsAreStuck(event: MouseEvent<HTMLElement>) {
    const tab = (event.target as Element).closest("a");
    const navigation = navigationRef.current;
    if (!tab || !navigation || tab.hasAttribute("aria-current") || !isPlainClick(event)) return;
    tabsWereStuckOnLastClick = window.scrollY > 0 && navigation.getBoundingClientRect().top <= 0;
  }

  return (
    <nav
      ref={navigationRef}
      className={styles.tabs}
      aria-label={ui.carte.tabs_label}
      onClickCapture={rememberWhetherTabsAreStuck}
    >
      {SECTIONS.map((section) => (
        <Button
          key={section}
          href={`/carte/${section}/`}
          tone={section === current ? "yellow" : "paper"}
          size="tab"
          current={section === current}
          scroll={false}
        >
          {ui.carte.tabs[section]}
        </Button>
      ))}
    </nav>
  );
}
