import { useCallback, useEffect, useRef, useState } from 'react';
import './SpinButton.scss';

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
      className="border-0 p-0 bg-transparent spin-button-wrapper"
      onMouseDown={() => setImage(pressedImage)}
      onMouseUp={() => setImage(pressedImage)}
      onTouchStart={() => setImage(pressedImage)}
      onTouchEnd={() => setImage(defaultImage)}
    >
      <img className="w-100" src={image} alt="Spin" />
      {countdown !== null && countdown > 0 && (
        <img
          className="count-down-number"
          src={`/assets/buttons/count-text/${countdown}.png`}
          alt={`${countdown}`}
        />
      )}
    </button>
  );
}
