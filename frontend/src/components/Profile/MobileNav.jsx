import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="flex flex-col gap-4">
      {role === 'user' ? (
        <>
          <Link to="/profile" className="text-2xl font-bold">Favourites</Link>
          <div className="flex flex-col gap-2">
            <Link to="/profile/orderHistory" className="text-xl">Order History</Link>
            <Link to="/profile/settings" className="text-xl">Settings</Link>
          </div>
        </>
      ) : role === 'admin' ? (
        <>
          <Link to="/profile" className="text-2xl font-bold">All Orders</Link>
          <div className="flex flex-col gap-2">
            <Link to="/profile/add-book" className="text-xl">Add Book</Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MobileNav;