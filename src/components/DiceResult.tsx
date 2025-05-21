// src/components/DiceResult.tsx
import React from "react";

interface DiceResultProps {
  playerName: string;
  diceType: string;
  rollResult: number;
}

const DiceResult: React.FC<DiceResultProps> = ({ playerName, diceType, rollResult }) => {
  return (
    <div style={{ marginTop: "10px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}>
      <strong>{playerName}</strong> tiró <em>{diceType}</em>: <span>{rollResult}</span>
    </div>
  );
};

export default DiceResult;
