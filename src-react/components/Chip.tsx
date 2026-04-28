interface ChipProps {
  value: number;
  selectedValue: number;
  onClick: () => void;
}

export default function Chip({ value, selectedValue, onClick }: ChipProps) {
  const isSelected = selectedValue === value;

  return (
    <button
      className={`border-0 rounded-circle p-0 bg-transparent${isSelected ? ' selected-chip' : ''}`}
      style={{ width: 55 }}
      onClick={onClick}
    >
      <img
        className="w-100 h-100"
        src={`/assets/buttons/chips/chip-${value}.png`}
        alt={`Chip ${value}`}
      />
    </button>
  );
}
