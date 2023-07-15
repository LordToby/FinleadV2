import { Link } from "react-router-dom";
import sectorsToEmoji from "./searchbar/sectorsEmoji";
const TickerList = ({ filteredTickers, setIsOpen }) => {
  if (filteredTickers.length === 0) return null;
  return (
    <ul className="dropdown-menu">
      {filteredTickers.map((ticker, index) => (
        <li key={index} className="ticker-li" onBlur={() => setIsOpen(false)}>
          <Link
            to={"stock/" + ticker.ticker}
            className="ticker-link"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <div className="ticker-wrapper">
              <p className="ticker">
                {ticker.ticker} {sectorsToEmoji(ticker.sector)}
              </p>
              <p className="companyName">{ticker.companyName}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TickerList;
