import { diceData } from "@/lib/diceData";
import { useState } from "react";

export default function DiceSelector({ onSelect }: { onSelect: (dice: string) => void }) {
  const [counter, setCounter] = useState<Record<string, number>>({});

  const handleClick = (type: string) => {
    onSelect(type);
    setCounter((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {diceData.map((dice) => (
        <button
          key={dice.type}
          onClick={() => handleClick(dice.type)}
          className="relative flex flex-col items-center justify-center"
        >
          <img src={dice.svg} alt={dice.type} className="w-12 h-12" />
          <span className="text-sm mt-1">{dice.type}</span>
          {counter[dice.type] && (
            <span className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded-full">
              {counter[dice.type]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
