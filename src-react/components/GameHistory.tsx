interface GameHistoryProps {
  history: boolean[];
}

export default function GameHistory({ history }: GameHistoryProps) {
  return (
    <div className="d-flex gap-1">
      {history.map((win, i) => (
        <div key={i}>
          <img
            style={{ width: 18 }}
            alt={win ? 'win' : 'loss'}
            src={win ? '/assets/images/white-circle.png' : '/assets/images/black-circle.png'}
          />
        </div>
      ))}
    </div>
  );
}
