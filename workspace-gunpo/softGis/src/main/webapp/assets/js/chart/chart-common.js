
class Chart {
    constructor(opts = {}){
        if(opts === undefined){
            throw new ReferenceError("차트 선택값이 없습니다.");
        }
        this.chart = opts || {};
    }

    getObj(){ 
        let obj = new Object();
        obj.chart = new Object();
        obj.series = new Array();
        obj.series[0] = new Object();
        return obj;
    }

    init(){
        console.log("chart init === start");
        for(let i = 0; i < this.chart.renderTo.length; i++){
            let chartObj = this.getObj();
            chartObj.chart.renderTo = this.chart.renderTo[i];
            chartObj.chart.type= this.chart.type[i];
            chartObj.series[0].data = this.chart.data[i];
        	new Highcharts.chart(chartObj);
        }
    }

    //차트 아이디 찾기
    getChart(id){
        console.log("chart id search === START");
        return Highcharts.charts[document.querySelector("#" + id).getAttribute('data-highcharts-chart')];
    }

    // 차트 타입 변경
    changeType(id, type){
        console.log("chart type change === START");
        let chartObj = this.getChart(id);
        let series;
        for(var i=0;i<chartObj.series.length;i++){
            series = chartObj.series[i];
            chartObj.update({
                chart:{
                    type: type
                },
            });
            series.chart.addSeries({
                type: type,
                color: '#ff0000',
                data: series.options.data,
            }, false);
            series.remove(true);
        }
    }
    addOption(id, opt){
        this.chartObj = this.getChart(id);
        this.chartObj.update(opt);
    }
    // 차트 시리즈 추가
    addSeries (id, data) {
        console.log("addChartSeries === START");
        this.chartObj = this.getChart(id);
        this.series = data;
        chart.addSeries(this.series, false);
        chart.redraw();
    }
    // 차트 시리즈 새로 값 변경
    setSeriesData (id, data) {
        console.log("setSeriesData === START");
        this.chartObj = this.getChart(id);
        this.chartObj.series[0].setData(data);
    }
    
    /**
     * 시리즈 클릭 이벤트
     * @param id  : 차트 id
     * @param fn : callbackFunction
     */
    seriesClick(id, fn){
        console.log("series click == START");
        this.chartObj = this.getChart(id);
        this.chartObj.update({
            plotOptions: {
                series: {
                    events: {
                        click: fn
                    }
                }
            }
        })
    }
    /**
     * 마우스 오버 툴팁
     * @param id  : 차트 id
     * @param fn  : callbackFunction
     */
    // setTooltip(id, fn){
    //     console.log("chart tooltip === START");
    //     this.chartObj = this.getChart(id);
    //     this.chartObj.update({
    //         tooltip: {
    //             formatter: fn
    //         }
    //     })
    // }
    /**
     * 차트 복사
     * @param id  : 복사 id
     * @param otherId : 붙여넣기 id
     */
    chartCopy(id, otherId){
        console.log("chart copy === START");
        let options = this.getChart(id).userOptions;
        options.chart.renderTo = otherId;
        new Highcharts.Chart(options);
    }
    
    
}

export default Chart;