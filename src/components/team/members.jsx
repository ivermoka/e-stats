const Members = ({teamUser}) => {
  const boxStyle = "bg-primary p-2 rounded-lg shadow-md shadow-accent";
  return (
      <div className={boxStyle}>{teamUser}</div>
  );
};

export default Members;
