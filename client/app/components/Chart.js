import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import * as d3  from 'd3';
import AreaChart from './AreaChart';
import CandlestickChart from './CandlestickChart';
import { style } from 'd3';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    height: '600px',
    margin: 'auto',
    marginTop: '30px',
    marginBottom: '40px',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '30px',
    marginBottom: '30px'
  },
  tabContainerLeft: {
    margin: 'auto',
    marginLeft: '80px',
    borderColor: 'rgba(97, 97, 97, .1)',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '2px'
  },
  tabContainerRight: {
    margin: 'auto',
    marginRight: '80px',
    borderColor: 'rgba(97, 97, 97, .1)',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '2px'
  },
  tab: {
    backgroundColor: '#FAFAFA',
  },
  tabButtonLeft: {
    fontFamily: 'Varela Round, sans-serif',
    marginLeft: "25px",
    marginRight: "25px",
    fontSize: '12px',
    color: '#424242',
    textTransform: 'none'
  },
  tabButtonRight: {
    fontFamily: 'Varela Round, sans-serif',
    marginLeft: "15px",
    marginRight: "15px",
    fontSize: '12px',
    color: '#424242',
    textTransform: 'none'
  },
  inkBarStyle: {
    backgroundColor: '#424242',
  },
  loaderContainer: {
    height: '450px',
  },
  loader: {
    marginTop: '180px'
  }
}

var tickerPointCount = 8;
var candlestickWidth = 10;

class Chart extends Component {
  constructor() {
    super();
      this.state = {
        chartData: null,
        isLineChart: true,
        selectedIndexLeft: 0,
        selectedIndexRight: 0
    }
  }

  componentWillMount() {
    this.set1HourPriceChart();
    this.setState({
      isLineChart: true,
      selectedIndexLeft: 0,
      selectedIndexRight: 0,
    });
  }

  componentWillReceiveProps(props) {
    if(props.symbol || props.currency) {
      this.set1HourPriceChart();
      this.setState({
        isLineChart: true,
        selectedIndexLeft: 0,
        selectedIndexRight: 0,
      });
    }
  }

  setToLineChart() {
    this.setState({isLineChart: true});
  }

  setToCandlestickChart() {
    this.setState({isLineChart: false});
  }

  set1HourPriceChart() {
    let url = 'https://min-api.cryptocompare.com/data/histominute?fsym=' + this.props.symbol + '&tsym=' + this.props.currency + '&limit=60';
    tickerPointCount = 8;
    candlestickWidth = 10;

    this.getChartData(url);
  }

  set24HourPriceChart() {
    let url = 'https://min-api.cryptocompare.com/data/histohour?fsym=' + this.props.symbol + '&tsym=' + this.props.currency + '&limit=24';
    tickerPointCount = 8;
    candlestickWidth = 25;

    this.getChartData(url);
  }

  set1WeekPriceChart() {
    let url = 'https://min-api.cryptocompare.com/data/histohour?fsym=' + this.props.symbol + '&tsym=' + this.props.currency + '&limit=168';
    tickerPointCount = 7;
    candlestickWidth = 4;

    this.getChartData(url);
  }

  set1MonthPriceChart() {
    let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + this.props.symbol + '&tsym=' + this.props.currency + '&limit=31';
    tickerPointCount = 8;
    candlestickWidth = 25;

    this.getChartData(url);
  }

  set3MonthPriceChart() {
    let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + this.props.symbol + '&tsym=' + this.props.currency + '&limit=93';
    tickerPointCount = 10;
    candlestickWidth = 6;

    this.getChartData(url);
  }

  set1YearPriceChart() {
    let url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + this.props.symbol + '&tsym=' + this.props.currency + '&limit=365';
    tickerPointCount = 12;
    candlestickWidth = 1.5;

    this.getChartData(url);
  }

  getChartData(url) {
    d3["json"](url, (err, res) => {
      var data = res.Data;
      data.forEach((d, i) => {
        d.time = new Date(d.time * 1000);
        d.close = +d.close;
        d.high = +d.high;
        d.low = +d.low;
        d.open = +d.open;
        d.volumefrom = +d.volumefrom;
      });

      this.setState({chartData: null});
      this.setState({chartData: data});
    });
  }

  handleTabChangeLeft(value) {
    this.setState({selectedIndexLeft: value});
  }

  handleTabChangeRight(value) {
    this.setState({selectedIndexRight: value});
  }

  render() {
    let chartContent = null;

		if (this.state.chartData == null) {
      chartContent = ( 
        <div style = {styles.loaderContainer}/>
      );
		} else {
      if (this.state.isLineChart) { 
        chartContent = ( 
          <AreaChart type = {'svg'} data = {this.state.chartData} tickerPoints = {tickerPointCount} currency = {this.props.currency}/>
        );
      } else {
        chartContent = ( 
          <CandlestickChart type = {'svg'} data = {this.state.chartData} tickerPoints = {tickerPointCount} candlestickWidth = {candlestickWidth} currency = {this.props.currency}/>
        );
      }
    }

		return (
      <div style = {styles.root}>
        <div style = {styles.headerContainer}>
          <div style = {styles.tabContainerLeft}>
            <Tabs value = {this.state.selectedIndexLeft} tabItemContainerStyle = {styles.tab} inkBarStyle = {styles.inkBarStyle} onChange={this.handleTabChangeLeft.bind(this)}>
              <Tab value = {0} buttonStyle = {styles.tabButtonLeft} label="Line" onActive = {this.setToLineChart.bind(this)}/>
              <Tab value = {1} buttonStyle = {styles.tabButtonLeft} label="Candlestick" onActive = {this.setToCandlestickChart.bind(this)}/>
            </Tabs>
          </div> 
          <div style = {styles.tabContainerRight}>
            <Tabs value = {this.state.selectedIndexRight} tabItemContainerStyle = {styles.tab} inkBarStyle = {styles.inkBarStyle} onChange={this.handleTabChangeRight.bind(this)}>
              <Tab value = {0} buttonStyle = {styles.tabButtonRight} label="1h" onActive = {this.set1HourPriceChart.bind(this)}/>
              <Tab value = {1} buttonStyle = {styles.tabButtonRight} label="1d" onActive = {this.set24HourPriceChart.bind(this)}/>
              <Tab value = {2} buttonStyle = {styles.tabButtonRight} label="1w" onActive = {this.set1WeekPriceChart.bind(this)}/> 
              <Tab value = {3} buttonStyle = {styles.tabButtonRight} label="1m" onActive = {this.set1MonthPriceChart.bind(this)} /> 
              <Tab value = {4} buttonStyle = {styles.tabButtonRight} label="3m" onActive = {this.set3MonthPriceChart.bind(this)} /> 
              <Tab value = {5} buttonStyle = {styles.tabButtonRight} label="1y" onActive = {this.set1YearPriceChart.bind(this)} />
            </Tabs>
          </div> 
        </div>
        {chartContent}
      </div>
		)
  } 
}
  
export default Chart;