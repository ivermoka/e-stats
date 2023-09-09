const Kommentar = ({ setComment }) => {
  return (
    <div>
      <h2 className="text-text text-xl font-bold my-4 italic">
        KOMMENTAR TIL DAGEN
      </h2>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        className="w-full border-primary border-2 rounded-md"
      ></textarea>
    </div>
  );
};

export default Kommentar;