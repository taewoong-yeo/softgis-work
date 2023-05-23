
//차트 이벤트
function createChart(vis, data, opt){
	var vis = vis;
	
	if(vis == null || data == null){
		return false;
	}
	var type = vis.vis_type //차트타입
	var title = vis.vis_nm //차트 타이틀
	var chartId = vis.trgt_div //차트 Id
	
	var seriesYn = vis.vis_series;
	
	$("[data-chart="+chartId+"]").find(".cht-title").text(title);
	//$("[data-chart="+chartId+"]").find(".cht-std").text(데이터.날자);
	
	if(seriesYn == "Y"){
		if(type == "LINE"){
			mtLineChart(chartId, data);
		}else if(type == "COLUMN"){
			mColumnChart(chartId, data,'','normal');
		}else if(type == "BAR"){
			mbarChart(chartId, data);
		}
		
	}else{
		
		if(type == "LINE"){
			lineChart(chartId, {data: data});
		}else if(type == "COLUMN"){
			columnChart(chartId, {data: data}, opt);
		}else if(type == "BAR"){
			barChart(chartId, {data:data}, opt);
		}else if(type == "pie"){
			
		}
		
	}
	
}


//라인컬러 셋팅
function setColorEach(dataArr, colorArr){
    var colorlen = colorArr.length;
    var colorCnt = 0;
    $.each(dataArr, function(idx, val){
        if(colorCnt > colorlen){
            colorCnt = 0;
        }
        val.color = colorArr[colorCnt];
        colorCnt++;
    })
}


// 데이터 가공

//single series
function dataTrans(data, type){
	if(data == undefined){
		return false;
	}
    var dataArray = [];
    if(type == "multiSeries"){
        for(var i = 0; i < data.length; i++){
            for(var property in data[i]){
                var multiObject = {};
                multiObject.name = property;
                multiObject.y = data[0][property];
                dataArray.push(multiObject);
            }
            
            return dataArray;
        }
    }
    for(var i = 0; i < data.length; i++){
        var dataObject = {};
        dataObject.name = data[i].name;
        dataObject.hiddenValue = data[i].hiddenValue;
        if(type == 'default'){
            dataObject.y = data[i].y
        } else if(type == 'dual'){
        	dataObject.y = data[i].yy
        } else {
            dataObject.value = data[i].y
        }
        dataArray.push(dataObject);
    }
    return dataArray;
}

