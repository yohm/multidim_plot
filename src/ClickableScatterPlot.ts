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
				
		public update<T>(data: Array<T>, dataToPoint: (d:T)=>dataPoint) {
			super.update(data, dataToPoint);
		}
	}
}