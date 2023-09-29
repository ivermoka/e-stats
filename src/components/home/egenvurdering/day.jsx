const Dag = () => {
  const date = new Date().toLocaleDateString();
  return (
    <div className="rounded-lg dark:text-text text-textLight font-bold p-2 my-4 w-40 text-center italic dark:bg-primary bg-primaryLight shadow-md dark:shadow-accent shadow-accentLight">
      {date}
    </div>
  );
};

export default Dag;
