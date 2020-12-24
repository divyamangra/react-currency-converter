import './Currency'
import './App.css';
import Currency from './Currency';
import React, {useEffect, useState} from 'react'

const converterApi='https://api.exchangeratesapi.io/latest'

function App() {

 const [currencies, setCurrencies] = useState([])
//  console.log(currencies)
const [currencyOne, setCurrencyOne]=useState([])
const [currencytwo, setCurrencytwo]=useState([])
const [amount,setAmount]=useState(1)
const [exchangeRate, setExchangeRate]=useState()
const[amountIn1,setAmountIn1]=useState(true)

let amount1,amount2

if (amountIn1){
  amount1=amount
  amount2=amount * exchangeRate
}
else{
  amount2=amount
  amount1=amount/exchangeRate
}

  useEffect(()=>{
    fetch(converterApi).then(res=>res.json())
    .then(data=>{
      let firstCurrencyinList=Object.keys(data.rates)[0]
      setCurrencies([data.base,...Object.keys(data.rates)])
      setCurrencyOne(data.base)
      setCurrencytwo(firstCurrencyinList)
      setExchangeRate(data.rates[firstCurrencyinList])

    })
  },[])

  useEffect(() => {
    if (currencyOne!=null && currencytwo!=null){
      fetch(`${converterApi}?base=${currencyOne}&Symbols=${currencytwo}`).then(res=>res.json()).then(data => setExchangeRate(data.rates[currencytwo]))
    }
    
  }, [currencytwo, currencyOne])

 function handleAmount1Change(e)  {
    setAmount(e.target.value)
    setAmountIn1(true)
  }

  function handleAmount2Change(e)  {
    setAmount(e.target.value)
    setAmountIn1(false)
  }

  return (
    <>
   <h1>Currency Converter</h1>
    <Currency currencies={currencies} amount={amount1} onChangeAmount={handleAmount1Change} selectedCurrency={currencyOne}  onChangeCurrency={e=>setCurrencyOne(e.target.value)}></Currency>
    <p>=</p>
    <Currency currencies={currencies} amount={amount2} onChangeAmount={handleAmount2Change} selectedCurrency={currencytwo} onChangeCurrency={e=>setCurrencytwo(e.target.value)}></Currency>
    
    </>
  );
}

export default App;
