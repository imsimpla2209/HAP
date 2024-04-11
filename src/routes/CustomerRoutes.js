import { Routes, Route } from "react-router-dom";
import About from "../pages/CustomerPages/About";
import Blog from "../pages/CustomerPages/Blog";
import Cart from "../pages/CustomerPages/Cart";
import Checkout from "../pages/CustomerPages/Checkout";
import CompareProduct from "../pages/CustomerPages/CompareProduct";
import Contact from "../pages/CustomerPages/Contact";
import Forgotpassword from "../pages/CustomerPages/Forgotpassword";
import Home from "../pages/CustomerPages/Home";
import Login from "../pages/CustomerPages/Login";
import OrderDetail from "../pages/CustomerPages/OrderDetail";
import Orders from "../pages/CustomerPages/Orders";
import OurStore from "../pages/CustomerPages/OurStore";
import Profile from "../pages/CustomerPages/Profile";
import Signup from "../pages/CustomerPages/Signup";
import SingleBlog from "../pages/CustomerPages/SingleBlog";
import SingleProduct from "../pages/CustomerPages/SingleProduct";
import Wishlist from "../pages/CustomerPages/Wishlist";
import { OpenRoutes } from "../routing/OpenRoute";
import { PrivateRoutes } from "../routing/PrivateRoute";
import ResetPassword from "../pages/CustomerPages/resetpassword";
import Layout from "../components/Layout";
import UpdatePassword from "pages/CustomerPages/updatePassword";
import SingleCollection from "pages/CustomerPages/SingleCollection";


function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product" element={<OurStore />} />
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="collection/:id" element={<SingleCollection />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="blog/:id" element={<SingleBlog />} />
        <Route path="compareproduct" element={<CompareProduct />} />
        <Route path="reset-password/:id" element={<ResetPassword />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        <Route
          path="wishlist"
          element={
            <PrivateRoutes>
              <Wishlist />
            </PrivateRoutes>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />

        <Route
          path="signup"
          element={
            <OpenRoutes>
              <Signup />
            </OpenRoutes>
          }
        />
        <Route
          path="cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />

        <Route
          path="my-orders"
          element={
            <PrivateRoutes>
              <Orders />
            </PrivateRoutes>
          }
        />
        <Route
          path="order/:id"
          element={
            <PrivateRoutes>
              <OrderDetail />
            </PrivateRoutes>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="update-password"
          element={
            <PrivateRoutes>
              <UpdatePassword />
            </PrivateRoutes>
          }
        />
        <Route
          path="checkout"
          element={
            <PrivateRoutes>
              <Checkout />
            </PrivateRoutes>
          }
        />
      </Route>
    </Routes>
  );
}

export default CustomerRoutes;
