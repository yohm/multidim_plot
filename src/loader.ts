/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./charting.ts"/>
/// <reference path="./dataPoint.d.ts"/>

class loader {
    
    private _chart: charting.chart;
    
    constructor(container: any) {
        this._chart = new charting.chart('#test');
        d3.json('/test/test.json', (error:any, data: Array<any>) => {
            var prepared = [];
            data.forEach( dat => {
                prepared.push({x: dat.x0, y: dat.x1});
            });
            console.log(prepared);
            this._chart.update(prepared);
        });
    }
}
