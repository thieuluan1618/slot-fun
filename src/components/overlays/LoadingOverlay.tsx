import './LoadingOverlay.scss';

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <h1 className="loading-title">SANDS OF ETERNITY</h1>
        <p className="loading-subtitle">Uncover the secrets of the pharaohs</p>
        <div className="ankh-container">
          <img src="/assets/symbols/Ankh.svg" alt="Ankh" className="ankh" />
        </div>
        <div className="loading-bar">
          <div className="loading-bar__fill" />
        </div>
        <p className="loading-text">Loading…</p>
      </div>
    </div>
  );
}
