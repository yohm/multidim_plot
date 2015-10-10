/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./dataPoint.d.ts"/>
/// <reference path="./xAxis.ts"/>
/// <reference path="./yAxis.ts"/>

module charting {
	export class chart {
		private _group: d3.Selection<any>;
		private _paddingLeft = 50;
		private _paddingRight = 30;
		private _paddingBottom = 30;
		private _paddingTop = 30;
		
		private _xAxis: xAxis;
		private _yAxis: yAxis;
		
		private _dataGroup: d3.Selection<any>;
		
		constructor(container: any) {
			this.init(container);
		}
		
		private init(container) {
			var selection = d3.select(container);
			var width = selection.node().clientWidth;
			var height = selection.node().clientHeight;
			this._group = selection.append('svg')
			    .attr({
				    'width': width,
				    'height': height
			    })
			    .append('g');
			
			this._xAxis = new xAxis(this._group, width - this._paddingLeft - this._paddingRight);
			this._xAxis.translate( this._paddingLeft, height - this._paddingBottom);
			this._yAxis = new yAxis(this._group, height - this._paddingBottom - this._paddingTop);
			this._yAxis.translate( this._paddingLeft, this._paddingTop);
			
			this._dataGroup = this._group.append('g')
				.classed('data', true)
				.attr({
					'transform' : 'translate(' + this._paddingLeft + ',' + this._paddingTop + ')'
				});
		}
		
		public update<T>(data: Array<T>, dataToPoint: (d:T)=>dataPoint) {
			var minX = d3.min(data, (d:T)=>dataToPoint(d).x );
			var maxX = d3.max(data, (d:T)=>dataToPoint(d).x );
			var xScale = this._xAxis.update(minX, maxX);
			
			var minY = d3.min(data, (d:T)=>dataToPoint(d).y );
			var maxY = d3.max(data, (d:T)=>dataToPoint(d).y );
			var yScale = this._yAxis.update(minY, maxY);
			
			var dataSelection = this._dataGroup
				.selectAll('.dat')
				.data(data);
			dataSelection.enter()
				.append('circle')
				.classed('dat', true);
			dataSelection.transition().delay(50).duration(700)
				.attr({
					'r': 4,
					'cx': (d:T,i:number) => xScale( dataToPoint(d).x ),
					'cy': (d:T,i:number) => yScale( dataToPoint(d).y )
				});
			dataSelection.exit().remove();
			this.setTooltip(dataSelection);
		}
		
		private setTooltip(points: d3.Selection<any>) {
			var tooltip = d3.select('span#tooltip');
			points
				.on("mouseover", function(d:dataPoint) {
					d3.select(this).style("opacity",1);
					var t = JSON.stringify(d);
					tooltip.style("visibility","visible").text(t);
				})
				.on("mousemove", function(d:dataPoint) {
					tooltip
						.style("top", (d3.event.pageY-20)+"px")
						.style("left", (d3.event.pageX+10)+"px");
				})
				.on("mouseout", function(d:dataPoint) {
					d3.select(this).style("opacity", .8);
					tooltip.style("visibility", "hidden");
				});
		}
	}
}