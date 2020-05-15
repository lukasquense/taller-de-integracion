import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import Stock from './components/linechart/linechart_component';

import CSSGrid from './components/dashboard/dashboard_component';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { IconButton, MenuIcon } from '@material-ui/icons';





const protocolo = "wss://";
const servidor = "le-18262636.bitzonte.com";
const ruta = "/stocks";

const socket = io(protocolo + servidor, {
  path: ruta
});

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      stock : {},
      stocks_info: {},
      connection_text : 'Desconectar socket',
      buy_data: {},
      sell_data: {},
      exchanges_data: {},
    }
  }
  
  componentDidMount() {
    console.log('Página montada');
    console.log('Encendiendo socket');

    socket.emit("EXCHANGES", (data) =>{
    });
    
    socket.on("EXCHANGES", (current) =>{
      
        this.setState(state=> ({...state, exchanges_data: {...state.exchanges_data, current}}
        ))
        console.log("current: ", this.state.exchanges_data)
    });

    socket.emit("STOCKS", (data) =>{
    });

    socket.on("STOCKS", current =>{
      console.log("current", current)
      
      current.forEach((e) => {
        this.setState(state=> ({...state, stocks_info: {...state.stocks_info, [e.ticker]: e}})
      )})
    });

    socket.on("UPDATE", current =>{

      var data = {
        time: current.time,
        value: current.value
      }
      this.setState(state=> ({...state, stock: {...state.stock,
        [current.ticker]: [...state.stock[current.ticker] || [], 
        data]}}))
       });


    socket.on("BUY", (data) => {
      const currentData = this.state.buy_data[data.ticker]
        ? this.state.buy_data[data.ticker]
        : [];
      this.setState({
        ...this.state,
        buy_data: {
          ...this.state.buy_data,
          [data.ticker]: [...currentData, [new Date(data.time), data.volume]],
        },
      });
     });

    socket.on("SELL", (data) => {
      const currentData = this.state.sell_data[data.ticker]
        ? this.state.sell_data[data.ticker]
        : [];
      this.setState({
        ...this.state,
        sell_data: {
          ...this.state.sell_data,
          [data.ticker]: [...currentData, [new Date(data.time), data.volume]],
        },
      });
    });
  }

  handleClick() {
    
      if (socket.connected){
        socket.close()
        console.log(socket.connected);
        this.setState({
          connection_text: 'Conectar socket'
        })
      } // true
      else {
        socket.open()
        console.log(socket.connected);
        this.setState({
          connection_text: 'Desconectar socket'
          
        })
      };
  }


    //create a new socket connection
    //see documentation https://github.com/sockjs/sockjs-client#getting-started
  
  render() {
    //console.log("stocks info: ", this.state.stocks_info)
    //console.log("stocks : ", this.state.stock)
    if (this.state.stock &&  this.state.stock['IBM']){
      return (
        <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" >
              <Button color="inherit" position="right" onClick={this.handleClick}>{this.state.connection_text}</Button>
            </Typography>
            
          </Toolbar>
        </AppBar>
          <h1> Mercado de acciones </h1>
          <CSSGrid stock={this.state.stock} market = {this.state.market} stocks_info={this.state.stocks_info} buy_data={this.state.buy_data} sell_data={this.state.sell_data}/>
        </div>
      );
    }
    else{
      return (
        <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" >
              <Button color="inherit" position="right" onClick={this.handleClick}>{this.state.connection_text}</Button>
            </Typography>
            
          </Toolbar>
        </AppBar>
          <h1> Mercado de acciones </h1>
        </div>
      );
    }
  }
}


export default App;