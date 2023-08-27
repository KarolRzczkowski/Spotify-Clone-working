import React from "react";

interface SearchProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Dodaj prop onClick
}

const Search: React.FC<SearchProps> = ({ children, className, onClick }) => {
  return (
    <div onClick={onClick ? onClick : undefined} className={className}>
      {children}
    </div>
  );
};

export default Search;
