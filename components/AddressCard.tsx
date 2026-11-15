import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { Card, type CardTilt } from "@/components/Card";
import styles from "./AddressCard.module.css";

type AddressCardProps = { headingLevel: "h2" | "h3"; tilt?: CardTilt };

export function AddressCard({ headingLevel: Heading, tilt }: AddressCardProps) {
  const { street, postal_code, city } = infos.address;
  return (
    <Card tone="yellow" tilt={tilt} className={styles.card}>
      <Heading className="display-type text-h4">{ui.home.find_us.address}</Heading>
      <p className={styles.address}>
        {infos.name}
        <br />
        {street}
        <br />
        {postal_code} {city}
      </p>
      <a className={`${styles.phone} display-type text-h4`} href={infos.phone_href}>
        {infos.phone_display}
      </a>
    </Card>
  );
}
