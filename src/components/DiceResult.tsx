// src/components/DiceResult.tsx
import React from "react";

interface DiceResultProps {
  result: number;
  diceType: string;
  playerName: string;
}

const DiceResult: React.FC<DiceResultProps> = ({ result, diceType, playerName }) => {
  return (
    <div>
      <p>
        {playerName} tiró {diceType}: {result}
      </p>
    </div>
  );
};

export default DiceResult;
