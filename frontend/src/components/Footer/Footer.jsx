const Footer = () => {
	return (
		<footer className="bg-zinc-800 text-white px-8 py-4 mt-auto">
			<div className="container mx-auto">
				<div className="flex justify-between items-center">
					<div className="flex gap-4">
						<a href="https://github.com" className="hover:text-zinc-500" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-github"></i>
						</a>
						<a href="https://linkedin.com" className="hover:text-zinc-500" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-linkedin"></i>
						</a>
						<a href="https://instagram.com" className="hover:text-zinc-500" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-instagram"></i>
						</a>
					</div>
					<div className="flex gap-4">
						<a href="/privacy-policy" className="hover:text-zinc-500">
							Privacy Policy
						</a>
						<a href="/terms-of-service" className="hover:text-zinc-500">
							Terms of Service
						</a>
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