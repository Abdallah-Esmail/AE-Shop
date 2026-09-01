import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="search for products"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBox;
