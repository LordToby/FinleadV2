import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import TickerList from "./Tickerlist";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [tickers, setTickers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTickers, setFilteredTickers] = useState([]);
  const refForm = useRef(null);

  const handleClickedOutside = (event) => {
    if (refForm.current && !refForm.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch(`http://localhost:${4000}/api/searchbar`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "default",
        });
        const responseData = await response.json();
        console.log(responseData);
        setTickers(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTickers();

    //adding event listener once SearchBar is mounted
    document.addEventListener("click", handleClickedOutside);
    //removing event listener once SearchBar is unmounted
    return () => {
      document.removeEventListener("click", handleClickedOutside);
    };
  }, []);

  return (
    <Form className="form-container">
      <Form.Control
        ref={refForm}
        type="search"
        placeholder="Ticker"
        className="search-bar"
        aria-label="Search"
        onKeyDown={(e) => {
          if (e.key === "Enter" && filteredTickers.length > 0) {
            navigate(`stock/${filteredTickers[0].ticker}`);
          }
        }}
        onClick={() => setIsOpen(true)}
        onChange={(e) => {
          const value = e.target.value;
          const filtered =
            value.length > 0
              ? tickers.filter(
                  (ticker) =>
                    ticker.ticker.startsWith(value.toUpperCase()) ||
                    ticker.companyName
                      .toLowerCase()
                      .startsWith(value.toLowerCase())
                )
              : [];

          // const sortedFiltered = filtered.sort((a, b) => {
          //   const aDist = Math.min(
          //     a.ticker.indexOf(value.toUpperCase()),
          //     a.companyName.toUpperCase().indexOf(value.toUpperCase())
          //   );
          //   const bDist = Math.min(
          //     b.ticker.indexOf(value.toUpperCase()),
          //     b.companyName.toUpperCase().indexOf(value.toUpperCase())
          //   );
          //   return aDist - bDist;
          // });
          const sortedFiltered = filtered.sort((a, b) => {
            const aDist = a.ticker.indexOf(value.toUpperCase());
            const bDist = b.ticker.indexOf(value.toUpperCase());
            return Math.max(aDist, bDist);
          });
          setFilteredTickers(sortedFiltered.slice(0, 10));
        }}
      />
      {isOpen && (
        <TickerList
          filteredTickers={filteredTickers}
          setFilteredTickers={setFilteredTickers}
        />
      )}
    </Form>
  );
};
