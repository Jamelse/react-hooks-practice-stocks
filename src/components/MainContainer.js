import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [filterBy, setFilterBy] = useState('Tech')
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(r => r.json())
    .then((stock) => setStocks(stock))
  }, [])
  
  function onChangeHandler(e){
    setFilterBy(e)
  }

  function onStockBuy(stock){
    if (!portfolio.includes(stock)){
      setPortfolio([...portfolio, stock])
    }
  }

  function onPortfolioStockClick(stock){
    const removeFromPortfolio = portfolio.filter((target) => {
      return stock.id !== target.id
    })
    setPortfolio(removeFromPortfolio)
    }

    function sortByClick(e){
      setSortBy(e.target.value)
    }

    useEffect(() => {
      if (sortBy === 'Alphabetically'){
        const alphabeticalSort = [...stocks].sort((a, b) => {
          const nameA = a.name.toUpperCase(); 
          const nameB = b.name.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
            return 0;
        })
        setStocks(alphabeticalSort)
      } else {
        const priceSort = [...stocks].sort((a, b) => a.price - b.price);
        setStocks(priceSort)
      }
},[ sortBy ])

  const filteredByTypeStocks = stocks.filter((stock) => {
      return stock.type === filterBy
    })

  return (
    <div>
      <SearchBar onChangeHandler={onChangeHandler} sortByClick={sortByClick} sortBy={sortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredByTypeStocks} handleClick={onStockBuy}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} handleClick={onPortfolioStockClick}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
