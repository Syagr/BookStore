import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', url: '/' },
    { name: 'All Books', url: '/all-books' },
    { name: 'Cart', url: '/cart' },
    { name: 'Profile', url: '/profile' },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Filter links based on user role
  const filteredLinks = links.filter(link => {
    if (!isLoggedIn && link.name === 'Profile') return false;
    if (isLoggedIn) {
      if (role === 'user' && link.name === 'Admin Profile') return false;
      if (role === 'admin' && (link.name === 'Profile' || link.name === 'Cart')) return false;
    }
    return true;
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-zinc-800 text-white px-8 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-10 mr-4"
            src="https://img.icons8.com/ios/50/000000/book.png"
            alt="book"
          />
          <h1 className="text-3xl font-bold">Book Store</h1>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-zinc-500 hover:border-zinc-500"
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-4 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow lg:flex lg:space-x-4">
            {filteredLinks.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-zinc-500"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0 justify-center items-center">
            {isLoggedIn && role === 'admin' && (
              <Link to="/profile" className="block lg:inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-32 text-center">
                Admin Panel
              </Link>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/LogIn" className="block lg:inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-32 text-center">
                  LogIn
                </Link>
                <Link to="/SignUp" className="block lg:inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-32 text-center">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;