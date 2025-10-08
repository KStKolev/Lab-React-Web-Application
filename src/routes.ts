export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products/:category",
  PC: "/products/pc",
  PS: "/products/ps",
  XBOX: "/products/xbox",
  ABOUT: "/about",
  CATCH: "*",
} as const;

export default ROUTES;
