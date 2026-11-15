import ui from "@/content/ui.json";
import { Button } from "@/components/Button";
import styles from "./MenuTabs.module.css";

const SECTIONS = ["pizzas", "tacos", "burgers", "formules"] as const;
type MenuSection = (typeof SECTIONS)[number];

export function MenuTabs({ current }: { current: MenuSection }) {
  return (
    <nav className={styles.tabs} aria-label={ui.carte.tabs_label}>
      {SECTIONS.map((section) => (
        <Button
          key={section}
          href={`/carte/${section}/`}
          tone={section === current ? "yellow" : "paper"}
          size="tab"
          current={section === current}
        >
          {ui.carte.tabs[section]}
        </Button>
      ))}
    </nav>
  );
}
