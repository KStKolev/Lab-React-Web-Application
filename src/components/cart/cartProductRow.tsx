import { CartProductProps } from "@/interfaces/cartProduct";
import useCart from "../customHooks/useCart";
import * as styles from "./cartProductRow.m.scss";

interface CartProductRowProps extends CartProductProps {
  onCheckboxChange: (productName: string, isChecked: boolean) => void;
}

export default function CartProductRow(props: CartProductRowProps) {
  const { updateAmount } = useCart();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number.parseInt(event.target.value, 10);
    updateAmount({ productName: props.productName, amount: newAmount });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onCheckboxChange(props.productName, event.target.checked);
  };

  return (
    <tr className={styles.cartProductRow}>
      <td>{props.productName}</td>
      <td>
        <select aria-label="Platform" className={styles.cartProductPlatform}>
          {props.platforms.map((platform) => (
            <option key={platform}>{platform}</option>
          ))}
        </select>
      </td>
      <td>{props.orderDate}</td>
      <td className={styles.cartProductAmountCell}>
        <input
          type="number"
          min="1"
          defaultValue={props.amount}
          aria-label="Amount"
          className={styles.cartProductAmount}
          onChange={handleAmountChange}
          onKeyDown={(e) => e.preventDefault()}
        />
      </td>
      <td>{props.price}</td>
      <td>
        <input type="checkbox" aria-label="Select row" className={styles.cartProductSelect} onChange={handleCheckboxChange} />
      </td>
    </tr>
  );
}
