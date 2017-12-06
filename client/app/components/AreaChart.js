import React from "react";
import PropTypes from "prop-types";
import * as d3  from 'd3';
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";

const dateFormat = timeFormat("%a %b %d, %I:%M %p");
const numberFormat = format(".2f");

function tooltipContent(ys, currency) {
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 2
	});

	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{
					label: "Close",
					value: formatter.format(currentItem.close) 
				}
			]
				.concat(
					ys.map(each => ({
						label: each.label,
						value: each.value(currentItem),
						stroke: each.stroke
					}))
				)
				.filter(line => line.value)
		};
	};
}

class AreaChart extends React.Component {
	render() {
		const { data, type, width, ratio } = this.props;

		return (
			<ChartCanvas ratio={ratio} width={width} height={450} 
					mouseMoveEvent={true}
					panEvent={false}
					zoomEvent={false}
					clamp={false}
					margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
					seriesName="BTC"
					data={data} type={type}
					xAccessor={d => d.time}
					xScale={d3.scaleTime()}>
				<Chart id={1} yExtents={d => d.close}>
					<XAxis axisAt="bottom" 
						   orient="bottom" 
						   ticks={this.props.tickerPoints} 
						   fontFamily = {"Varela Round, sans-serif"}
						   tickStroke = "#616161"
						   stroke = "#616161"
						   strokeWidth = {0.5}
						   opacity = {0.8} 
						   fontSize={12}/>
					
					<YAxis axisAt="left" 
						   orient="left"
						   fontFamily = {"Varela Round, sans-serif"}
						   tickStroke = "#616161"
						   stroke = "#616161"
						   strokeWidth = {0.7}
						   opacity = {0.8} 
						   fontSize={12} />
						   
					<YAxis axisAt="right" 
						   orient="right"
						   fontFamily = {"Varela Round, sans-serif"}
						   tickStroke = "#616161"
						   stroke = "#616161"
						   strokeWidth = {0.5}
						   opacity = {0.8} 
						   fontSize={12} />
					<AreaSeries yAccessor={d => d.close} stroke = "#ff7f0e" fill = "#ff7f0e" opacity = {0.1}/>
					
					<HoverTooltip
						stroke = "#9E9E9E" 
						fill = "#FAFAFA" 
						bgFill = "#EEEEEE" 
						fontFill = "#616161"
						bgOpacity = {0.5}
						opacity = {0.8}
						fontFamily = {"Varela Round, sans-serif"}
						tooltipContent={tooltipContent([], this.props.currency)}
						fontSize={14}
					/>
				</Chart>
			</ChartCanvas>
		);
	}
}

AreaChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
	type: "svg",
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;