/// <reference path="../typings/d3/d3.d.ts"/>
module charting{
	
	export class xAxis{
		
		private _scale: d3.scale.Linear<number,number>;
		private _group: d3.Selection<any>;
		private _axis: d3.svg.Axis;
		
		constructor(container: d3.Selection<any>, width: number) {
			this.init(container, width);
		}
		
		private init(container: d3.Selection<any>, width: number) {
			this._group = container.append('g');
			this._scale = d3.scale.linear()
				.range([0, width]);
			this._axis = d3.svg.axis()
				.scale(this._scale)
				.orient('bottom');
			
			this.update(0, 1);	
		}
		
		translate(translateX: number, translateY:number) {
			this._group.attr({
				'transform': 'translate(' + translateX + ',' + translateY + ')'
			});
		}
		
		update(minX: number, maxX: number): d3.scale.Linear<number,number> {
			this._scale.domain([minX, maxX]);
			this._scale.nice();
			this._group.call(this._axis);
			return this._scale;
		}
		
		scale(): d3.scale.Linear<number,number> {
			return this._scale;
		}
	}
}