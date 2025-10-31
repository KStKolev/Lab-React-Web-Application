import { getImageSrc } from "@/utils/imageUtils";
import * as styles from "./productModal.m.scss";

interface ProductImagePreviewProps {
  imageUrl?: string;
}

export default function ProductImagePreview({ imageUrl }: ProductImagePreviewProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className={styles.productModalLeft}>
      <h3 className={styles.sectionTitle}>Card image</h3>

      <div className={styles.imagePreview}>
        <img src={getImageSrc(imageUrl)} alt="Product preview" className={styles.previewImage} />
      </div>
    </div>
  );
}
