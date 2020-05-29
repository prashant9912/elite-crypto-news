import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment'

import './App.scss';

export default class App extends Component {


  state={
    cryptodata:[],newsData:[]
  }

  componentDidMount=()=>{
    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,LTC&tsyms=USD')
    .then(x=>{

        for(let y in x.data.RAW){
          let obj= {title:y,data:x.data.RAW[y].USD}
          this.setState({cryptodata:[...this.state.cryptodata,obj]})
        }
      console.log(this.state.cryptodata)
    })

    axios.get('https://cryptocontrol.io/api/v1/public/news?key=e1053fe0fce51e8e13db93b1583be291')
    .then(x=>{
      console.log(x.data)
      this.setState({newsData:x.data})
    })
  
  }

  render() {
    return (
      <div className='wow'>
        <div className="bar"> </div>
          <div className="container">
            <h1>Crypto Newspaper 🗞</h1>

            <div className='date'>{moment().format('MMMM DD,YYYY')}</div>

<div className="sp"> </div>
<hr/>

<div className="tick">
            {
              this.state.cryptodata.map((v,k)=>{return<div>
                {v.title} <br/>{v.data.CHANGE24HOUR.toFixed(2)<=0?<span style={{background:'rgba(247, 135, 131,0.4)',padding:2,whiteSpace:'nowrap'}}>${v.data.PRICE} ({v.data.CHANGEPCT24HOUR.toFixed(2)}%)</span>:
                <div style={{background:'#9CF4DC',padding:2,whiteSpace:'nowrap'}}> ${v.data.PRICE} (+{v.data.CHANGEPCT24HOUR.toFixed(2)}%)</div>
                }

                </div> })
            }
            </div>


              <div className="newscon">

                {this.state.newsData.map((v,k)=><div className="news">
                  <img src={v.thumbnail} alt=""/>
                     
                  <div>
                  {v.title}
                  </div>
                 
                  </div>)}

              </div>
           

          </div>
      </div>
    )
  }
}
