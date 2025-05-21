export default function SelectionSidebar({ selectedDice }: { selectedDice: string[] }) {
  return (
    <div className="fixed right-0 top-0 p-4 w-32 bg-gray-100 h-full overflow-y-auto shadow-md">
      <h2 className="text-sm font-bold mb-2">Seleccionados</h2>
      <ul>
        {selectedDice.map((d, i) => (
          <li key={i} className="text-xs mb-1">{d}</li>
        ))}
      </ul>
    </div>
  );
}
