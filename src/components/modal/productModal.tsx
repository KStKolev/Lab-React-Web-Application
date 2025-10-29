import { useState, useEffect } from "react";
import { ProductProps } from "@/interfaces/product";
import { PlatformType } from "@/constants/platforms";
import { ageOptions, platformOptions } from "@/constants/options";
import { getImageSrc } from "@/utils/imageUtils";
import useCart from "@/customHooks/useCart";
import Input from "@/elements/input";
import Textarea from "@/elements/textarea";
import FormGroup from "@/elements/formGroup";
import logIcon from "@/assets/images/icons/idCard.svg";
import Modal from "./modal";
import ConfirmModal from "./confirmModal";
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
  const [formData, setFormData] = useState<Partial<ProductProps>>({
    title: "",
    genre: "",
    price: 0,
    imageUrl: "",
    description: "",
    age: "3+",
    platforms: [],
  });
  const [originalTitle, setOriginalTitle] = useState<string>("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (props.product) {
      setFormData(props.product);
      setOriginalTitle(props.product.title);
    }
  }, [props.product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      const normalizedValue = value.replace(",", ".");
      setFormData((prev) => ({
        ...prev,
        price: parseFloat(normalizedValue),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePlatformChange = (platform: PlatformType) => {
    setFormData((prev) => {
      const platforms = prev.platforms || [];
      const isSelected = platforms.includes(platform);
      return {
        ...prev,
        platforms: isSelected ? platforms.filter((p) => p !== platform) : [...platforms, platform],
      };
    });
  };

  const formatPlatformLabel = (p: PlatformType): string => {
    switch (p) {
      case "PS":
        return "PlayStation 5";
      case "Xbox":
        return "XBox One";
      default:
        return p;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Name is required";
    }

    if (!formData.genre?.trim()) {
      newErrors.genre = "Category is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.imageUrl?.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.platforms || formData.platforms.length === 0) {
      newErrors.platforms = "At least one platform must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

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

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (props.onDelete && formData.title) {
      removeSelectedItems([formData.title]);
      props.onDelete();
      props.onClose();
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
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
          {props.mode === "edit" && (
            <div className={styles.productModalLeft}>
              <h3 className={styles.sectionTitle}>Card image</h3>
              <div className={styles.imagePreview}>
                {formData.imageUrl && <img src={getImageSrc(formData.imageUrl)} alt="Product preview" className={styles.previewImage} />}
              </div>
            </div>
          )}

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
                customStyles={{
                  wrapper: { display: "flex", alignItems: "center" },
                  label: { flex: "0 0 130px", fontSize: "1.3rem" },
                  inputField: {
                    fontSize: "1.1rem",
                    width: "100%",
                    color: "rgb(218, 218, 218)",
                    border: "2px solid rgb(166, 166, 166)",
                    backgroundColor: "rgba(0, 0, 0, 0.301)",
                    padding: "0.9em 1.3em 0.9em 1em",
                  },
                  icon: {
                    position: "absolute",
                    top: "50%",
                    right: "5%",
                    height: "20px",
                    width: "20px",
                    transform: "translateY(-50%)",
                  },
                }}
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
                customStyles={{
                  wrapper: { display: "flex", alignItems: "center" },
                  label: { flex: "0 0 130px", fontSize: "1.3rem" },
                  inputField: {
                    fontSize: "1.1rem",
                    width: "100%",
                    color: "rgb(218, 218, 218)",
                    border: "2px solid rgb(166, 166, 166)",
                    backgroundColor: "rgba(0, 0, 0, 0.301)",
                    padding: "0.9em 1.3em 0.9em 1em",
                  },
                }}
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
                customStyles={{
                  wrapper: { display: "flex", alignItems: "center" },
                  label: { flex: "0 0 130px", fontSize: "1.3rem" },
                  inputField: {
                    fontSize: "1.1rem",
                    width: "100%",
                    color: "rgb(218, 218, 218)",
                    border: "2px solid rgb(166, 166, 166)",
                    backgroundColor: "rgba(0, 0, 0, 0.301)",
                    padding: "0.9em 1.3em 0.9em 1em",
                  },
                }}
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
                customStyles={{
                  wrapper: { display: "flex", alignItems: "center" },
                  label: { flex: "0 0 130px", fontSize: "1.3rem" },
                  inputField: {
                    fontSize: "1.1rem",
                    width: "100%",
                    color: "rgb(218, 218, 218)",
                    border: "2px solid rgb(166, 166, 166)",
                    backgroundColor: "rgba(0, 0, 0, 0.301)",
                    padding: "0.9em 1.3em 0.9em 1em",
                  },
                }}
                error={errors.imageUrl}
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                customStyles={{
                  wrapper: { display: "flex", alignItems: "center" },
                  label: { flex: "0 0 130px", fontSize: "1.3rem" },
                  textarea: {
                    fontSize: "1.1rem",
                    width: "100%",
                    minHeight: "350px",
                    maxHeight: "600px",
                    color: "rgb(218, 218, 218)",
                    border: "2px solid rgb(166, 166, 166)",
                    backgroundColor: "rgba(0, 0, 0, 0.301)",
                    padding: "0.9em 1.3em 0.9em 1em",
                  },
                }}
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

            <FormGroup>
              <div className={styles.platformCheckboxes}>
                <span className={styles.sectionTitle}>Platform</span>
                {platformOptions.map((platform) => (
                  <label htmlFor={`platform-${platform}`} key={platform} className={styles.checkboxLabel}>
                    {formatPlatformLabel(platform)}
                    <input
                      type="checkbox"
                      name={`platform-${platform}`}
                      checked={formData.platforms?.includes(platform) || false}
                      onChange={() => handlePlatformChange(platform)}
                      className={styles.checkbox}
                    />
                  </label>
                ))}
              </div>
              {errors.platforms && <span className={styles.errorMessage}>{errors.platforms}</span>}
            </FormGroup>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleSubmit} className={styles.button}>
            Submit
          </button>
          {props.mode === "edit" && (
            <button type="button" onClick={handleDeleteClick} className={styles.button}>
              Delete card
            </button>
          )}
        </div>
      </Modal>

      {showConfirmDelete && (
        <ConfirmModal productName={`${formData.title}`} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </>
  );
}
