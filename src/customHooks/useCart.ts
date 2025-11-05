import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { addToCart, updateAmount, updateProductInCart, removeSelectedItems } from "@/redux/cartSlice";
import { RootState, AppDispatch } from "@/redux/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function useCart() {
  const cartCount = useAppSelector((state) => state.cart.length);
  const cartItems = useAppSelector((state) => state.cart);

  const dispatch = useDispatch<AppDispatch>();
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
