const Search = ({ search, setSearch, setLoading }) => {
  // const [localSearch, setLocalSearch] = useState("");
  return (
    <>
      <div className="search hover:scale-103 transition duration-300">
        <div>
          <img src="../../public/search.svg" alt="Search Icon" />
          <input
            type="text"
            placeholder="Search for a movie"
            // controlled component pattern, asa the onChange event updates the state of the search input -->  calling the setSearch function to update the search state in the parent component (Home.jsx) whenever the user types in the input field.
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setLoading(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
