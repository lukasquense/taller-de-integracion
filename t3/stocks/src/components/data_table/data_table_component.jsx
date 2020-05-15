import React, { Component } from 'react'
import './data_table_styles.scss';
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


export default class TableData extends Component {
    constructor(props){
      super(props);
      this.state = {size: 3}
    }

    

    render(){
        if(this.props.stock && this.props.stock['AAPL']){
            console.log("VAR TABLE",  this.props.stock)
            return(
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticker</TableCell>
                      <TableCell align="right">Maximo </TableCell>
                      <TableCell align="right">Minimo</TableCell>
                      <TableCell align="right">Ultimo</TableCell>
                      <TableCell align="right">Variacion</TableCell>
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
                        {console.log(this.props.stock[ticker])}
                        <TableCell align="right">{this.props.stock[ticker] ? Math.max(...this.props.stock[ticker].map((elem) => elem['value'])) : 0}</TableCell>
                        <TableCell align="right">{this.props.stock[ticker] ? Math.min(...this.props.stock[ticker].map((elem) => elem['value'])) : 0}</TableCell>
                        <TableCell align="right">{this.props.stock[ticker] ? this.props.stock[ticker][this.props.stock[ticker].length - 1]['value'] : 0}</TableCell>
                        <TableCell align="right">{this.props.stock[ticker]
                            ? this.props.stock[ticker].length >= 2
                              ? (((this.props.stock[ticker][this.props.stock[ticker].length - 1]['value'] - this.props.stock[ticker][this.props.stock[ticker].length - 2]['value']) /
                              this.props.stock[ticker][this.props.stock[ticker].length - 2]['value'])*100).toFixed(3)
                              : 0
                            : 0}%</TableCell>
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