//multi series
function dataTransSeries(data, type, seriesNames){
	if(data == undefined){
		return false;
	}
	let seriesArr = [];
	let dataArr = []; //시리즈 수만큼 배열을 늘려줘야함
	let dataArrSub = [];
	let dataArrSub2 = [];
	let dataArrSub3 = [];
	let dataArrSub4 = [];
	if(type == "series"){ //데이터 별칭이 시리즈 네임인경우
    	for(let i = 0; i < data.length; i++){
    		let name = data[i].name;
    		var seriesName = "";
    		var seriesNameSub = "";
    		var seriesNameSub2 = "";
    		var seriesNameSub3 = "";
    		var seriesNameSub4 = "";
    		let count = 0;
    		delete data[i].name;
    		for(let property in data[i]){
    			let multiObject = {};
                multiObject.name = name;
                multiObject.y = data[i][property];
                if(count == 0){
                	dataArr.push(multiObject);
                	seriesName = property;
                }
                if(count == 1){
                	dataArrSub.push(multiObject);
                	seriesNameSub = property;
                }
                if(count == 2){
                	dataArrSub2.push(multiObject);
                	seriesNameSub2 = property;
                }
                if(count == 3){
                	dataArrSub3.push(multiObject);
                	seriesNameSub3 = property;
                }
                if(count == 4){
                	dataArrSub4.push(multiObject);
                	seriesNameSub4 = property;
                }
                count++; //시리즈 개수 카운트
    		}
    	}
    	if(dataArrSub4.length > 0){  //시리즈 수만큼 분기처리해줘야함
    		seriesArr.push({name : seriesName, data : dataArr},{name: seriesNameSub, data : dataArrSub},{name: seriesNameSub2, data : dataArrSub2},{name: seriesNameSub3, data : dataArrSub3},{name: seriesNameSub4, data : dataArrSub4});
    	}else if(dataArrSub.length > 0){
    		seriesArr.push({name : seriesName, data : dataArr},{name: seriesNameSub, data : dataArrSub});    		
    	}else {
    		seriesArr.push({name : seriesName, data : dataArr});
    	}
    	return seriesArr;
    }else if(type == "afc"){ //데이터 별칭칭이 name(카테고리) 인 경우
    	for(var i = 0; i < data.length; i++){
    		var seriesName = data[i].seriesName;
    		
    		delete data[i].seriesName;
    		
    		for(var property in data[i]){
    			var multiObject = {};
                multiObject.name = property;
                multiObject.y = data[i][property];
                
                dataArr.push(multiObject);
    		}
    		seriesArr.push({name : seriesName, data : dataArr});
    		dataArr = [];
    	}
    	return seriesArr;
    }else if(type == "notName"){ //데이터 별칭칭이 name(카테고리) 인 경우
        let eObject = {};
        let seriesName = [];
        for(var i = 0; i < seriesNames.length; i++){
            let seriesArray = [];
            let seriesObject ={};
            for(var j = 0; j < data.length; j++){            
                eObject = data[j];
                seriesArray.push(eObject[Object.keys(eObject)[i]]);   
            }
            seriesObject.name = seriesNames[i];
            seriesObject.data = seriesArray;
            seriesArr.push(seriesObject);
        }
    	return seriesArr;
    }else if(type == "vertical"){ //데이터 별칭칭이 name(카테고리) 인 경우
        let seriesName = "";
        for(var i = 0; i < data.length; i++){
            let seriesArray = [];
            let seriesObject ={};
            for(let property in data[i]){
    			let multiObject = {};
    			if(property != "nm_sgg"){
	                multiObject.y = data[i][property];
	                seriesArray.push(multiObject);
	            	seriesName = data[i].nm_sgg;
    			}
    		}
            seriesObject.name = seriesName;
            seriesObject.data = seriesArray;
            seriesArr.push(seriesObject);
        }
    	return seriesArr;
    }else { //시리즈 명칭 과 카테고리 명칭이 모두 컬럼에 있는경우
    	for(var i = 0; i < data.length; i++){
    		if(seriesName != null && seriesName != data[i].seriesName){
    			seriesArr.push({name: seriesName, data: dataArr});
    			dataArr = [];
    		}
    		
    		var multiObject = {};
    		multiObject.name = data[i].name;
    		multiObject.y = data[i].y
    		dataArr.push(multiObject);
    		
    		var seriesName = data[i].seriesName;
    	}
    	seriesArr.push({name: seriesName, data: dataArr});
    	return seriesArr;
    }
}


function multiColumnSeries(data){
    let categorieFilter = data.map(function(v){
        return v = v.name;
    });
    let dataFilter = data.filter(function(v){
        return delete v.name;
    });
    // return 오브젝트
    let resultObject = {};
    let $_arrayObject = [];
    let $_dataObject = dataFilter[0];
    for(let k in $_dataObject){
        let $_object = {};
        let $_arrayData = [];
        $_object.name = k;
        for(let i = 0; i < dataFilter.length; i++){
            let dataFilter_i = dataFilter[i];
            $_arrayData.push(dataFilter_i[$_object.name]);
        }
        $_object.data = $_arrayData;
        $_arrayObject.push($_object);
        
    }
    resultObject.categories = categorieFilter;
    resultObject.data = $_arrayObject;
    return resultObject;
}



