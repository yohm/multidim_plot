/// <reference path="./ScatterPlot.ts"/>
/// <reference path="./dataPoint.d.ts"/>
/// <reference path="./xAxis.ts"/>
/// <reference path="./yAxis.ts"/>

module charting {
	export class ClickableScatterPlot extends ScatterPlot {
		
		private _selected: number;
		private _colorScale: d3.scale.Linear<string,number>;
		private _callbackOnClicked: (selectedIdx:number, colors:Array<number>)=>void;
		
		constructor(container: any) {
			super(container);
			this._colorScale = d3.scale.linear()
				.range(["red", "blue"]);
		}
				
		public update<T>(data: Array<T>, dataToPoint: (d:T)=>dataPoint): d3.Selection<any> {
			var points: d3.Selection<any> = super.update(data, dataToPoint);
			points.on('click', (d:T,i:number)=> {
				if( i != this._selected ) {
					this._selected = i;
					this.highlightClicked<T>(points);
				}
			});
			return points;
		}
		
		public setOnClickedCallback(f: (i:number,colors:Array<number>)=>void ) {
			this._callbackOnClicked = f;
		}
		
		private highlightClicked<T>(points: d3.Selection<any>) {
			var selected:T = points.data()[this._selected];
			var distances:Array<number> = points.data().map( (v:T) => {
				var sum = 0.0;
				for( var key in v ) {
					sum += (v[key] - selected[key])*(v[key] - selected[key]);
				}
				return sum;
			});
			var minD = d3.min(distances);
			var maxD = d3.max(distances);
			this._colorScale.domain([minD,maxD]);
			var colors: Array<number> = distances.map( (v:number) => {
				return this._colorScale(v);
			});
			points.attr({
				'r': (d:T,i:number) => { return (i==this._selected) ? 8 : 4; },
				'fill': (d:T,i:number)=> { return colors[i]; }
			});
			if( this._callbackOnClicked ) {
				this._callbackOnClicked( this._selected, colors );
			}
		}
	}
}