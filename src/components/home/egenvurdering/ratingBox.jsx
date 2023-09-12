const RatingBox = ({ number, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} h-10 w-10 border-2 border-text rounded-md grid place-items-center font-bold text-xl`}
    >
      {number}
    </div>
  );
};

export default RatingBox;
