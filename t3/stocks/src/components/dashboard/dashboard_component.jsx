import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {ButtonGroup, Button} from '@material-ui/core';
import TableStock from '../table/table_component';
import TableData from '../data_table/data_table_component';
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'
import { getSnapshotData } from 'jest-snapshot/build/utils';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function CSSGrid({stock, market, stocks_info, buy_data, sell_data}) {
  const classes = useStyles();
  const [currentKey, setKey] = React.useState("AAPL")
  const [current, setCurrent] = React.useState({})
  
    React.useEffect(() => {
      var data = {}
      if (stock && stock[String(currentKey)]){
        if(stock[String(currentKey)].length > 30){
         for(var i = stock[String(currentKey)].length - 30; i< stock[String(currentKey)].length; i++){
             var date = new Date(stock[String(currentKey)][i]['time']);
             var key = date.getMinutes() + "-" + date.getSeconds();
             var d = String(key);
             var value = stock[String(currentKey)][i]['value'];
             data[d] = value;
         }
         
         setCurrent(data)
    }}}, [currentKey, stock])


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
        <TableStock stock= {stock} stocks_info={stocks_info} buy_data = {buy_data} sell_data={sell_data}/>
        </Grid> 
        <Grid item xs={5}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            {Object.keys(stock).map(key =>
                <Button onClick={() => setKey(key)}>
                    {key}
                </Button>
            )}
        </ButtonGroup>
        <LineChart data={current} />
        </Grid>
        <Grid item xs={4}>
          <TableData stock={stock} />
        </Grid>
    
        <Grid item xs={12}>
        <h1>Mercado de transacciones</h1>
        </Grid>
        
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>xs=8</Paper>
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
    </div>
  );
}