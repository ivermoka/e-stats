const SearchBar = () => {
  return (
    <div
      className={
        "mt-24 bg-primary h-14 w-full rounded-lg shadow-md shadow-accent grid place-items-center p-2"
      }
    >
      <input
        className={
          "w-full h-full rounded-lg p-2 text-text bg-bg/75 duration-300 focus:bg-red-400"
        }
        placeholder={"Søk etter lag"}
      />
    </div>
  );
};

export default SearchBar;
