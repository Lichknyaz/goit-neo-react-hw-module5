import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;

    if (query.trim() === "") {
      toast("Please enter a movie to search");
      return;
    }
    onSearch(query);
    e.target.reset();
  };

  return (
    <div className={css.header}>
      <Toaster position="top-center" reverseOrder={false} />
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.icon}>
          🔍
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          name="query"
        />
      </form>
    </div>
  );
}

export default SearchBar;
