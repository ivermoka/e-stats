const Kommentar = ({ setComment }) => {
  return (
    <div>
      <h2 className="dark:text-text text-textLight text-xl font-bold my-4 italic">
        KOMMENTAR TIL DAGEN
      </h2>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        className="w-full dark:border-primary border-primaryLight border-2 rounded-md text-black"
      ></textarea>
    </div>
  );
};

export default Kommentar;
