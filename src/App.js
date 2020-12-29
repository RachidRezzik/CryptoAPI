import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Currency from './components/Currency';

function App() {
  const [currency, setCurrency] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((res) => {
        setCurrency(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
    window.scrollTo({
      top: 0
    })
  }

  const filteredCurrency = currency.filter(currency => 
    currency.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="App">
      <div className="search_div">
        <h1>Cryptocurrencies</h1>
        <form>
          <input type="text" placeholder="Search Crypto" onChange={handleChange} />
        </form>
        <div className="currency_row" style={{border: "none", maxWidth: "950px"}}>
                <div className="currency">
                    <p style={{width:"25px"}}></p>
                    <p style={{marginRight:"auto", padding: "0px 2.5px", marginLeft: "5px"}}>Name</p>
                    <p>Symbol</p>
                </div>
                <div className="currency_data">
                    <p>Price</p>
                    <p>Volume</p>
                    <p>
                        Daily Change
                    </p> 
                    <p>
                        Market Cap
                    </p>
                </div>
            </div>
      </div>
      <div className="results_container">
        {filteredCurrency.map(currency => {
          return (
            <Currency 
            key={currency.id}  
            name={currency.name}  
            image={currency.image}  
            symbol={currency.symbol}
            marketCap={currency.market_cap}  
            price={currency.current_price}  
            priceChange={currency.price_change_percentage_24h}  
            volume={currency.total_volume}  
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
