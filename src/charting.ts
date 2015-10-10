/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./dataPoint.d.ts"/>
/// <reference path="./xAxis.ts"/>
/// <reference path="./yAxis.ts"/>

module charting {
	export class chart {
		private _group: d3.Selection<any>;
		private _paddingLeft = 50;
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
			
			this._xAxis = new xAxis(this._group, width - this._paddingLeft);
			this._xAxis.translate( this._paddingLeft, height - this._paddingBottom);
			this._yAxis = new yAxis(this._group, height - this._paddingBottom - this._paddingTop);
			this._yAxis.translate( this._paddingLeft, this._paddingTop);
			
			this._dataGroup = this._group.append('g')
				.classed('data', true)
				.attr({
					'transform' : 'translate(' + this._paddingLeft + ',' + this._paddingTop + ')'
				});
		}
		
		public update(data: Array<dataPoint>) {
			var minX = d3.min(data, (d:dataPoint)=>d.x );
			var maxX = d3.max(data, (d:dataPoint)=>d.x );
			var xScale = this._xAxis.update(minX, maxX);
			console.log(minX,maxX);
			
			var minY = d3.min(data, (d:dataPoint)=>d.y );
			var maxY = d3.max(data, (d:dataPoint)=>d.y );
			var yScale = this._yAxis.update(minY, maxY);
			
			var dataSelection = this._dataGroup
				.selectAll('.dat')
				.data(data);
			dataSelection.enter()
				.append('circle')
				.classed('dat', true);
			dataSelection.attr({
				'r': 4,
				'cx': (d: dataPoint,i:number) => xScale(d.x),
				'cy': (d: dataPoint,i:number) => yScale(d.y)
			});
			dataSelection.exit().remove();
		}
	}
}