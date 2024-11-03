import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourite }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  };

  const handleRemoveBook = async (e) => {
    e.stopPropagation(); // Prevent Link navigation
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.delete(
        'http://localhost:1000/api/v1/remove-book-from-favourite',
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Failed to remove from favourites:', error);
      setError('Failed to remove from favourites. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/view-book-details/${data._id}`} className="block border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
      <div className="border p-4 rounded-lg">
        <img src={data.url} alt={data.title} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-4">
          <h3 className="font-bold text-lg">{data.title}</h3>
          <p className="text-gray-700">{data.author}</p>
          <p className="text-gray-900 font-semibold">${data.price}</p>
        </div>
      </div>
      {favourite && (
        <button
          onClick={handleRemoveBook}
          className={`block w-full bg-red-500 text-white py-2 rounded-b-lg mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Removing...' : 'Remove from favourite'}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
    </Link>
  );
};

export default BookCard;