import d4 from "./assets/d4.svg";
import d6 from "./assets/d6.svg";
import d8 from "./assets/d8.svg";
import d10 from "./assets/d10.svg";
import d12 from "./assets/d12.svg";
import d20 from "./assets/d20.svg";

const diceImages: { [key: number]: string } = {
  4: d4,
  6: d6,
  8: d8,
  10: d10,
  12: d12,
  20: d20,
};

export function DiceDisplay({ type, value }: { type: number; value: number }) {
  return (
    <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded shadow">
      <img src={diceImages[type]} alt={`D${type}`} className="w-6 h-6" />
      <span className="font-semibold">{value}</span>
    </div>
  );
}