import { useCallback, useEffect, useRef, useState } from 'react';

const COUNTDOWN_TIME = 5;

interface SpinButtonProps {
  onClick: () => void;
}

export default function SpinButton({ onClick }: SpinButtonProps) {
  const defaultImage = '/assets/buttons/spin-mouse-up.png';
  const pressedImage = '/assets/buttons/spin-mouse-down.png';
  const [image, setImage] = useState(defaultImage);
  const [countdown, setCountdown] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback(() => {
    setCountdown(COUNTDOWN_TIME);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setCountdown(null);
      setImage(defaultImage);
      return;
    }
    timerRef.current = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown]);

  function onSpin() {
    onClick();
    startCountdown();
  }

  return (
    <button
      onClick={onSpin}
      className="relative max-h-full max-w-full border-0 bg-transparent p-0"
      onMouseDown={() => setImage(pressedImage)}
      onMouseUp={() => setImage(pressedImage)}
      onTouchStart={() => setImage(pressedImage)}
      onTouchEnd={() => setImage(defaultImage)}
    >
      <img className="max-h-full w-full" src={image} alt="Spin" />
      {countdown !== null && countdown > 0 && (
        <img
          className="absolute bottom-[calc(50%-6px)] left-1/2 h-[19px] -translate-x-1/2 -translate-y-1/2"
          src={`/assets/buttons/count-text/${countdown}.png`}
          alt={`${countdown}`}
        />
      )}
    </button>
  );
}
