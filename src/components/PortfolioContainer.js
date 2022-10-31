import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio, handleClick}) {
  

  return (
    <div>
      <h2>My Portfolio</h2>
      {
     portfolio.map((stock) => {
      return <Stock key={stock.id} stocks={stock} handleClick={(stock) => handleClick(stock)}/>
     })
      }
    </div>
  );
}

export default PortfolioContainer;
