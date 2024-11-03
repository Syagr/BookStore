import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import { authActions } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('id') &&
      localStorage.getItem('role')
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route
            index
            element={role === 'user' ? <Favourites /> : <UserOrderHistory />}
          />
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
          {role === 'admin' && (
            <>
              <Route path="add-book" element={<AddBook />} />
              <Route path="updateBook/:id" element={<UpdateBook />} />
            </>
          )}
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} /> 
      </Routes>
      <Footer />
    </div>
  );
};

export default App;