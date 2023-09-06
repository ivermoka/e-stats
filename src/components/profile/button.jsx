const Button = ({ onClick, text }) => {
  return (
    <button
      className="bg-bg border-primary border-2 rounded-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
