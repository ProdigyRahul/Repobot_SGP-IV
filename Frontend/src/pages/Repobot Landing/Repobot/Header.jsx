// src/components/Repobot/Header.jsx
import React from "react";

const Header = () => {
  return (
    <div className="text-center mb-8 md:mb-16">
      <h1 className="text-3xl md:text-4xl font-semibold text-text-light dark:text-text-dark mb-4">
        How can we <span className="text-primary-light dark:text-primary-dark">assist</span> you today?
      </h1>
      <p className="text-sm md:text-base text-muted-light dark:text-muted-dark max-w-xl mx-auto">
        Get expert guidance powered by AI agents specializing in GitHub Repo. Choose the Repobot that suits your needs and
        start your conversation with ease.
      </p>
    </div>
  );
};

export default Header;