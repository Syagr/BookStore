import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-recent-books`);
        setData(response.data.books || []);
      } catch (err) {
        setError('Failed to fetch recent books. Please try again later.');
        console.error('Failed to fetch recent books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 mb-20">
      <h2 className="text-3xl font-bold mb-4 text-center">Recently Added</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {data.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
              <img src={book.url} alt={book.title} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-gray-700 mb-2">{book.author}</p>
              <p className="text-gray-900 font-semibold mb-2">${book.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-700 mb-10">
          <p>No recent books available.</p>
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;