function zones(data){
    var dataSort = data.sort(function(a, b){
        return b.y - a.y;
    });
    var maxData = dataSort[0].y;
    var zonesObject = {
        plotOptions:{
            series:{
                zones: [{
                    value: maxData*0.25,
                    color: '#ffc107'
                }, {
                    value: maxData*0.50,
                    color: '#4caf50'
                }, {
                    value: maxData*0.85,
                    color: '#2196f3'
                }, {
                    value: maxData+1,
                    color: '#f44336'
                }, {
                    color: '#607d8b'
                }]
            }
        }
    }
    return zonesObject;
}

function colorSet(maxColor, minColor){
    var colorAxis = {
            maxColor: maxColor,
            minColor: minColor
        }
    return colorAxis;
}



//차트 생성

//column chart
function columnChart(id, data, opt){
    var chartOption = {
          colorAxis : opt,
          chart:{
               renderTo : id,
               type : 'column'
           },
           xAxis:{
              type:'category'
           },
           plotOptions: {
                series : {
                    dataLabels: {
                        enabled: true,
                        y:-1,
                        x:-1
                    },
                }
            },
           tooltip : {
               useHTML:true,
           },
           series:[
               data
           ]
        }

	new Highcharts.chart(chartOption);
}

// multiColumn chart
function multiColumn(id, data, fromTo, categories, type){
    var chartOption = {
          chart:{
               renderTo : id,
               type : 'column'
           },
           xAxis:{
              categories: categories,
              type : type
           },
           yAxis: {
                breaks: [fromTo],
                events: {
                    pointBreak: pointBreakColumn
                }
            },
           plotOptions: {
                column: {
                    stacking: 'percent'
                },
                series:{
                    colorByPoint: false, //true시 line color 안변함
                }
            },
           tooltip : {
               useHTML:true,
           },
           series:data
        }

	new Highcharts.chart(chartOption);
}
//bar chart
function barChart(id, data, opt){
	var chartOption ={
    chart:{
        renderTo: id,
        type : 'bar'
    },
    colorAxis : opt,
    xAxis:{
    	type: 'category'
    },
    plotOptions: {
        series : {
            dataLabels: {
                enabled: true,
                y:-1,
                x:-1,
            },
        }
    },
    tooltip : {
    	useHTML:true,
    },
    series : [data]
};
	new Highcharts.chart(chartOption);
}
//line chart
function lineChart(id, data){
	new Highcharts.chart({
    chart:{
        renderTo : id,
        type : 'line'
    },
    xAxis: {
        type : 'category'
    },
    plotOptions: {
        series : {
            dataLabels: {
                enabled: true,
            },
            colorByPoint: false, //true시 line color 안변함
    		color: '#680094', //line color
    		marker: { //꼭짓점
                enabled: true,
                symbol: 'circle',
                radius: 5, //크기
                fillColor: '#ffffff',
                lineColor: '#680094', //테두리
                lineWidth: 2,
            }
        },
    },
    tooltip : {
    	useHTML:true,
    },
    series : [
        data
    ]
});
}
//line chart
function multiLineChart(id, data, categorie){
	new Highcharts.chart({
    chart:{
        renderTo : id,
        type : 'line'
    },
    xAxis: {
        //categories : categorie
        type: "category",
    },
    plotOptions: {
        series : {
            dataLabels: {
                enabled: true,
            },
            colorByPoint: false, //true시 line color 안변함
    		marker: { //꼭짓점
                enabled: false,
                // symbol: 'circle',
                // radius: 5, //크기
                // fillColor: '#ffffff',
                // lineColor: '#680094', //테두리
                // lineWidth: 2,
            }
        },
    },
    tooltip : {
    	useHTML:true,
    },
    series : data
});
}
//pie chart
function pieChart(id, data){ 
    new Highcharts.chart({
        // colors : ['#fe0000', '#0a51a1'],
        chart : {
            renderTo : id,
            type : 'pie',
            margin: [0,0,0,0]
        },
        xAxis:{
            type:'category'
        },
        tooltip : {
            useHTML:true,
            pointFormat: '<b>{point.percentage:.2f}%</b>'
        },
        legend: {
     	   enabled:true,
            align: 'left',
            verticalAlign: 'middle',
            layout: 'vertical',
            itemStyle: {
                fontSize: "9px",
            }
        },
        plotOptions: {
            series:{
                states: {
                    hover: {
                        opacity: 1
                    }
                }
            },
            pie: {
                allowPointSelect: false,
                enabled: true,
                dataLabels: {
                    enabled: true,
                    format : '{point.percentage:.2f} %', //.f 소수점자리
                    distance: '-50%' //label position
                },
                showInLegend: true,
                innerSize: '5%', //도넛차트 원크기
            }
        },
        series : [
            { data : data }
        ],

    });
}
//area chart
function areaChart(id, data){
    new Highcharts.chart({
        chart : {
            renderTo : id,
            type: 'area',
        },
        xAxis:{
            type:'category',
            allowDecimals: false, //소수점허용 여부
        },
        tooltip : {
            useHTML:true,
        },
        plotOptions: {
            area: {
                marker: { //line marker
                    enabled: false, 
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series : [
            data
        ],
    
    });
}

//tree map
/*data 형식 data = {data : [{name:v, value:v, hiddenValue: v}, {name:v, value:v, hiddenValue: v}, {name:v, value:v, hiddenValue: v}]}*/
function treeMap(id, data, hidVal){
	
    new Highcharts.chart({
        chart : {
            renderTo : id,
            type: 'treemap',
            events: {
                selection: function(chart, hidVal) {
                }
            }
        },
        xAxis:{
            type:'category',
        },
        colorAxis: {
            minColor: '#fff',
            maxColor: '#0d3e99'
        },
        tooltip : {
            useHTML:true,
        },
        plotOptions: {
            series:{
                layoutAlgorithm: 'squarified',
                allowPointSelect: true,
                dataLabels:{
                	enabled:true,
                	style:{
                		textOutline : "none",
                		fontWeight : "normal",
                	}
                },
                animation: {
                    duration: 0
                }
            }
            
        },
        series : [
            data
        ],
    });
}

//heat map 
//data 형식 data = {data : [[x, y, val], [x, y, val], [x, y, val]]} 
//data 형식 data = {data : [{x:v, y:v, value:v, hiddenValue: v}, {x:v, y:v, value:v, hiddenValue: v}, {x:v, y:v, value:v, hiddenValue: v}]}
function heatMap(id, data, xCategory, yCategory){
    new Highcharts.chart({
        chart : {
            renderTo : id,
            type: 'heatmap',
        },
        xAxis:{
            type:'category',
            categories : xCategory,
        },
        yAxis: {
            categories: yCategory,
            title: null,
        },
        colorAxis: { //수치에 따른 박스 컬러
            minColor: '#FFFFFF',
            maxColor: '#00aeff'
        },
        legend: {
            enabled: false, //범례 여부
            align: 'right', // 막대 정렬
            layout: 'vertical', // 막대 모양
            margin: 0, 
            verticalAlign: 'top', //세로 정렬
            symbolHeight: 280 //막대 길이
        },
        tooltip : {
            useHTML:true,
        },
        plotOptions: {
            series:{
                borderWidth: 1, //테두리
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }
        },
        series : [
            data
        ],
    });
}

//lineColumnChart
function lineColumChart(id, colName, colData, lineName, lineData, lineColor, unit, othUnit){
	new Highcharts.chart({
    chart:{
        renderTo : id,
    },
    colorAxis: [{
        maxColor: '#6ca1ef',
        minColor: '#CBDBFA',
    }],
    xAxis: {
        type: 'category',
    },
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}',
        },
        title:{
        	text: undefined
        }
    }, { // Secondary yAxis
        
        labels: {
            format: '{value}',
        },
        title: {
            text: undefined
        },
        opposite: true // 좌우 배치
    }],
    tooltip : {
    	useHTML:true,
    },
    series : [
        {
            name : colName,
            type: 'column',
            data : colData,
            tooltip: {
                valueSuffix: unit
            },
            dataLabels:{
            	enabled : true,
            	y:-1,
            	x:-1
            },
                
        },
        {
            name : lineName,
            type: 'line',
            yAxis: 1,
            data : lineData,
            tooltip: {
                valueSuffix: othUnit
            },
            color: lineColor,
    		marker: {
                enabled: true,
                symbol: 'circle',
                radius: 4,
                fillColor: '#ffffff',
                lineColor: lineColor,
                lineWidth: 2,
            },
            colorAxis: 1
        }
    ],
    plotOptions:{
    	series: {
			colorByPoint: false,
    	},
    }
});
}

