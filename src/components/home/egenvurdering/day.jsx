const Dag = ({ text }) => {
  const date = new Date().toLocaleDateString("no-NO");
  return (
    <div className="rounded-lg dark:text-text text-textLight font-bold p-2 my-4 px-4 text-center italic dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight">
      {text} - {date}
    </div>
  );
};

export default Dag;
