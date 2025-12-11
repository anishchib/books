// Navbar.jsx — Title, Search Bar, and Book Count Display
import React, { useEffect } from "react";
import "./Navbar.css";

export default function NavBar({ author, setAuthor, count = 0 }) {
  const [input, setInput] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (onSearch) onSearch(input.trim());
    console.log(input.trim());
    setAuthor(input.trim());
  };

  return (
    <nav className="navbar">
      <h1 className="nav-title">{`Searching for ${author}`}</h1>

      <form className="nav-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Authors for titles..."
          value={input}
          //onChange={(e) => setAuthor(e.target.value)}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <p className="nav-count">Books found: {count}</p>
    </nav>
  );
}
