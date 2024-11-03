import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [values, setValues] = useState({ username: '', email: '', address: '' });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-user-information`, { headers });
        setProfileData(response.data);
        setValues({ 
          username: response.data.username,
          email: response.data.email,
          address: response.data.address 
        });
      } catch (error) {
        console.error('Error fetching user information:', error);
        setError('Error fetching user information.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const submitChanges = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/update-user-information`, values, { headers });
      console.log(response.data);
      alert('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-lg bg-white shadow-lg mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Username</label>
          <input
            type="text"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Address</label>
          <input
            type="text"
            value={values.address}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            onClick={submitChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;