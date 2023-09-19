const Members = () => {
  const boxStyle = "bg-primary p-2 rounded-lg shadow-md shadow-accent";
  return (
    <div className={"flex flex-col gap-4 text-text text-2xl font-semibold"}>
      <div className={`${boxStyle} text-3xl`}>Trener</div>
      <div className={`${boxStyle} mx-4`}>Navn på trener</div>
      <div className={`${boxStyle} text-3xl`}>Spillere</div>
      <div className={"flex flex-col px-4 gap-4"}>
        <div className={`${boxStyle}`}>Spiller 1</div>
        <div className={`${boxStyle}`}>Spiller 2</div>
        <div className={`${boxStyle}`}>Spiller 3</div>
        <div className={`${boxStyle}`}>Spiller 4</div>
        <div className={`${boxStyle}`}>Spiller 5</div>
      </div>
      <div className={`${boxStyle} text-3xl`}>Andre</div>
      <div className={"flex flex-col px-4 gap-4"}>
        <div className={`${boxStyle}`}>Sub</div>
        <div className={`${boxStyle}`}>Extra trener</div>
      </div>
    </div>
  );
};

export default Members;
