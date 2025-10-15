export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products/:category",
  PC: "/products/pc",
  PS: "/products/ps",
  XBOX: "/products/xbox",
  ABOUT: "/about",
  PROFILE: "/profile",
  CART: "/cart",
  CATCH: "*",
} as const;

export default ROUTES;
