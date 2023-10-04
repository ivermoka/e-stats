const Dropdown = ({ setStatsDropdownOpen }) => {
  const buttonStyle =
    "dark:bg-primary bg-primaryLight p-2 rounded-lg shadow-md dark:shadow-accent shadow-accentLight text-textLight dark:text-text text-center w-full";
  return (
    <div
      className={`absolute w-32 ml-1 -mt-4 rounded-b-2 bg-primaryLight dark:bg-primary shadow-md shadow-accentLight dark:shadow-accent rounded-b-lg`}
    >
      <button
        onClick={() => setStatsDropdownOpen(false)}
        className={buttonStyle}
      >
        Mat
      </button>
      <button
        onClick={() => setStatsDropdownOpen(false)}
        className={buttonStyle}
      >
        Søvn
      </button>
      <button
        onClick={() => setStatsDropdownOpen(false)}
        className={buttonStyle}
      >
        Motivasjon
      </button>
      <button
        onClick={() => setStatsDropdownOpen(false)}
        className={buttonStyle}
      >
        Fysisk
      </button>
      <button
        onClick={() => setStatsDropdownOpen(false)}
        className={buttonStyle}
      >
        Psykisk
      </button>
      <button
        onClick={() => setStatsDropdownOpen(false)}
        className={buttonStyle}
      >
        Spilt
      </button>
    </div>
  );
};

export default Dropdown;
