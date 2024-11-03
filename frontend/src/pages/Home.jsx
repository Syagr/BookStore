import React from 'react';
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Hero
        imageSrc="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        title="Welcome to Book Store"
        description="Find your next great read"
      />
      {/* Consider adding a loading state and error handling in RecentlyAdded */}
      <RecentlyAdded />
    </div>
  );
};

export default Home;
