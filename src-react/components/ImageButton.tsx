import { useState } from 'react';

interface ImageButtonProps {
  defaultImage: string;
  pressedImage: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  label?: { src: string; alt: string; className?: string };
  children?: React.ReactNode;
}

export default function ImageButton({
  defaultImage,
  pressedImage,
  onClick,
  className = '',
  style,
  label,
  children,
}: ImageButtonProps) {
  const [image, setImage] = useState(defaultImage);

  return (
    <button
      onClick={onClick}
      className={`border-0 p-0 bg-transparent ${className}`}
      style={style}
      onMouseDown={() => setImage(pressedImage)}
      onMouseUp={() => setImage(defaultImage)}
      onTouchStart={() => setImage(pressedImage)}
      onTouchEnd={() => setImage(defaultImage)}
    >
      <img className="w-100" src={image} alt="Button" />
      {label && (
        <img
          className={label.className || ''}
          src={label.src}
          alt={label.alt}
          style={{ position: 'absolute', left: '50%', bottom: 'calc(50% - 6px)', transform: 'translate(-50%, -50%)', height: 19 }}
        />
      )}
      {children}
    </button>
  );
}
