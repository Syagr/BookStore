import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const navigate = useNavigate();
  const [cartBooks, setCartBooks] = useState([]); // Initialize with an empty array
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchCartBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-cart-books', { headers });
        setCartBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setError('Failed to fetch cart.');
        setLoading(false);
      }
    };
    fetchCartBooks();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put('http://localhost:1000/api/v1/remove-book-from-cart', { bookid }, { headers });
      console.log(response.data);
      setCartBooks((prevCart) => prevCart.filter(item => item._id !== bookid));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  useEffect(() => {
    if (cartBooks.length > 0) {
      const totalAmount = cartBooks.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cartBooks]);

  const placeOrder = async () => {
    try {
      const response = await axios.post('http://localhost:1000/api/v1/place-order', {}, { headers });
      alert(response.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  if (loading) return <Loader timeout={10000} />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {cartBooks.length === 0 ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Cart</h2>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartBooks.map((item) => (
              <div key={item._id} className="flex-shrink-0 w-full">
                <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
                  <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-700">{item.desc.slice(0, 100)}...</p>
                    <h2 className="text-lg font-bold">{item.price} UAH</h2>
                  </div>
                  <button onClick={() => deleteItem(item._id)} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                    <AiFillDelete />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Total amount: {total} UAH</h2>
            <h3 className="text-lg">{cartBooks.length} books</h3>
            <button onClick={placeOrder} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              Place your order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;