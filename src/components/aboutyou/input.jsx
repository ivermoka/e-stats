const Input = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-xl italic">{label}</h2>
      <input className="w-60" placeholder={placeholder} />
    </div>
  );
};

export default Input;
