import React from "react";
import axios from 'axios';
//import * as TelegramBot from 'node-telegram-bot-api';

//import './App.css';
class Api extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        this.interval = setInterval(() => fetch(
"https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=KXDX668S3MQ55VF8978AE8JTYZVVX2ND6U")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            }), 60000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        console.log("this is a test");
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
console.log(items);
        const SafeGasPrice = items.result.SafeGasPrice;
        const ProposeGasPrice = items.result.ProposeGasPrice;
        const FastGasPrice = items.result.FastGasPrice;
      //  const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
//const token = '2131954261:AAHxZdKsVKB5QJsSoezja7I9CQiZSGlu_Qo';

// Create a bot that uses 'polling' to fetch new updates
//const bot = new TelegramBot(token);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://api.telegram.org/bot2131954261:AAHxZdKsVKB5QJsSoezja7I9CQiZSGlu_Qo/sendMessage?chat_id=341336187&parse_mode=Markdown&text="+SafeGasPrice);
        return (
            
        <div className = "App">
            {console.log("all items"+JSON.stringify(items))}
            <h1> Fetch data from an api in react </h1>  
            
            {console.log(SafeGasPrice,ProposeGasPrice,FastGasPrice)}
            <table>
               <tbody>
                 <tr>
                     <td>
                     {SafeGasPrice >= 100? xhr.send() : "test"}
                     </td>
                     <td>
                     {SafeGasPrice}
                     </td>
                    <td>
                     {SafeGasPrice}
                     </td>
                 </tr>
               </tbody>
             </table>
            
            {/*
            
                items.map((item) => ( 
                <ol >
                    User_Name: { item.status }, 
                    Full_Name: { item.message }, 
                    User_Email: { item.result } 
                    </ol>
                ))
                */}
        </div>
    );
}
}
   
export default Api;