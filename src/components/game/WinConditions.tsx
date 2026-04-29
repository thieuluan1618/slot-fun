import './WinConditions.scss';

const winConditions = [
  { image: '/assets/symbols/Bell.png', line: 'Any line', ratio: '150%' },
  { image: '/assets/symbols/Cherries.png', line: 'Any line', ratio: '100%' },
  { image: '/assets/symbols/Grape.png', line: 'Any line', ratio: '90%' },
  { image: '/assets/symbols/Lemon.png', line: 'Any line', ratio: '80%' },
  { image: '/assets/symbols/Melon.png', line: 'Any line', ratio: '70%' },
  { image: '/assets/symbols/Orange.png', line: 'Any line', ratio: '60%' },
  { image: '/assets/symbols/Scatter.png', line: 'Any line', ratio: '50%' },
  { image: '/assets/symbols/7.png', line: 'Any line', ratio: 'Jackpot' },
];

export default function WinConditions() {
  return (
    <div>
      <div className="win-conditions">
        <div className="overflow-x-auto">
          <table className="table-bordered">
            <tbody>
              <tr>
                {winConditions.map((c, i) => (
                  <td key={i} className="text-center align-middle">
                    <img src={c.image} alt="symbol" className="symbol-image" />
                    <img src={c.image} alt="symbol" className="symbol-image" />
                    <img src={c.image} alt="symbol" className="symbol-image" />
                    <div>{c.line}</div>
                    <div>{c.ratio}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
