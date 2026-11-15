import type { Metadata } from "next";
import infos from "@/content/infos.json";
import ui from "@/content/ui.json";
import { AddressCard } from "@/components/AddressCard";
import { Button } from "@/components/Button";
import { DeliverySection } from "@/components/DeliverySection";
import { HoursCard } from "@/components/HoursCard";
import { PageBanner } from "@/components/PageBanner";
import styles from "./page.module.css";

export const metadata: Metadata = { title: ui.infos.title };

export default function InfosPage() {
  return (
    <>
      <PageBanner title={ui.infos.title} />
      <section className={styles.section} aria-label={ui.infos.sections_label}>
        <HoursCard headingLevel="h2" />
        <AddressCard headingLevel="h2" />
        <Button href={infos.maps_url} tone="paper" size="large" icon="external" external>
          {ui.actions.open_maps}
        </Button>
      </section>
      <DeliverySection placement="infos" />
    </>
  );
}
