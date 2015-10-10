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
		
		public draw() {
			var scale = d3.scale.linear();
			scale.domain([0,1]);
			scale.range([0,800]);
			var axis = d3.svg.axis();
			axis.scale(scale);
			this._group.call(axis);
		}
	}
}