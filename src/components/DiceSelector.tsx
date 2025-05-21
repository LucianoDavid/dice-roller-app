import { useState } from "react";

// Asegúrate de tener estas imágenes en /public/dice/
const diceTypes = [
  { type: "d4", img: "/dice/d4.svg" },
  { type: "d6", img: "/dice/d6.svg" },
  { type: "d8", img: "/dice/d8.svg" },
  { type: "d10", img: "/dice/d10.svg" },
  { type: "d12", img: "/dice/d12.svg" },
  { type: "d20", img: "/dice/d20.svg" },
];

interface DiceSelectorProps {
  selectedDice: string[];
  setSelectedDice: (dice: string[]) => void;
}

export default function DiceSelector({ selectedDice, setSelectedDice }: DiceSelectorProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const addDie = (type: string) => {
    const updatedCounts = { ...counts, [type]: (counts[type] || 0) + 1 };
    setCounts(updatedCounts);
    setSelectedDice([...selectedDice, type]);
  };

  const removeDie = (type: string) => {
    if ((counts[type] || 0) > 0) {
      const updatedCounts = { ...counts, [type]: counts[type] - 1 };
      setCounts(updatedCounts);

      const updatedDice = [...selectedDice];
      const indexToRemove = updatedDice.lastIndexOf(type);
      if (indexToRemove !== -1) {
        updatedDice.splice(indexToRemove, 1);
      }
      setSelectedDice(updatedDice);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {diceTypes.map(({ type, img }) => (
        <div key={type} className="flex flex-col items-center">
          <img
            src={img}
            alt={type}
            className="w-16 h-16 cursor-pointer hover:scale-105 transition"
            onClick={() => addDie(type)}
          />
          <div className="flex items-center space-x-2 mt-1">
            <button
              onClick={() => removeDie(type)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              -
            </button>
            <span className="text-sm font-bold">{counts[type] || 0}</span>
            <button
              onClick={() => addDie(type)}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
