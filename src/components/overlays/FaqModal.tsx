import { useState } from 'react';
import WinConditions from '../game/WinConditions';
import './FaqModal.scss';

interface FaqModalProps {
  className?: string;
}

export default function FaqModal({ className }: FaqModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState('/assets/buttons/faq-mouse-up.png');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`border-0 bg-transparent p-0 ${className || ''}`}
        onMouseDown={() => setImage('/assets/buttons/faq-mouse-up.png')}
        onMouseUp={() => setImage('/assets/buttons/faq-mouse-up.png')}
      >
        <img className="w-full" src={image} alt="FAQ" />
        <img
          className="absolute bottom-[calc(50%-6px)] left-1/2 h-[19px] -translate-x-1/2 -translate-y-1/2"
          src="/assets/images/exclamation-icon.png"
          alt="exclamation"
        />
      </button>

      {isOpen && (
        <div className="faq-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="faq-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="exit-button absolute right-4 top-4 rounded-full border-0 p-0"
              onClick={() => setIsOpen(false)}
            />
            <div className="mt-3 flex w-full flex-col items-center text-white">
              <h3>Win Conditions</h3>
              <WinConditions />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
