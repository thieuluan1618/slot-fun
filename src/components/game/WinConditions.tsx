import './WinConditions.scss';

const winConditions = [
  { image: '/assets/symbols/7.png', name: 'Seven', ratio: 'Jackpot', tier: 'jackpot' },
  { image: '/assets/symbols/Bell.png', name: 'Bell', ratio: '150%', tier: 'high' },
  { image: '/assets/symbols/Scatter.png', name: 'Scatter', ratio: '50%', tier: 'high' },
  { image: '/assets/symbols/Ankh.svg', name: 'Ankh', ratio: '45%', tier: 'mid' },
  { image: '/assets/symbols/Scarab.svg', name: 'Scarab', ratio: '40%', tier: 'mid' },
  { image: '/assets/symbols/EyeOfHorus.svg', name: 'Eye of Horus', ratio: '35%', tier: 'mid' },
  { image: '/assets/symbols/Pharaoh.svg', name: 'Pharaoh', ratio: '30%', tier: 'low' },
  { image: '/assets/symbols/Pyramid.svg', name: 'Pyramid', ratio: '25%', tier: 'low' },
  { image: '/assets/symbols/Wild.svg', name: 'Wild', ratio: '20%', tier: 'low' },
];

export default function WinConditions() {
  return (
    <div className="win-conditions">
      <div className="win-grid">
        {winConditions.map((c, i) => (
          <div key={i} className={`win-card win-card--${c.tier}`}>
            <div className="win-card__symbols">
              <img src={c.image} alt={c.name} />
              <img src={c.image} alt={c.name} />
              <img src={c.image} alt={c.name} />
            </div>
            <div className="win-card__info">
              <span className="win-card__name">{c.name}</span>
              <span className="win-card__ratio">{c.ratio}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
