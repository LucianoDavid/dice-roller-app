// src/components/DiceResult.tsx
import React from "react";

interface DiceResultProps {
  results: { type: string; value: number }[];
}

const DiceResult: React.FC<DiceResultProps> = ({ results }) => {
  if (results.length === 0) return null;

  const total = results.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-4 rounded-xl shadow bg-gray-100">
      <h2 className="text-lg font-bold mb-2">Resultado de la tirada</h2>
      <ul className="list-disc list-inside text-sm">
        {results.map((result, index) => (
          <li key={index}>
            {result.type}: {result.value}
          </li>
        ))}
      </ul>
      <p className="mt-2 font-semibold">Total: {total}</p>
    </div>
  );
};

export default DiceResult;
