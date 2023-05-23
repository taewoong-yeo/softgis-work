
class highchart {
    constructor($el, opts = {}){
        if(opts === undefined){
            throw new ReferenceError("차트 선택값이 없습니다.");
        }
        this.$el = $el;
        this.opts = {};

        this.opts.title = opts.title || '';
        this.opts.chart = opts.chart;
        this.opts.legend = opts.legend;
        this.opts.plotOptions = opts.plotOptions;
        this.opts.credits = opts.credits;

        this.opts.xAxis = opts.xAxis;
        this.opts.yAxis = opts.yAxis;

        this.opts.series = opts.series;
        this.$chart = null;
        
        this.data = opts.data || undefined;
        this.thema = opts.thema || undefined;
        this.colorArray = [
        	"#FE7112", "#0CEDFA", "#D2ED6D", "#B54AED"
        	, "#97D045", "#CE0CFA", "#3055BA", "#EDE155"
        	, "#5361F6", "#FAC70C", "#BA5930", "#676987"
        	, "#B059F3", "#E3FA0C", "#BA8630", "#5955ED"
        	, "#41B6C8", "#FA760C", "#EF9392", "#55EDAD"
        	, "#D0456F", "#00AD14", "#BAB030", "#876770"
        	, "#45BA43", "#FA0C89", "#BB92EF", "#C2ED55"
        	, "#C454B9", "#30AD00", "#EFE792", "#A355ED"
        	, "#6FA8FF", "#FAAA0C", "#BA4130", "#55E2ED"
        	, "#D99898", "#00AD31", "#BAB830", "#876767"
        	, "#C3BA64", "#410CFA", "#30A4BA", "#EDBF55"
        ];

        this.init();
    }

    init(){
    	Highcharts.setOptions({
			   lang: {
			      thousandsSep: ',',
			      noData: "데이터가 없습니다.",
			      drillUpText: '◀',
			   },
			   noData: {
			        style: {
			            fontWeight: 'bold',
			            fontSize: '15px',
			            color: '#000'
			        }
			   },
			   global: {
	                useUTC: false,
	                thousandsSep: ','
	            },
			   chart: {
					//backgroundColor : 'rgba(255, 255, 255, 0.0)'
				},
			   xAxis: {
				   tickWidth: 0,
				   /*labels: {
					   style: {
						   color: '#ffffff'
					   		}
				   },*/
			    },
			    yAxis: {
			    	/*labels: {
			            style: {
			                color: '#ffffff'
			            }
			        },*/
		            title: { enabled: false },
		            gridLineWidth: 0,
		            gridLineColor: '#000',
		        },
		        legend: {
		        	enabled: true,
		            /*itemStyle: {
		                color: '#ffffff',
		            },*/
		            symbolRadius: 0,
		        },
		        plotOptions: {
	                series: {
	                    states: {
	                        inactive: {
	                            opacity: 1 //차트 마우스오버시 배경 불투명도 정도
	                        },
	                        hover: {
	                            halo: false, //pie chart mouseover effect
	                        }
	                    },
	                    stickyTracking: false, //배경 마우스오버시 포인터 활성화 여부
	                    borderWidth : '',
	                },
	                wordcloud: {
						minFontSize: 5
					},
	            },
		        tooltip: {
		            shared: true
		        },
		        credits: {
		            enabled: true, //하단 참조 주소값 여부
		            text: '',
		            href: ''
		        },
		        exporting: {
	                enabled: false, //햄버거 버튼 여부
	                filename: '차트',
	                buttons: {
	                    contextButton: {
	                      menuItems: ['downloadPNG', 'downloadJPEG']
	                    }
	                  }
	            }
			});
    	
    	let $chart
    	
    	if(this.opts.chart.type){
	    	if(this.opts.chart.type == "dualAxes"){
	    		$chart = Highcharts.chart(this.$el, this.dualAxes());
	    	}else if( (this.opts.chart.type).indexOf("Normal") != -1 ){
	    		$chart = Highcharts.chart(this.$el, this.stackNormal());
	    	}else if( (this.opts.chart.type).indexOf("Percent") != -1 ){
	    		$chart = Highcharts.chart(this.$el, this.stackedPercent());
	    	}else if( this.opts.chart.type == "pie" ){
	    		$chart = Highcharts.chart(this.$el, this.pie());
	    	}else{
	    		$chart = Highcharts.chart(this.$el, this.getHighchartOption());
	    	}
    	}else{
    		$chart = Highcharts.chart(this.$el, this.getHighchartOption());
    	}
        
        this.$chart = $chart;
    }

    getHighchartOption(){
    	let colorArray = this.colorArray;
    	
        let chartOption = {
            colors: colorArray,
            chart : {
                renderTo : this.$el,
                backgroundColor : 'rgba(255, 255, 255, 0)'
            },
            title: {
                text: this.title
            },
            credits: {
            	enabled: true, //하단 참조 주소값 여부
                text: '',
                href: ''
            },
        }
        
        return $.extend(true, {}, chartOption, this.opts);
    }

    getChart(){
        return this.$chart;
    }

    addOption(opt){
        var chartObj = new Object();
        chartObj = getChart(this);
        chartObj.update(opt);
    }

