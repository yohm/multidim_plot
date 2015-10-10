/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./charting.ts"/>
/// <reference path="./dataPoint.d.ts"/>

class loader {
    
    private _chart: charting.chart;
    
    constructor(container: any) {
        this._chart = new charting.chart('#test');
        d3.json('/test/test.json', (error:any, data: Array<any>) => {
            var dataToPoint: (d:any)=>charting.dataPoint = (d:any) =>  {
                return {x: d.x0, y: d.x1};
            }
            this._chart.update<any>(data, dataToPoint);
        });
    }
}