//multi line chart
function mtLineChart(id, data){
	new Highcharts.chart({
    chart:{
        renderTo : id,
        type : 'spline'
    },
    xAxis: {
        type : 'category'
    },
    yAxis: data.yAxis,
    legend: {
 	   enabled:true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        itemStyle: {
            fontSize: "9px",
        }
    },
    plotOptions: {
        series : {
            dataLabels: {
                enabled: true,
                format : data.format
            },
            colorByPoint: false, //true시 line color 안변함    		
    		marker: { //꼭짓점
                enabled: true,
                symbol: 'circle',
                radius: 4, //크기
                lineWidth: 2,
            }
        },
    },
    tooltip : {
    	useHTML:true,
    },
    series : data
});
}

//multi columnChart
function mColumnChart(id, data, opt, stacking){
    var columnChartOption = {
          colorAxis : opt,
          chart:{
               renderTo : id,
               type : 'column'
           },
           xAxis:{
        	   categories:data.categories
           },
           yAxis:{
        	   labels: {
                   format: '{value}',
               },
//               max: data.max
           },
           legend: {
        	   enabled:true,
               align: 'center',
               verticalAlign: 'bottom',
               layout: 'horizontal',
               itemStyle: {
                   fontSize: "9px",
               }
           },
           plotOptions: {
                series : {
                    dataLabels: {
                        enabled: false,
                        y:-1,
                        x:-1
                    },
                    colorByPoint: false,
                },
                column: {
                    borderWidth: 0,
                	stacking : stacking,
                }
            },
           tooltip : {
               useHTML:true,
               shared:true
           },
           series:data.data
        }

	new Highcharts.chart(columnChartOption);
}

