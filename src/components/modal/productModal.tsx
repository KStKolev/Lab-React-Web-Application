import { useState } from "react";
import { ProductProps } from "@/interfaces/product";
import { ageOptions } from "@/constants/productOptions";
import { productInputStyles, productTextareaStyles, productInputWithIconStyles } from "@/constants/productModalStyles";
import useCart from "@/customHooks/useCart";
import useProductValidation from "@/customHooks/useProductValidation";
import useProductForm from "@/customHooks/useProductForm";
import Input from "@/elements/input";
import Textarea from "@/elements/textarea";
import FormGroup from "@/elements/formGroup";
import logIcon from "@/assets/images/icons/idCard.svg";
import Modal from "./modal";
import ConfirmModal from "./confirmModal";
import ProductImagePreview from "./productImagePreview";
import PlatformSelector from "./platformSelector";
import * as styles from "./productModal.m.scss";

interface ProductModalProps {
  onClose: () => void;
  onSubmit: (product: Partial<ProductProps>) => void;
  onDelete?: () => void;
  product?: ProductProps;
  mode: "add" | "edit";
}

export default function ProductModal(props: ProductModalProps) {
  const { removeSelectedItems, updateProductInCart } = useCart();
  const { formData, originalTitle, handleInputChange, handlePlatformChange } = useProductForm(props.product);
  const { errors, validateForm } = useProductValidation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSubmit = () => {
    if (!validateForm(formData)) return;

    if (props.mode === "edit") {
      updateProductInCart({
        oldTitle: originalTitle,
        newTitle: formData.title,
        price: formData.price,
        platforms: formData.platforms,
      });
    }

    props.onSubmit(formData);
    props.onClose();
  };

  const handleConfirmDelete = () => {
    if (props.onDelete && formData.title) {
      removeSelectedItems([formData.title]);
      props.onDelete();
      props.onClose();
    }
  };

  return (
    <>
      <Modal
        onClose={props.onClose}
        modalTitle={props.mode === "add" ? "Add Card" : "Edit Card"}
        enableScroll
        customStyles={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
          wrapper: { width: "70%" },
          title: { fontSize: "2.5rem", margin: "0em 1em 0 0em" },
        }}
      >
        <div className={styles.productModalContainer}>
          {props.mode === "edit" && <ProductImagePreview imageUrl={formData.imageUrl} />}

          <div className={styles.productModalRight}>
            <h3 className={styles.sectionTitle}>Information</h3>

            <FormGroup>
              <Input
                label="Name"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                iconUrl={logIcon}
                customStyles={productInputWithIconStyles}
                error={errors.title}
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Category"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                customStyles={productInputStyles}
                error={errors.genre}
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Price"
                type="text"
                name="price"
                value={formData.price?.toString()}
                onChange={handleInputChange}
                customStyles={productInputStyles}
                error={errors.price}
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Image"
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                customStyles={productInputStyles}
                error={errors.imageUrl}
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                customStyles={productTextareaStyles}
                error={errors.description}
              />
            </FormGroup>

            <FormGroup>
              <div className={styles.ageSelect}>
                <span>Age</span>

                <select name="age" value={formData.age} onChange={handleInputChange} className={styles.select}>
                  {ageOptions.map((ageOption) => (
                    <option key={ageOption} value={ageOption}>
                      {ageOption}
                    </option>
                  ))}
                </select>
              </div>
            </FormGroup>

            <PlatformSelector selectedPlatforms={formData.platforms} onPlatformChange={handlePlatformChange} error={errors.platforms} />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleSubmit} className={styles.button}>
            Submit
          </button>

          {props.mode === "edit" && (
            <button type="button" onClick={() => setShowConfirmDelete(true)} className={styles.button}>
              Delete card
            </button>
          )}
        </div>
      </Modal>

      {showConfirmDelete && (
        <ConfirmModal productName={`${formData.title}`} onConfirm={handleConfirmDelete} onCancel={() => setShowConfirmDelete(false)} />
      )}
    </>
  );
}
