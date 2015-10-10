/// <reference path="./charting.ts"/>
/// <reference path="./dataPoint.d.ts"/>
/// <reference path="./xAxis.ts"/>
/// <reference path="./yAxis.ts"/>

module charting {
	export class ClickableScatterPlot extends ScatterPlot {
		
		private _selected: number;
		
		constructor(container: any) {
			super(container);
		}
				
		public update<T>(data: Array<T>, dataToPoint: (d:T)=>dataPoint): d3.Selection<any> {
			var points: d3.Selection<any> = super.update(data, dataToPoint);
			points.on('click', (d:T,i:number)=> {
				if( i != this._selected ) {
					this._selected = i;
					this.highlightClicked(points);
				}
			});
			return points;
		}
		
		private highlightClicked(points: d3.Selection<any>) {
			points.attr({
				'r': (d,i) => {
					return (i==this._selected) ? 8 : 4;
					}
			});
		}
	}
}