import React from 'react'

export default function Currency(props) {
    const volume_marketCap = [props.volume, props.marketCap]
    let volume = "2"
    let marketCap = "4"

    volume_marketCap.forEach(data => {
        let length = data.toString().length
        let newData = ""
        if (length < 10){
            if (length <=5) {
                newData = (data / 1000000).toFixed(2)
            } else{
                newData = (data / 1000000).toFixed(1)
            }
            newData = `${newData.toString()} M`
        } else if (length > 9 && length < 13){
            newData = (data / 1000000000).toFixed(1)
            newData = `${newData.toString()} B`
        } 
        if (data === props.volume){
            volume = newData
        } else {
            marketCap = newData
        }
    })



    return (
        <div className="currency_container">
            <div className="currency_row">
                <div className="currency">
                    <img src={props.image} alt="" />
                    <h1>{props.name}</h1>
                    <p>{props.symbol}</p>
                </div>
                <div className="currency_data">
                    <p>${props.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                    <p>${volume.toLocaleString()}</p>
                    {props.priceChange < 0 ? 
                    <p className="change_neg">
                        {props.priceChange.toFixed(2)}%
                    </p> : props.priceChange > 0 ? 
                    <p className="change_pos">
                        {props.priceChange.toFixed(2)}%
                    </p> : 
                    <p>
                        N/A
                    </p>}
                    <p>
                        ${marketCap}
                    </p>
                </div>
            </div>
        </div>
    )
}
