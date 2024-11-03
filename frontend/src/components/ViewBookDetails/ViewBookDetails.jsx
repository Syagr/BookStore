import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart, FaShoppingCart, FaEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.book); // Ensure to set the correct data
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
        setError('Failed to fetch book details.');
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put('http://localhost:1000/api/v1/add-book-to-favourite', { bookid: id }, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to add to favourites:', error);
      alert('Failed to add to favourites.');
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put('http://localhost:1000/api/v1/add-book-to-cart', { bookid: id }, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add to cart.');
    }
  };

  const DeleteBook = async () => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/v1/delete-book/${id}`, { headers });
      alert(response.data.message);
      navigate('/all-books');
    } catch (error) {
      console.error('Failed to delete the book:', error);
      alert('Failed to delete the book.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Book Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <img src={Data.url} alt={Data.title} className="w-full h-48 object-cover" />
        {isLoggedIn && role === 'user' && (
          <div className="flex flex-col gap-2">
            <button onClick={handleFavourite} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              <FaHeart />
              <span>Favourites</span>
            </button>
            <button onClick={handleCart} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
        {isLoggedIn && role === 'admin' && (
          <div className="flex flex-col gap-2">
            <Link to={`/updateBook/${id}`} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">
              <FaEdit /> <span>Edit</span>
            </Link>
            <button onClick={DeleteBook} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              <MdOutlineDelete /> <span>Delete</span>
            </button>
          </div>
        )}
        <div className="col-span-2">
          <h3 className="font-bold">{Data.title}</h3>
          <p>{Data.author}</p>
          <p>{Data.desc}</p>
          <div className="flex items-center gap-2">
            <GrLanguage />
            <span>{Data.language}</span>
          </div>
          <p className="font-bold">Price: {Data.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;