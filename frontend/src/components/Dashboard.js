import React, {useState, useEffect} from 'react'
import axios from 'axios';
// use coingecko api to get crypto information and display on the page
const Dashboard = ({user}) => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=> {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false`).then(res=>{
            setCoins(res.data);
        })
    }, [])

    if (coins.length === 0) {
        return null;
    }

    if (!user) {
        <div>You must be logged in to view the dashboard!</div>
    }

    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div className="box">Search Coin by Name: <input value={search} onChange={(e)=>setSearch(e.target.value)} /></div>
            {searchedCoins.map(coin => 
                <div key={coin.id} className="box">
                    <img src={coin.image} alt="crypto" />
                    <h1 className="title">{coin.name}</h1>
                    <p>Symbol: {coin.symbol}</p>
                    <p>Current Price: ${coin.current_price}</p>
                </div>
                )}
        </div>
    )
}

export default Dashboard
