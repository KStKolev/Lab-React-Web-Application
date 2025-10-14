import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334

import { Component /* , StrictMode */ } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import apiEndpoints from "./api.endpoints";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Products from "./components/products/products";
import Profile from "./components/profile/profile";
import Cart from "./components/cart/Cart";
import About from "./components/about/about";
import Footer from "./components/footer/footer";
import ProtectedRoute from "./components/header/protectedRoute";
import ErrorBoundary from "./components/errorHandler/errorBoundary";
import ErrorPage from "./components/errorHandler/errorPage";
import { ROUTES } from "./routes";
import TestComponent from "./components/testComponent";
import ErrorRoutingPage from "./components/errorHandler/errorRoutingPage";

interface Props {}
interface State {}

async function testFetch(): Promise<void> {
  const data = await (await fetch(apiEndpoints.testMock)).json();
  console.warn("fetched data", data);
}

class AppContainer extends Component<Props, State> {
  // ["constructor"]: typeof AppContainer;

  constructor(props: Props) {
    super(props);
    this.state = {};
    // test class-dead-code
    const goExclude = true;
    if (!goExclude) {
      console.warn("class-dead-code doesn't work", props);
    }
  }

  componentDidMount(): void {
    setTimeout(testFetch, 300);
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} errorElement={<ErrorRoutingPage />} />
            <Route
              path={ROUTES.PRODUCTS}
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
              errorElement={<ErrorRoutingPage />}
            />
            <Route
              path={ROUTES.ABOUT}
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
              errorElement={<ErrorRoutingPage />}
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
              errorElement={<ErrorRoutingPage />}
            />
            <Route
              path={ROUTES.CART}
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
              errorElement={<ErrorRoutingPage />}
            />
            <Route path="/test" element={<TestComponent />} errorElement={<ErrorRoutingPage />} />

            <Route path={ROUTES.CATCH} element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <ErrorBoundary fallback={ErrorPage}>
    <AppContainer />
  </ErrorBoundary>,
);
// React + TS: https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets
