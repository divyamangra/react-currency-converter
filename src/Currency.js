import React from 'react'

export default function Currency(props) {
// console.log(props)
    return (
        <div>
            <input type="number" value={props.amount} onChange={props.onChangeAmount}/>
            <select  value={props.selectedCurrency} onChange={props.onChangeCurrency}>
                {/* { <option value='INR'>INR</option> } */}
                
                {props.currencies.map(option=>(
                    <option key={option} value = {option}>{option}</option>
                ))}
                </select>
        </div>
    )
}
