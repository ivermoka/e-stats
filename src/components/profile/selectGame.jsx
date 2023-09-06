const SelectGame = ({ className }) => {
  return (
    <select name="game" className={className}>
      <option value="CS:GO">CS:GO</option>
      <option value="League of Legends">League of Legends</option>
      <option value="Dota 2">Dota 2</option>
      <option value="Valorant">Valorant</option>
      <option value="Overwatch">Overwatch</option>
    </select>
  );
};

export default SelectGame;
