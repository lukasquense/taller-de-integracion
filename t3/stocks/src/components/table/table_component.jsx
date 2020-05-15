import React, { Component } from 'react'
import './table_styles.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);


export default class TableStock extends Component {
    constructor(props){
      super(props);
      this.state = {size: 3}
    }

    addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      
    render(){
        if(this.props.stock && this.props.stock['AAPL']){
            console.log(this.props.stock)
            var time = new Date(this.props.stock['AAPL'][this.props.stock['AAPL'].length -1]["time"])
            var time_v = this.addZero(time.getDate())+"/"+this.addZero(time.getMonth()+1)+" -- "+this.addZero(time.getHours())+":"+this.addZero(time.getMinutes())+":"+this.addZero(time.getSeconds())
            return(
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticker</TableCell>
                      <TableCell align="right">Time </TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell align="right">Volumen Transado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(this.props.stock).map((ticker) => (
                        <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Tooltip with HTML</Typography>
                            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                            {"It's very engaging. Right?"}
                          </React.Fragment>
                        }
                      >
                      
                        <TableRow key={ticker}>
                        <TableCell component="th" scope="row">
                          {ticker}
                        </TableCell>
                        
                        <TableCell align="right">{time_v}</TableCell>
                        <TableCell align="right">{this.props.stock[ticker][this.props.stock[ticker].length -1]["value"]}</TableCell>
                        <TableCell align="right">
                        {this.props.buy_data[ticker]
                            ? this.props.buy_data[ticker].length >= 2
                              ? this.props.buy_data[ticker].map((elem) => elem[1]).reduce((a, b) => a + b, 0)
                              : this.props.buy_data[ticker].map((elem) => elem[1])[0]
                            : 0 + this.props.sell_data[ticker]
                            ? this.props.sell_data[ticker].length >= 2
                              ? this.props.sell_data[ticker].map((elem) => elem[1]).reduce((a, b) => a + b, 0)
                              : this.props.sell_data[ticker].map((elem) => elem[1])[0]
                            : 0}
                        
                        </TableCell>
                      </TableRow>
                      </HtmlTooltip>
                    ))}
                    
                  </TableBody>
                </Table>
            </TableContainer>
            )
        }
    else{
        return(
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ticker</TableCell>
                  <TableCell align="right">Time </TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
            </Table>
        </TableContainer>
        )
    }
    }
  }