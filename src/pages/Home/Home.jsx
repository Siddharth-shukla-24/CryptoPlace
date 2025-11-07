import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
// CG-52bQoc3zXFAJcAdJ1Dr8qexa
const Home = () => {
  const {allCoin,currency}=useContext(CoinContext);
  const[displayCoin, setDisplayCoin]= useState([]);
  const [input, setInput]= useState('');

  const inputHandler=(event)=>{
       setInput(event.target.value);
       if(event.target.value===""){
        setDisplayCoin(allCoin);
       }
  }

  const searchHandler= async (event)=>{
     event.preventDefault();
     const coins = await allCoin.filter((items)=>{
       return items.name.toLowerCase().includes(input.toLowerCase())
     })
     setDisplayCoin(coins);
  }
  useEffect(()=>{
    setDisplayCoin(allCoin)
  },[allCoin]);
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/>Crypto MarketPlace</h1>
        <p>
          Where innovation meets decentralization ,explore the next era of crypto trading. < br/> Sign up now!!
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinList' value={input} type='text' placeholder='search crypto' required />
          
          <datalist id='coinList'>
            {allCoin.map((item,index)=>(<option key={index} value={item.name} />))}
          </datalist>




          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="cryptotable">
        <div className="tablelayout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24HR Change</p>
          <p className='marketcap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item,index)=>(
            <Link to={`/coin/${item.id}`} className="tablelayout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt='' />
                <p>{item.name + " - "+ item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>
                {Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='marketcap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
