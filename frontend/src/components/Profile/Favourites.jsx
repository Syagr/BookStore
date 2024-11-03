import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-favourite-books', { headers });
        setFavouriteBooks(response.data);
      } catch (error) {
        console.error('Error fetching favourite books:', error);
        setError('Error fetching favourite books.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader timeout={10000} />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {favouriteBooks.length === 0 ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">No Favourite Books</h2>
          <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="No Favourite Books" />
        </div>
      ) : (
        favouriteBooks.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-64 ">
            <BookCard data={item} favourite={true} />
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;