import { diceData } from "@/lib/diceData";

export default function DiceSelector({ onSelect }: { onSelect: (dice: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {diceData.map((dice) => (
        <button
          key={dice.type}
          onClick={() => onSelect(dice.type)}
          className="flex flex-col items-center justify-center"
        >
          <img src={dice.svg} alt={dice.type} className="w-12 h-12" />
          <span className="text-sm mt-1">{dice.type}</span>
        </button>
      ))}
    </div>
  );
}