//multi barChart
function mbarChart(id, data, opt, stacking){
    var columnChartOption = {
          colorAxis : opt,
          chart:{
               renderTo : id,
               type : 'bar'
           },
           xAxis:{
              type:'category'
           },
           legend: {
        	   enabled:false,
               align: 'right',
               verticalAlign: 'top',
               layout: 'horizon',
               itemStyle: {
                   fontSize: "9px",
               }
           },
           plotOptions: {
                series : {
                    dataLabels: {
                        enabled: true,
                        y:-1,
                        x:-1
                    },
                    colorByPoint: false,
                },
                column: {
                    borderWidth: 0,
                	stacking : stacking,
                }
            },
           tooltip : {
               useHTML:true,
           },
           series:data
        }

	new Highcharts.chart(columnChartOption);
}


//multi columnChart2
function mColumnChart2(id, data, opts){
    var columnChartOption = {
          chart:{
               renderTo : id,
               type : 'column'
           },
           xAxis:{
              categories: ['월','화','수','목','금','토','일']
           },
           legend:{
                enabled: false,
                itemStyle: {
                    fontSize: '10px'
                }
           },
           plotOptions: {
                series : {
                    dataLabels: {
                        enabled: true,
                        y:-1,
                        x:-1
                    },
                    // pointWidth: 30, //bar 너비 지정.
                    colorByPoint: false,
                }
            },
           tooltip : {
               useHTML:true,
           },
           series:data
        }

	new Highcharts.chart(columnChartOption);
}


