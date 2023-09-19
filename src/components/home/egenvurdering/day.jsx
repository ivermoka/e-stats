const Dag = () => {
  const date = new Date().toLocaleDateString();
  return (
    <div className="rounded-lg text-text font-bold p-2 my-4 w-40 text-center italic bg-primary shadow-md shadow-accent">
      {date}
    </div>
  );
};

export default Dag;
