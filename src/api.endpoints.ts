const apiEndpoints = {
  testMock: "/api/testMock",
  searchProducts: "/api/search",
  topProducts: "/api/products/top",
  getProducts: "/api/products",
  createProduct: "/api/product",
  updateProduct: "/api/product",
  deleteProduct: (id: number | string) => `/api/product/${id}`,
  signIn: "/api/auth/signIn",
  signUp: "/api/auth/signUp",
  getProfile: "/api/getProfile",
  saveProfile: "/api/saveProfile",
  changePassword: "/api/changePassword",
};

export default apiEndpoints;
