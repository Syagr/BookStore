import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="bg-gray-100 p-4 rounded">
      <div className="text-center mb-4">
        <img src={data.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-2" />
        <p className="font-bold text-xl">{data.username}</p>
        <p className="text-gray-600">{data.email}</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {role === 'user' ? (
          <>
            <Link to="/profile" className="block border p-4 rounded text-center bg-white hover:bg-gray-200">
              Favourites
            </Link>
            <Link to="/profile/orderHistory" className="block border p-4 rounded text-center bg-white hover:bg-gray-200">
              Order History
            </Link>
            <Link to="/profile/settings" className="block border p-4 rounded text-center bg-white hover:bg-gray-200">
              Settings
            </Link>
          </>
        ) : role === 'admin' ? (
          <>
            <Link to="/profile" className="block border p-4 rounded text-center bg-white hover:bg-gray-200">
              All Orders
            </Link>
            <Link to="/profile/add-book" className="block border p-4 rounded text-center bg-white hover:bg-gray-200">
              Add Book
            </Link>
          </>
        ) : null}
        <button className="block border p-4 rounded text-center bg-white hover:bg-gray-200" onClick={handleLogout}>
          Log Out <FaSignOutAlt className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;