const DropdownLink = ({ icon, text, onClick }) => {
  return (
    <div
      className={
        "h-10 dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight rounded-lg flex gap-2 items-center dark:text-text text-textLight font-semibold text-xl px-2"
      }
      onClick={onClick}
    >
      <div className={"w-10 h-10 grid place-items-center text-3xl"}>{icon}</div>
      <h2>{text}</h2>
    </div>
  );
};

export default DropdownLink;
