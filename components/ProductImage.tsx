import Image, { type StaticImageData } from "next/image";
import styles from "./ProductImage.module.css";

type ProductImageProps = {
  source: StaticImageData;
  alt: string;
  /** Positions, width and --product-tilt, owned by the caller's CSS module. */
  className: string;
  /** Display width per layout, so the browser downloads the right generated size. */
  sizes: string;
  priority?: boolean;
  /** Plays the pop-in on mount. Off where the image reappears on every navigation (menu banners). */
  entrance?: boolean;
};

export function ProductImage({ source, alt, className, sizes, priority = false, entrance = true }: ProductImageProps) {
  const classNames = [styles.product, entrance && styles.entrance, className].filter(Boolean).join(" ");
  return (
    <div className={classNames} data-product="">
      <div className={styles.float}>
        <Image className={styles.image} src={source} alt={alt} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
