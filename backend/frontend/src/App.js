import {
  createHashRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import ProductPage from "./pages/product/ProductPage";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Resgister from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Shipping from "./pages/shipping/Shipping";
import Payment from "./pages/payment/Payment";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Order from "./pages/order/Order";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import UserList from "./pages/admin/UsersList";
import UserEdit from "./pages/admin/UserEdit";
import ProductList from "./pages/admin/ProductsList";
import ProductEdit from "./pages/admin/ProductEdit";
import OrderList from "./pages/admin/OrdersList";
import ErrorBoundary from "./components/ErrorBoundary";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Resgister />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },
      {
        path: "/placeOrder",
        element: <PlaceOrder />,
      },
      {
        path: "/order/:id",
        element: <Order />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/cart/:id?",
        element: <Cart />,
      },
      {
        path: "/admin/usersList",
        element: <UserList />,
      },
      {
        path: "/admin/user/:id/edit",
        element: <UserEdit />,
      },
      {
        path: "/admin/productsList",
        element: <ProductList />,
      },
      {
        path: "/admin/product/:id/edit",
        element: <ProductEdit />,
      },
      {
        path: "/admin/ordersList",
        element: <OrderList />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
