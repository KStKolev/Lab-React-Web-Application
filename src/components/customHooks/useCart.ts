import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateAmount, updateProductInCart, removeSelectedItems } from "@/store/cartSlice";
import { RootState } from "@/store/store";

export default function useCart() {
  const cartCount = useSelector((state: RootState) => state.cart.length);
  const cartItems = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const handleAddToCart = (product: object) => dispatch(addToCart(product));
  const handleUpdateAmount = (product: object) => dispatch(updateAmount(product));
  const handleUpdateProductInCart = (product: object) => dispatch(updateProductInCart(product));
  const handleRemoveSelectedItems = (productNames: string[]) => dispatch(removeSelectedItems(productNames));

  return {
    cartCount,
    cartItems,
    addToCart: handleAddToCart,
    updateAmount: handleUpdateAmount,
    updateProductInCart: handleUpdateProductInCart,
    removeSelectedItems: handleRemoveSelectedItems,
  };
}
