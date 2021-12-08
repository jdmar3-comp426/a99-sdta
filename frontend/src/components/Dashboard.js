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
            <div class="container">
            <h4 class="title is-4">Search Coin by Name:</h4>


            <input class="input" value={search} onChange={(e)=>setSearch(e.target.value)} />

            </div>
            <div class="block">
            </div>

            {searchedCoins.map(coin =>
                <div key={coin.id} className="container">
                    <img src={coin.image} alt="crypto" />
                    <div class="block">
                    </div>
                    <h1 className="title is-spaced">{coin.name}</h1>
                    <h4 class="title is-4 is-spaced">Symbol: {coin.symbol}</h4>
                    <h4 class="title is-4 is-spaced">Current Price: ${coin.current_price}</h4>
                    <div class="block">
                    </div>

                </div>
                )}
        </div>
    )
}

export default Dashboard
