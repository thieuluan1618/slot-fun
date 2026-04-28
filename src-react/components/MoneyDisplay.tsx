import './MoneyDisplay.scss';

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
    <div className="w-100 d-flex align-items-center justify-content-between" style={style}>
      {imgSrc && <img style={{ height: 22 }} className="label-image" src={imgSrc} alt="label" />}
      <span className="money">{formatted}</span>
    </div>
  );
}