//multi line chart backGround
function mCutomtLineChart(id, data){
	new Highcharts.chart({
    chart:{
        renderTo : id,
        type : 'line',
    },
    xAxis: {
        type : 'category',
    },
    legend: {
		enabled: true,
        verticalAlign: 'top',
        squareSymbol : true,
        symbolHeight: 20
    },
    plotOptions: {
        series : {
            dataLabels: {
                enabled: false,
            },
            colorByPoint: false, //true시 line color 안변함    		
    		marker: { //꼭짓점
                enabled: false,
            },
            states: {
            	hover: {
            		enabled: false
            		}
            }
        },
    },
    tooltip : {
    	useHTML:true,
    },
    series : data
});
}

//word cloud
function wordCloud(data, id){
	Highcharts.chart({
		chart:{
	        renderTo : id,
	        type: 'wordcloud',
	    },
	    series: [{
	        type: 'wordcloud',
	        data,
	        name: '키워드 수'
	    }],
	    tooltip: {
	        headerFormat: '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
	    }
	});
}

//3D columnChart
function column3D(id, data){
	new Highcharts.Chart({
	    chart: {
	        renderTo: id,
	        type: 'column',
	        options3d: {
	            enabled: true,
	            alpha: 0,
	            beta: 0,
	            depth: 24,
	            viewDistance: 25
	        }
	    },
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis:{
	    	type:'category'
	    },
		legend:{
			enabled: false
		},
	    plotOptions: {
	        column: {
	            depth: 25
	        },
			series: {
	            pointWidth: 20
	        }
	    },
	    series: [data]
	});
}


// function getObj(){ 
//     let obj = new Object();
//     obj.chart = new Object();
//     obj.series = new Array();
//     obj.series[0] = new Object();
//     return obj;
// }

// function init(opts = {}){
//     console.log("chart init === start");
//     var chartObj = getObj();
//     chartObj.chart.renderTo = opts.renderTo;
//     chartObj.chart.type= opts.type;
//     chartObj.series[0].data = opts.data;
// 	new Highcharts.chart(chartObj);
// }

//차트 아이디 찾기
function getChart(id){
    //console.log("chart id search === START");
    return Highcharts.charts[document.querySelector("#" + id).getAttribute('data-highcharts-chart')];
}

// 차트 타입 변경
function changeType(id, type){
    console.log("chart type change === START");
    let chartObj = getChart(id);
    let series;
    let serie;
    for(var i=0;i<chartObj.series.length;i++){
        series = chartObj.series[i].data;
        serie = chartObj.options.series;
        for(let j = 0; j<serie[i].data.length; j++){
            delete serie[i].data[j].dataLabels
        }
        chartObj.update({
            chart:{
                type: type
            },
            legend:{
            	enabled:false,
            },
            plotOptions:{
            	series:{
            		dataSorting: {
            	        enabled: false
            	    },
            	}
            },
            series : serie
        });
        // series.chart.addSeries({
        //     type: type,
        //     // color: '#ff0000',
        //     data: series.options.data,
        // }, false);
        // series[0].chart.remove();
    }
    if(type == "pie"){
        var arr = chartObj.options.series;
        var arr2 = chartObj.series[0].data;
        var newSeries;
        var percentage = [];
        $.each(arr2, function(i, v){
            percentage.push(v.percentage);
        });
        rotate = function () {
            $.each(arr, function (i, p) {
                angle1 = 0;
                angle2 = 0;
                angle3 = 0;
                allY = 0;
                $.each(p.data, function (i, p) {
                    allY += p.y;
                    p.dataLabels = {}
                    p.dataLabels.style = {}
                });

                $.each(p.data, function (i, p) {
                    angle2 = angle1 + p.y * 360 / (allY);
                    angle3 = angle2 - p.y * 360 / (2 * allY);
                    if(angle3>=180){
                    p.dataLabels.rotation=90 + angle3;
                    }else{
                    p.dataLabels.rotation=-90 + angle3;
                    }
                    angle1 = angle2;
                    if(percentage[i] <= 3){
                        p.dataLabels.distance = 25;
                        p.dataLabels.style.color = '#333';
                        p.dataLabels.rotation = 0;
                        p.dataLabels.y = 0
                        p.dataLabels.x = 0
                    }
                });

                newSeries = p;
            });
        };
        rotate();
    	chartObj.update({
    		legend:{
    			enabled:true,
				align: 'left',
				layout: 'vertical',
				verticalAlign: 'top',
				//y: 150
    		    },
    		 plotOptions:{
    			 pie:{
    				 dataLabels:{
    					 enabled : true,
    					 distance: -60,
    					 y : 10,
                         x:2,
    					 format : '{point.percentage:.1f} %', //.f 소수점자리
    					 style:{ // 데이터 수치 표시 스타일
    							color : "#ffffff", //텍스트 컬러
    							textOutline : "none", // 데이터 수치표시 테두리
    						}
    				 },
    				 showInLegend :true, //pie 범례
    				 borderWidth: 1, //데투리
    			 }
    		 },
             series: newSeries
    	});
    }else{
    	
    }
}
function addOption(id, opt){
    var chartObj = new Object();
    chartObj = getChart(id);
    chartObj.update(opt);
    /*console.log(chartObj);*/
}
// 차트 시리즈 추가
function addSeries (id, data) {
    //console.log("addChartSeries === START");
    var chartObj = new Object();
    chartObj = getChart(id);
    chartObj.series = data;
    chart.addSeries(series, false);
    chart.redraw();
}
// 차트 시리즈 새로 값 변경
function setSeriesData (id, data) {
    //console.log("setSeriesData === START");
    var chartObj = getChart(id);
    chartObj.series[0].setData(data);
}

