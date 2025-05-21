import { useEffect, useState } from "react";
import DiceSelector from "./components/DiceSelector";
import SelectionSidebar from "./components/SelectionSidebar";

function App() {
  const [rolls, setRolls] = useState<string[]>([]);
  const [selectedDice, setSelectedDice] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState("Jugador");

  // Obtener nombre del jugador de Owlbear
  useEffect(() => {
    window.owr?.context.get().then((ctx: any) => {
      setPlayerName(ctx?.player?.name || "Jugador desconocido");
    });
  }, []);

  // Escuchar eventos de otros jugadores
  useEffect(() => {
    const unsubscribe = window.owr?.events.subscribe("dice-roll", (event: any) => {
      const { player, type, result } = event.payload;
      setRolls((prev) => [...prev, `${player} tiró ${type}: ${result}`]);
    });

    return () => unsubscribe?.();
  }, []);

  // Lógica de selección y tirada
  const handleSelect = (diceType: string) => {
    const result = Math.floor(Math.random() * parseInt(diceType.slice(1))) + 1;
    setRolls([...rolls, `${playerName} tiró ${diceType}: ${result}`]);
    setSelectedDice([...selectedDice, diceType]);

    window.owr?.events.broadcast({
      action: "dice-roll",
      payload: {
        player: playerName,
        type: diceType,
        result,
      },
    });
  };

  const clearRolls = () => {
    setRolls([]);
    setSelectedDice([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Bienvenido, {playerName}</h1>
      <DiceSelector onSelect={handleSelect} />
      <button
        onClick={clearRolls}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Limpiar
      </button>

      <div className="mt-6">
        <h2 className="text-lg mb-2">Resultados:</h2>
        <ul>
          {rolls.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <SelectionSidebar selectedDice={selectedDice} />
    </div>
  );
}

export default App;
