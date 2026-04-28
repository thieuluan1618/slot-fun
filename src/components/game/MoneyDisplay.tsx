interface MoneyDisplayProps {
  value: number;
  imgSrc?: string;
  style?: React.CSSProperties;
}

export default function MoneyDisplay({ value, imgSrc, style }: MoneyDisplayProps) {
  const formatted = value?.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }) ?? '0';

  return (
    <div className="flex w-full items-center justify-between" style={style}>
      {imgSrc && <img style={{ height: 22 }} src={imgSrc} alt="label" />}
      <span className="money-glow m-0 flex items-center justify-center text-2xl text-[#f0e68c]">
        {formatted}
      </span>
    </div>
  );
}