/**
 * 시리즈 클릭 이벤트
 * @param id  : 차트 id
 * @param fn : callbackFunction
 */
function seriesClick(id, fn){
    //console.log("series click == START");
    var chartObj = getChart(id);    
    chartObj.update({
        plotOptions: {
            series: {
                events: {
                    click: fn
                }
            }
        }
    })
}
function selectData(id, fn){
	//console.log("series select == START");
	var chartObj = getChart(id);    
    chartObj.update({
    	plotOptions:{
    		series:{
    			point: {
    			    'events': {
    			      click: fn,
    			    },
    			},
    		},
    	}
    })
}
/**
 * 마우스 오버 툴팁
 * @param id  : 차트 id
 * @param fn  : callbackFunction
 */
function setTooltip(id, fn){
     //console.log("chart tooltip === START");
     var chartObj = getChart(id);
     chartObj.update({
         tooltip: {
             formatter: fn
         }
     })
 }
/**
 * 차트 복사
 * @param id  : 복사 id
 * @param otherId : 붙여넣기 id
 */
function chartCopy(id, otherId){
    //console.log("chart copy === START");
    let options = getChart(id).userOptions;
    options.chart.renderTo = otherId;
    options.chart.series.dataSorting.enabled = false;
    
    new Highcharts.Chart(options);
}
    
    
function pointBreakColumn(e) {
    var point = e.point,
        brk = e.brk,
        shapeArgs = point.shapeArgs,
        x = shapeArgs.x,
        y = this.translate(brk.from, 0, 1, 0, 1),
        w = shapeArgs.width,
        key = ['brk', brk.from, brk.to],
        path = ['M', x, y, 'L', x + w * 0.25, y + 4, 'L', x + w * 0.75, y - 4, 'L', x + w, y];

    if (!point[key]) {
        point[key] = this.chart.renderer.path(path)
            .attr({
                'stroke-width': 2,
                stroke: point.series.options.borderColor
                // 'stroke': 'black',
            })
            .add(point.graphic.parentGroup);
    } else {
        point[key].attr({
            d: path
        });
    }
}


function setColor(id, colors){
    let chart = getChart(id);

    chart.series.forEach(function(v, i){
        chart.series[i].update({
            color : colors[i]
        })
    });
}