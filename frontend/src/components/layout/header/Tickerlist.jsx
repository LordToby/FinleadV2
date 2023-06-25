import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import sectorsToEmoji from "./searchbar/sectorsEmoji";
const TickerList = ({ filteredTickers, setIsOpen }) => {
  const navigate = useNavigate();
  if (filteredTickers.length === 0) return null;
  return (
    <ul className="dropdown-menu">
      {filteredTickers.map((ticker, index) => (
        <li key={index} className="ticker-li" onBlur={() => setIsOpen(false)}>
        <div>
          <a className="ticker-link" onClick={(event) =>{
            event.preventDefault();
            navigate("stock/" + ticker.ticker)
          }}>
          <div className="ticker-wrapper">
              <p className="ticker">
                {ticker.ticker} {sectorsToEmoji(ticker.sector)}
              </p>
              <p className="companyName">{ticker.companyName}</p>
            </div>
          </a>
          
          {/* <Link
            to={"stock/" + ticker.ticker}
            className="ticker-link"
            onClick={(event) => {
              setIsOpen(false);
              event.preventDefault();
            }}
          >
            <div className="ticker-wrapper">
              <p className="ticker">
                {ticker.ticker} {sectorsToEmoji(ticker.sector)}
              </p>
              <p className="companyName">{ticker.companyName}</p>
            </div>
          </Link> */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TickerList;
