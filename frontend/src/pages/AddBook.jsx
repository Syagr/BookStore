import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const AddBook = () => {
  const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      if (Object.values(Data).some(field => field === '')) {
        setErrorMessage('Please fill all the fields');
        setLoading(false);
        return;
      }

      if (isNaN(Data.price) || Number(Data.price) <= 0) {
        setErrorMessage('Please enter a valid price');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/add-book`, Data, { headers });
      setData({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Failed to add book:', error);
      setErrorMessage('Failed to add the book. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 rounded-lg bg-white shadow-lg mt-20" style={{ width: '90%', height: '90%' }}>
      <h2 className="text-3xl font-bold mb-6 text-center">Add Book</h2>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="w-full mx-auto">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="url" className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="text"
              name="url"
              value={Data.url}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={Data.title}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={Data.author}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={Data.price}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="desc" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="desc"
              value={Data.desc}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="language" className="block text-gray-700 font-semibold mb-2">Language</label>
            <input
              type="text"
              name="language"
              value={Data.language}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {loading ? <Loader /> : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;