import { useState } from "react";
import { DiceDisplay } from "./DiceDisplay";

const DICE_TYPES = [4, 6, 8, 10, 12, 20];

export default function DiceRollerApp() {
  const [selectedDice, setSelectedDice] = useState<{ [key: number]: number }>({});
  const [playerName, setPlayerName] = useState("Jugador 1");
  const [rollHistory, setRollHistory] = useState<
    Array<{ player: string; dice: { type: number; result: number }[]; total: number }>
  >([]);

  const handleDieChange = (type: number, value: number) => {
    setSelectedDice((prev) => ({ ...prev, [type]: value }));
  };

  const rollDice = () => {
    const rolledDice: { type: number; result: number }[] = [];
    let total = 0;

    for (const [type, count] of Object.entries(selectedDice)) {
      const dieType = parseInt(type);
      for (let i = 0; i < count; i++) {
        const result = Math.floor(Math.random() * dieType) + 1;
        rolledDice.push({ type: dieType, result });
        total += result;
      }
    }

    setRollHistory((prev) => [
      { player: playerName, dice: rolledDice, total },
      ...prev,
    ]);
  };

  const clearSelection = () => {
    setSelectedDice({});
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Tiradas de Dados</h1>

      <input
        type="text"
        className="border p-2 rounded mb-4 w-full"
        placeholder="Nombre del jugador"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4 mb-4">
        {DICE_TYPES.map((type) => (
          <div key={type} className="flex flex-col items-center">
            <label className="font-semibold">D{type}</label>
            <input
              type="number"
              min={0}
              className="border p-1 w-16 text-center"
              value={selectedDice[type] || 0}
              onChange={(e) => handleDieChange(type, parseInt(e.target.value) || 0)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={rollDice}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Lanzar Dados
        </button>
        <button
          onClick={clearSelection}
          className="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500"
        >
          Limpiar
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Historial</h2>
        <ul className="space-y-2">
          {rollHistory.map((entry, index) => (
            <li
              key={index}
              className="border rounded p-2 text-left bg-white shadow"
            >
              <strong>{entry.player}</strong>: Total {entry.total}
              <div className="flex flex-wrap mt-1 gap-2">
                {entry.dice.map((die, idx) => (
                  <DiceDisplay key={idx} type={die.type} value={die.result} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}