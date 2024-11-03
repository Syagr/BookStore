import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-user-information`, { headers });
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user information:', err);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto mt-8">
      {error && <div className="text-red-500">Error: {error}</div>}
      {!profile && <Loader />}
      {profile && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Sidebar data={profile} />
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Profile;