/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="./ScatterPlot.ts"/>
/// <reference path="./ClickableScatterPlot.ts"/>
/// <reference path="./dataPoint.d.ts"/>

class loader {
    
    private _chart: charting.ClickableScatterPlot;
    private _data: Array<Object>;
    
    constructor(spContainer: any, pcContainer: any) {
        this._chart = new charting.ClickableScatterPlot('#test');
        d3.json('/test/test.json', (error:any, data: Array<Object>) => {
            this._data = data;
            var keys: Array<string> = Object.keys( data[0] );
            this.addOption(keys);
            this.replot(keys[0], keys[1]);
            this.addPCPlot(pcContainer);
        });
    }
    
    private addPCPlot(container: any) {
        /*
        var keys = Object.keys(this._data[0]);
        var dat_array = this._data.map( (dat:Object) => {
            var values = keys.map( (key:string) => dat[key] )
            return values;
        });
        console.log(keys, dat_array);
        */
        var pc = d3.parcoords()(container)
            .data( this._data )
            .render()
            .ticks(3)
            .createAxes();
        pc.reorderable().brushMode("1D-axes").alphaOnBrushed(0.2);
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
