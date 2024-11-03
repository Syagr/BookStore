import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [Data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
        setData(response.data.books);
      } catch (error) {
        console.error('Failed to fetch all books:', error);
        setError(error); // Set the error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <Loader timeout={10000} />; // Show loader while fetching

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>; // Display error message
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">All Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(Data) && Data.map((book) => (
          <BookCard key={book._id} data={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;