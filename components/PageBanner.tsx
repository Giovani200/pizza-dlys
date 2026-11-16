import type { StaticImageData } from "next/image";
import { ProductImage } from "@/components/ProductImage";
import styles from "./PageBanner.module.css";

type PageBannerProps = {
  title: string;
  intro?: string;
  product?: { source: StaticImageData; alt: string; className: string; sizes: string };
};

const TITLE_ID = "page-title";

export function PageBanner({ title, intro, product }: PageBannerProps) {
  return (
    <section className={`${styles.banner} halftone`} aria-labelledby={TITLE_ID}>
      {product && <ProductImage {...product} priority entrance={false} />}
      <div className={styles.text}>
        <h1 id={TITLE_ID} className="script-type text-h2">
          {title}
        </h1>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
    </section>
  );
}