    addSeries (data) {
        var chartObj = new Object();
        chartObj = getChart(this);
        chartObj.series = data;
        chart.addSeries(series, false);
        chart.redraw();
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////
    stackNormal(){
    	let colorArray = this.colorArray;
    		
    	let chartOption = {
    			colors: colorArray,
    			chart: {
        	    	renderTo : this.$el,
        	    },
                title: {
                    text: this.title
                },
                plotOptions: {
        	    	series: {
        	            stacking: 'normal'
        	        }
        	    },
                credits: {
                	enabled: true, //하단 참조 주소값 여부
                    text: '',
                    href: ''
                },
            }
    	
    	this.opts.chart.type = this.opts.chart.type.substring(0, this.opts.chart.type.indexOf('Normal'));
        return $.extend(true, {}, chartOption, this.opts);
    }
    
    stackedPercent(){
    	let colorArray = this.colorArray;
    	
    	let chartOption = {
    			colors: colorArray,
    			chart: {
        	    	renderTo : this.$el,
        	    },
                title: {
                    text: this.title
                },
                plotOptions: {
        	    	series: {
        	            stacking: 'percent'
        	        }
        	    },
                credits: {
                	enabled: true, //하단 참조 주소값 여부
                    text: '',
                    href: ''
                },
            }
    	
    	this.opts.chart.type = this.opts.chart.type.substring(0, this.opts.chart.type.indexOf('Percent'));
    	return $.extend(true, {}, chartOption, this.opts);
    }
    

    dualAxes(){
    	let colorArray = this.colorArray;
    	let data = this.data;
    	
    	
    	let seriesArr = [];
    	if(data){
    		data = data.data;
	    	for(var i = 0; i < data.length; i++){
	    		if(i < (data.length - 1)){
	    			seriesArr.push({type: 'column', name: data[i].name, data: data[i].data});    			
	    		}else{
	    			seriesArr.push({type: 'line', yAxis: 1, name: data[i].name, data: data[i].data, marker: {lineWidth: 2, lineColor: null}}); 
	    		}
	    	}
    	}

    	let chartOption = {
    			colors: colorArray,
    			chart: {
        	    	renderTo : this.$el,
        	    },
                title: {
                    text: this.title
                },
                yAxis: [
					{ 
						title:{
			            	text: undefined
			            },
				    }, 
				    { 
				    	title:{
			            	text: undefined
			            },
				        opposite: true
				    }],
        	    series: seriesArr,
        	    credits: {
                	enabled: true, //하단 참조 주소값 여부
                    text: '',
                    href: ''
                },
            }
    	return $.extend(true, {}, chartOption, this.opts);
    }
    pie(){
    	let colorArray = this.colorArray;
    	let data = this.data;

    	let dataSum = 0;
    	let seriesArr = [];
    	let drilldown = [];
    	let dataArr = [];

    	if(data){
    		data = data.data;
    		let category = this.data.category;
    		
	    	for(var i = 0; i < data.length; i++){
	    		dataSum = 0;
	    		dataArr = [];
	    		for(var j = 0; j < data[i].data.length; j++){
	    			dataSum += data[i].data[j];
	    			dataArr.push([ category[j], data[i].data[j] ]);
	    		}
	    		seriesArr.push({name: data[i].name, y: dataSum, drilldown: data[i].name });
	    		drilldown.push({name: data[i].name, id: data[i].name, data: dataArr});
	    	}
    	}

    	let chartOption = {
    			colors: colorArray,
    			chart: {
        	    	renderTo : this.$el,
        	    },
                title: {
                    text: this.title
                },
                plotOptions: {
                    pie: {
                    	borderWidth: 0, //데투리
        				borderColor: "", //테두리 색상
                        showInLegend: true,
                        dataLabels: {                            
                        	//distance: '-30',
                        	connectorShape: 'crookedLine',
                            crookDistance: '90%',
                            alignTo: 'plotEdges',
                            useHTML: true,
                            formatter: function () {
                            	var p = this.point;
                            	var s = this.series;		
                                var percent = Math.round(p.percentage * 100) / 100;
                                var yArr = p.y.toString().split(".");
                            	yArr[0] = yArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            	
                            	var y = yArr[0] + (yArr[1] ? "."+yArr[1] : "");
                                var labels = '<span style="color: #000; font-size: 12px;">' + percent + '% </span>';
                                
                                if(s.name != 'Series 1')

                                	labels = '<span style="color: #000; font-size: 12px;">' + y + '</span>';
                                
                                return labels;
                            },
                        	style: {
                                //textOutline: "none"
                            },
                        },
                        
                    }
                },
                tooltip:{
                	formatter: function () {
                  		var p = this.point;
                        var s = this.series;
                        var percent = Math.round(p.percentage * 100) / 100;           
                        var yArr = p.y.toString().split(".");
                    	yArr[0] = yArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    	
                    	var y = yArr[0] + (yArr[1] ? "."+yArr[1] : "");
                        var tooltip = (s.name == 'Series 1' ? p.name + ": "+percent+'%' : p.name+"<br/>"+s.name+ ": "+ y );
                        
                        return tooltip;
                    }
                },
                series: [
        	        {
        	            data: seriesArr,
        	        }
        	    ],
        	    drilldown: {
        	        series: drilldown
        	    },
        	    credits: {
                	enabled: true, //하단 참조 주소값 여부
                    text: '',
                    href: ''
                },
            }
    	
    	this.opts.xAxis.categories = [];
    	this.opts.series = [];
    	
    	return $.extend(true, {}, chartOption, this.opts);
    }
   
    /////////////////////////////////////////////////////
}


export default highchart;