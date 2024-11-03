const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white px-8 py-4 fixed bottom-0 w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <a href="https://github.com" className="hover:text-zinc-500" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" className="hover:text-zinc-500" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <div className="text-sm">
            &copy; 2024 Book Store
          </div>
          <div className="text-sm">
            Made by <a href="https://github.com/Syagr" className="hover:text-zinc-500" target="_blank" rel="noopener noreferrer">Syagr</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;