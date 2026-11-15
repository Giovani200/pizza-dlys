import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import styles from "./DeliveryRoute.module.css";

const ROUTES = {
  compact: { width: 354, height: 170, path: "M24 136 C 96 150 100 50 182 62 S 286 142 330 40" },
  wide: { width: 560, height: 220, path: "M30 180 C 140 200 150 60 280 80 S 440 200 530 50" },
};

export function DeliveryRoute({ size, className }: { size: keyof typeof ROUTES; className?: string }) {
  const { width, height, path } = ROUTES[size];
  return (
    <div className={`${styles.route} ${className ?? ""}`} aria-hidden="true" style={{ width, height }}>
      <svg className={styles.drawing} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path className={styles.track} d={path} />
        <path className={styles.dashes} d={path} />
      </svg>
      <div className={styles.box} style={{ offsetPath: `path('${path}')` }}>
        <svg width="58" height="44" viewBox="0 0 46 34">
          <path className={styles.boxShape} d="M3 13 H43 V31 H3 Z" />
          <path className={styles.boxShape} d="M3 13 L9 5 H37 L43 13" />
          <path className={styles.boxStripe} d="M10 22 H36" />
        </svg>
      </div>
      <span className={`${styles.origin} bold`}>{infos.address.street}</span>
      <span className={`${styles.destination} bold`}>{ui.home.delivery.destination}</span>
    </div>
  );
}
