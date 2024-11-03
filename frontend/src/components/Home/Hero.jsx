import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ imageSrc, title, description }) => {
  return (
    <div className="text-center py-20 bg-gray-100">
      <div className="container mx-auto ">
        <img 
          src={imageSrc}
          alt="Books"
          className="w-full h-96 object-cover rounded-lg mb-8"	  
        />
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8">{description}</p>
      </div>
    </div>
  );
};

Hero.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Hero;