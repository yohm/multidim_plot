/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./charting.ts"/>
/// <reference path="./dataPoint.d.ts"/>

class loader {
    
    private _chart: charting.chart;
    private _data: Array<Object>;
    
    constructor(container: any) {
        this._chart = new charting.chart('#test');
        d3.json('/test/test.json', (error:any, data: Array<Object>) => {
            this._data = data;
            var keys: Array<string> = Object.keys( data[0] );
            this.addOption(keys);
            this.replot(keys[0], keys[1]);
        });
    }
    
    private addOption(keys: Array<string>) {
        var xSelect = d3.select('select#xSelect');
        var xOptions = xSelect.selectAll('option').data(keys);
        xOptions.enter().append('option').text( (d:string) => d )
            .property('selected', (_,i:number) => i==0); // set default value to the first key
        var ySelect = d3.select('select#ySelect');
        var yOptions = ySelect.selectAll('option').data(keys);
        yOptions.enter().append('option').text( (d:string) => d )
            .property('selected', (_,i:number) => i==1); // set default value to the second key
        
        var getSelected = (select: d3.Selection<any>) => {
            var selNode = select.node();
            var selected = selNode.options[selNode.selectedIndex].value;
            return selected;
        }
        var updatePlot = () => {
            var selectedX = getSelected( xSelect );
            var selectedY = getSelected( ySelect );
            this.replot( selectedX, selectedY );
        }
        xSelect.on('change', updatePlot );
        ySelect.on('change', updatePlot );
    }
    
    private replot(xkey:string, ykey: string) {
        console.log(xkey,ykey);
        var dataToPoint: (d:Object)=>charting.dataPoint = (d:Object) => {
            return {x: d[xkey], y: d[ykey]};
        }
        this._chart.update<Object>(this._data, dataToPoint);
    }
}
