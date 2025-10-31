import { useState, useEffect } from "react";
import useCart from "@/customHooks/useCart";
import backgroundImage from "@/assets/images/background.jpg";
import CartProductRow from "./cartProductRow";
import CartBalance from "./cartBalance";
import * as styles from "./cart.m.scss";

export default function Cart() {
  const [gamesCost, setGamesCost] = useState(0);
  const [userBalance, setUserBalance] = useState(50.0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { cartItems, removeSelectedItems } = useCart();

  useEffect(() => {
    const totalCost = Math.round(cartItems.reduce((sum, { price, amount }) => sum + price * amount, 0) * 100) / 100;
    setGamesCost(totalCost);
  }, [cartItems]);

  const handleCheckboxChange = (productName: string, isChecked: boolean) => {
    setSelectedItems((prev) => (isChecked ? [...prev, productName] : prev.filter((name) => name !== productName)));
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length > 0) {
      removeSelectedItems(selectedItems);
      setSelectedItems([]);
    }
  };

  const handleBuy = () => {
    if (gamesCost <= userBalance && cartItems.length > 0) {
      setUserBalance((prev) => Math.round((prev - gamesCost) * 100) / 100);
      const allProductNames = cartItems.map((item) => item.productName);
      removeSelectedItems(allProductNames);
      setSelectedItems([]);
    } else if (gamesCost > userBalance) {
      alert("Insufficient balance!");
    }
  };

  return (
    <main className={styles.cartMain} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <section className={styles.cartSection}>
        <div className={styles.cartOverlay}>
          <h1 className={styles.cartTitle}>Cart page</h1>
          <hr />
        </div>

        <div>
          <table className={styles.cartTable}>
            <thead className={styles.cartTableHead}>
              <tr className={styles.cartTableHeadRow}>
                <th>Name</th>
                <th>Platform</th>
                <th>Order date</th>
                <th>Amount</th>
                <th>Price ($)</th>
              </tr>
            </thead>

            <tbody className={styles.cartTableBody}>
              {cartItems.map((item) => (
                <CartProductRow
                  key={`${item.productName}-${item.orderDate}`}
                  platforms={item.platforms}
                  productName={item.productName}
                  orderDate={item.orderDate}
                  amount={item.amount}
                  price={item.price}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}

              <tr>
                <td colSpan={6} className={styles.cartTableRemoveRow}>
                  <button type="button" className={styles.cartTableButton} onClick={handleRemoveSelected}>
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CartBalance gamesCost={gamesCost} userBalance={userBalance} onBuy={handleBuy} />
      </section>
    </main>
  );
}
