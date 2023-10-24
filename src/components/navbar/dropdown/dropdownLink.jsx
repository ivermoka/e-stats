const DropdownLink = ({ icon, text, onClick }) => {
  return (
    <button
      className={
        "h-10 dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight rounded-md flex gap-2 items-center dark:text-text text-textLight font-semibold text-xl px-2 w-full"
      }
      onClick={onClick}
      type="button"
    >
      <div className={"w-10 h-10 grid place-items-center text-3xl"}>{icon}</div>
      <h2>{text}</h2>
    </button>
  );
};

export default DropdownLink;
