const DropdownLink = ({ icon, text, onClick }) => {
  return (
    <div
      className={
        "h-10 bg-primary shadow-md shadow-accent rounded-lg flex gap-2 items-center text-text font-semibold text-xl px-2"
      }
      onClick={onClick}
    >
      <div className={"w-10 h-10 grid place-items-center text-3xl"}>{icon}</div>
      <h2>{text}</h2>
    </div>
  );
};

export default DropdownLink;
