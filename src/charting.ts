/// <reference path="../typings/d3/d3.d.ts"/>

module charting {
	export class chart {
		private _group: d3.Selection<any>;
		
		constructor(container: any) {
			this.init(container);
		}
		
		private init(container) {
			this._group = d3.select(container).append('g');
		}
	}
}