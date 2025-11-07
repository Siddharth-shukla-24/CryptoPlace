import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CoinContext = createContext();

const CoinContextProvider =(props)=>{

        const [allCoin, setAllCoin]= useState([]);
        const [currency,setCurrency]= useState({
            name:"usd",
            symbol:"$"
        })
const fetchAllCoins= async()=>{
const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`;
const options = {
  method: 'GET',
  headers: {'x-cg-demo-api-key': 'CG-52bQoc3zXFAJcAdJ1Dr8qexa'},
  body: undefined
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  setAllCoin(data);
} catch (error) {
  console.error(error);
}
}

        useEffect(()=>{
            fetchAllCoins();
        },[])

        const contextValue={
              allCoin, currency, setCurrency
        }

        return (

            <CoinContext.Provider value={contextValue}>
                {props.children}
            </CoinContext.Provider>
        )
}

export default CoinContextProvider;