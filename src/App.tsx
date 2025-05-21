import { useEffect, useState } from "react";
import { OBR } from "@owlbear-rodeo/sdk";
import DiceSelector from "./components/DiceSelector";
import DiceResult from "./components/DiceResult";

export default function App() {
  const [playerName, setPlayerName] = useState<string>("Jugador");
  const [selectedDice, setSelectedDice] = useState<string[]>([]);
  const [rollResults, setRollResults] = useState<string[]>([]);

  // Obtener el nombre del jugador desde Owlbear Rodeo
  useEffect(() => {
    OBR.onReady(() => {
      OBR.player.getId().then(async (id) => {
        const player = await OBR.player.getMetadata(id);
        const name = player?.name || "Jugador";
        setPlayerName(name);
      });
    });
  }, []);

  const rollDice = () => {
    const newResults: string[] = [];

    selectedDice.forEach((dice) => {
      const max = parseInt(dice.substring(1));
      const result = Math.floor(Math.random() * max) + 1;
      newResults.push(`${playerName} tiró ${dice}: ${result}`);
    });

    setRollResults([...rollResults, ...newResults]);
    setSelectedDice([]);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-xl space-y-4">
      <h1 className="text-xl font-bold text-center">Bienvenido, {playerName}</h1>

      <DiceSelector selectedDice={selectedDice} setSelectedDice={setSelectedDice} />

      <button
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={rollDice}
        disabled={selectedDice.length === 0}
      >
        Tirar dados
      </button>

      <DiceResult rollResults={rollResults} />
    </div>
  );
}
