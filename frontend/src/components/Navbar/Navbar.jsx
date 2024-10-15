const Navbar = () => {
  const links = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about-us' },
    { name: 'All Books', url: '/all-books' },
    { name: 'Cart', url: '/cart' },
    { name: 'Profile', url: '/profile' },
  ];

  return (
    <div className="flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
      <div className="flex items-center">
        <img
          className="h-10 me-4"
          src="https://img.icons8.com/ios/50/000000/book.png"
          alt="book"
        />
        <h1 className="text-3xl font-bold">Book Store</h1>
      </div>
      <div className="nav-links-bookstore flex gap-4">
        <div className="flex gap-4">
          {links.map((link, index) => (
            <a key={index} href={link.url} className="hover:text-zinc-500">
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          <a href="/login" className="hover:text-zinc-500">
            logIn
          </a>
          <a href="/register" className="hover:text-zinc-500">
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;