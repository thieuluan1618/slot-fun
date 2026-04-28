import { useState } from 'react';
import WinConditions from './WinConditions';
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
        className={`border-0 p-0 bg-transparent ${className || ''}`}
        onMouseDown={() => setImage('/assets/buttons/faq-mouse-up.png')}
        onMouseUp={() => setImage('/assets/buttons/faq-mouse-up.png')}
      >
        <img className="w-100" src={image} alt="FAQ" />
        <img
          className="faq-label"
          src="/assets/images/exclamation-icon.png"
          alt="exclamation"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 'calc(50% - 6px)',
            transform: 'translate(-50%, -50%)',
            height: 19,
          }}
        />
      </button>

      {isOpen && (
        <div className="faq-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="faq-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="exit-button position-absolute rounded-circle p-0 border-0"
              onClick={() => setIsOpen(false)}
              style={{ right: 16, top: 16 }}
            />
            <div className="d-flex flex-column align-items-center text-white w-100 mt-3">
              <h3>Win Conditions</h3>
              <WinConditions />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
