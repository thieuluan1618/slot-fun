import './LoadingOverlay.scss';

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="rocket-container">
          <div className="rocket">🚀</div>
        </div>
      </div>
    </div>
  );
}
