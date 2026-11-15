import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { Button } from "@/components/Button";
import { DeliveryRoute } from "@/components/DeliveryRoute";
import styles from "./DeliverySection.module.css";

const TITLE_ID = "delivery-title";

export function DeliverySection({ placement }: { placement: "home" | "infos" }) {
  const orderButton = (
    <Button href={infos.uber_eats_url} tone="orange" size="large" icon="external" external>
      {ui.actions.order_uber_eats}
    </Button>
  );

  return (
    <section className={`${styles.section} ${styles[placement]} halftone`} aria-labelledby={TITLE_ID}>
      <div className={styles.layout}>
        <div className={styles.text}>
          <h2 id={TITLE_ID} className="script-type text-h2 reveal-on-scroll">
            {ui.home.delivery.title}
          </h2>
          <p className={`${styles.narrow} reveal-on-scroll`}>{infos.delivery}</p>
          <div className={`${styles.narrow} reveal-on-scroll`}>{orderButton}</div>
          {placement === "infos" && (
            <div className={styles.routeBelow}>
              <DeliveryRoute size="compact" />
            </div>
          )}
        </div>
        {placement === "home" && (
          <div className={styles.routeBeside}>
            <DeliveryRoute size="wide" />
          </div>
        )}
      </div>
    </section>
  );
}
