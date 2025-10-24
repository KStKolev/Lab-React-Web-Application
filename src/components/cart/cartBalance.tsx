import * as styles from "./cartBalance.m.scss";

interface CartBalanceProps {
  gamesCost: number;
  userBalance: number;
  onBuy: () => void;
}

export default function CartBalance(props: CartBalanceProps) {
  return (
    <div className={styles.cartSummary}>
      <span>Games cost: {props.gamesCost}$ </span>
      <span>Your balance: {props.userBalance}$</span>
      <button type="button" className={styles.cartTableButton} onClick={props.onBuy}>
        Buy
      </button>
    </div>
  );
}
