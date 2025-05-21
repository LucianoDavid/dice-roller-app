import { useState } from "react";
import DiceSelector from "./components/DiceSelector";

function App() {
  const [rolls, setRolls] = useState<string[]>([]);

  const handleSelect = (diceType: string) => {
    const result = Math.floor(Math.random() * parseInt(diceType.slice(1))) + 1;
    setRolls([...rolls, `${diceType}: ${result}`]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Dice Roller</h1>
      <DiceSelector onSelect={handleSelect} />
      <div className="mt-6">
        <h2 className="text-lg mb-2">Resultados:</h2>
        <ul>
          {rolls.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
