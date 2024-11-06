import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-orders', { headers });
        console.log('Fetched order history:', response.data); // Debugging line
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setError('Error fetching order history.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put('http://localhost:1000/api/v1/update-order-status', { orderId, status }, { headers });
      alert(response.data.message);
      setOrderHistory(orderHistory.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status.');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {orderHistory.length === 0 ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Order History</h2>
          <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="No Order History" className="mx-auto" />
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">Order History</h2>
          <div className="grid grid-cols-1 gap-4">
            {orderHistory.map((order, i) => (
              <div key={i} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold">Order #{i + 1}</div>
                  <div className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
                </div>
                <div className="text-gray-700 mb-2">Status: 
                  <span className={
                    order.status === 'Order Placed' ? 'text-yellow-500' :
                    order.status === 'Order Canceled' ? 'text-red-500' :
                    'text-green-500'
                  }>
                    {order.status}
                  </span>
                </div>
                <div className="text-gray-700 mb-2">Date: {new Date(order.createdAt).toLocaleString()}</div>
                {role === 'admin' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Order Confirmed')}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Confirm Order
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Order Canceled')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-700">
                    {order.status === 'Order Placed' ? 'Awaiting confirmation...' : order.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;