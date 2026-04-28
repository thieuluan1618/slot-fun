interface GameHistoryProps {
  history: boolean[];
}

export default function GameHistory({ history }: GameHistoryProps) {
  return (
    <div className="flex gap-1">
      {history.map((win, i) => (
        <div key={i}>
          <img
            className="w-[18px]"
            alt={win ? 'win' : 'loss'}
            src={win ? '/assets/images/white-circle.png' : '/assets/images/black-circle.png'}
          />
        </div>
      ))}
    </div>
  );
}
