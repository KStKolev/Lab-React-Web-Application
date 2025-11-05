import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334

import { Component, lazy, Suspense /* , StrictMode */ } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import routes from "@/constants/routes";
import { store } from "./redux/store";
import apiEndpoints from "./api.endpoints";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import ProtectedRoute from "./components/header/protectedRoute";
import ErrorBoundary from "./components/errorHandler/errorBoundary";
import ErrorPage from "./components/errorHandler/errorPage";
import Loader from "./components/loader";
import ErrorRoutingPage from "./components/errorHandler/errorRoutingPage";

const Products = lazy(() => import("./components/products/products"));
const Profile = lazy(() => import("./components/profile/profile"));
const Cart = lazy(() => import("./components/cart/cart"));
const About = lazy(() => import("./components/about/about"));
const TestComponent = lazy(() => import("./components/testComponent"));

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
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path={routes.HOME} element={<Home />} errorElement={<ErrorRoutingPage />} />
              <Route
                path={routes.PRODUCTS}
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
                errorElement={<ErrorRoutingPage />}
              />
              <Route
                path={routes.ABOUT}
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
                errorElement={<ErrorRoutingPage />}
              />
              <Route
                path={routes.PROFILE}
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
                errorElement={<ErrorRoutingPage />}
              />
              <Route
                path={routes.CART}
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
                errorElement={<ErrorRoutingPage />}
              />
              <Route path="/test" element={<TestComponent />} errorElement={<ErrorRoutingPage />} />

              <Route path={routes.CATCH} element={<Navigate to={routes.HOME} replace />} />
            </Routes>
          </Suspense>
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
