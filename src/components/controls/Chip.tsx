interface ChipProps {
  value: number;
  selectedValue: number;
  onClick: () => void;
}

export default function Chip({ value, selectedValue, onClick }: ChipProps) {
  const isSelected = selectedValue === value;

  return (
    <button
      className={`w-[55px] rounded-full border-0 bg-transparent p-0 transition-transform ${
        isSelected ? 'scale-110 shadow-[0_0_5px_2px_rgb(255,255,255)]' : ''
      }`}
      onClick={onClick}
    >
      <img
        className="h-full w-full"
        src={`/assets/buttons/chips/chip-${value}.png`}
        alt={`Chip ${value}`}
      />
    </button>
  );
}
