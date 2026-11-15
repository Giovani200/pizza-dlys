import type { Metadata } from "next";
import infos from "@/content/infos.json";
import legal from "@/content/legal.json";
import { PageBanner } from "@/components/PageBanner";
import { fillTemplate } from "@/lib/format";
import styles from "./page.module.css";

export const metadata: Metadata = { title: legal.title };

const { street, postal_code, city } = infos.address;
const VALUES = {
  address: `${street}, ${postal_code} ${city}`,
  phone: infos.phone_display,
  developer: legal.developer,
};

export default function LegalNoticePage() {
  return (
    <>
      <PageBanner title={legal.title} />
      <div className={styles.content}>
        {legal.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2 className="display-type text-h4">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{fillTemplate(paragraph, VALUES)}</p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
