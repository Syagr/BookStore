import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(Data).some(field => field === '')) {
        alert('Please fill all the fields');
      } else {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/update-book/${id}`,
          Data,
          { headers }
        );
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      console.error('Failed to update book:', error);
      alert(error.response?.data?.message || 'An error occurred while updating the book.');
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-book-by-id/${id}`);
        setData(response.data.book);
      } catch (error) {
        console.error('Failed to fetch book:', error);
        setError('Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Update Book</h2>
      <form onSubmit={submit} className="bg-white p-6 rounded shadow-md w-full md:w-1/2 mx-auto">
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            name="url"
            value={Data.url}
            onChange={change}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={Data.title}
            onChange={change}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={Data.author}
            onChange={change}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="text"
            name="price"
            value={Data.price}
            onChange={change}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700 font-semibold mb-2">Description</label>
          <input
            type="text"
            name="desc"
            value={Data.desc}
            onChange={change}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 font-semibold mb-2">Language</label>
          <input
            type="text"
            name="language"
            value={Data.language}
            onChange={change}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;