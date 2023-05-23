
//옵션설정
Highcharts.setOptions({
    chart: {

    },
    global: {
        useUTC: false, // 시간이 맞지 않을때
        thousandsSep: ',' // 천단위 콤마 설정
    },
    title: {
        text: undefined //chart title
    },
    lang: {
        thousandsSep: ',' //천단위 콤마 설정
    },
    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
    xAxis: {
        labels: {
            autoRotation: undefined, //글자 겹칠시 회전 설정
        },
        tickWidth: 0 //수치범위표시 연결 선굵기
    },
    yAxis: {
        title: { enabled: false },
    },
    plotOptions: {
        series: {
            colorByPoint: true,
            states: {
                inactive: {
                    opacity: 1 //차트 마우스오버시 배경 불투명도 정도
                },
                hover: {
                    halo: false, //pie chart mouseover effect
                    color: '#576574' //마우스오버시 차트 색상
                }
            },
            stickyTracking: false, //배경 마우스오버시 포인터 활성화 여부
            stacking: undefined, //series 겹침 여부
        },
        pie: {
            borderColor: null //테두리 색상
        }
    },
    tooltip: {
        shared: false //툴팁 공유 //여러개 상요시 false 해야 같이 선택안됨
    },
    legend: {
        enabled: false //범례 여부
    },
    credits: {
        enabled: false //하단 참조 주소값 여부
    },
    exporting: {
        enabled: false //햄버거 버튼 여부
    }
});

// id = totalChart
// default type = treeMap
Highcharts.chart({
    chart: {
        renderTo: 'totalChart',
        type: "treemap",
        height: '300px'
    },
    series: [{
        data: [{
            id: 'A',
            name: 'Apples',
        }, {
            id: 'B',
            name: 'Bananas',
        }, {
            id: 'O',
            name: 'Oranges',
        }, {
            name: 'Anne',
            parent: 'A',
            value: 5
        }, {
            name: 'Rick',
            parent: 'A',
            value: 3
        }, {
            name: 'Peter',
            parent: 'A',
            value: 4
        }, {
            name: 'Anne',
            parent: 'B',
            value: 4,
        }, {
            name: 'Rick',
            parent: 'B',
            value: 10
        }, {
            name: 'Anne',
            parent: 'O',
            value: 1
        }, {
            name: 'Rick',
            parent: 'O',
            value: 3
        }, {
            name: 'Peter',
            parent: 'O',
            value: 3
        }, {
            name: 'Susanne',
            parent: 'Kiwi',
            value: 2,
        }]
    }]
});

// id = ratioChart
// default type = pie
Highcharts.chart({
    chart: {
        renderTo: 'ratioChart',
        type: 'pie',
        height: '120px',
        margin: [0, 0, 0, 0],
    },
    plotOptions: {
        pie: {
            dataLabels: { //그래프 데이터표시 설정
                enabled: true,
                format: '{point.y} %',
                style: {
                    color: '#000',
                    textOutline: "none"
                },
            },
        }
    },
    series: [{
        data: [50.13, 49.87]
    }],
});


// id = ratioChart2
// default type = pie
Highcharts.chart({
    chart: {
        renderTo: 'ratioChart2',
        type: 'pie',
        height: '120px',
        margin: [0, 0, 0, 0],
    },
    tooltip: {
        headerFormat: '2019년 내국인 {point.x}인구<br>',
        pointFormat: '<hr><span>{point.y}명'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: { //그래프 데이터표시 설정
                enabled: true,
                format: '{point.percentage:.2f} %',
                style: {
                    color: '#fff',
                    textOutline: "none" //텍스트 테두리
                },
                distance: '-50%' //파이 수치 포지션
            },
            innerSize: '5%', //도넛모양 원안에 원사이즈
        }
    },
    series: [{
        data: [25065623, 24934662]
    }],
});



// id = disChart
// default type = column
Highcharts.chart({
    chart: {
        renderTo: 'disChart',
        height: '160px'
    },
    tooltip: {
        formatter: function () {
            return '<span style="font-size:11px">2019년 ' + this.key + '세 인구</span><br><hr><span>' + this.point.y + '명'
        },
    },
    //	plotOptions: {
    //		column : {
    //			stacking: 'normal', //데이터 수치표시 (총 수치 표시) stackLabels 사용시 필수
    //            dataLabels: {
    //                enabled: false,
    //            }
    //        }
    //    },
    //	xAxis: { //x축
    //		type : 'category',
    //		plotBands : [
    //			{ color : '#F4FAFD', from: -1, to: 2},
    //			{ color : '#FEFDF0', from: 1.5, to: 3.5 },
    //			{ color : '#F2F8EF', from: 3.5, to: 6.5 },
    //			{ color : '#FCEFF5', from: 6.5, to: 12.5 },
    //			{ color : '#FEF7EE', from: 12.5, to: 18 }
    //			], //영역별 배경색
    //	}, 
    //	yAxis: { //y축
    //		min: 0,
    //    	stackLabels: { //데이터 수치 표시(총 수치 표시)
    //            enabled: true,
    //        },
    //		title: {enabled: false }, //y축 타이틀
    //		gridLineWidth: 0, //그리드 선제거
    //		tickAmount: 6 // 그리드 눈금자 수
    //	},
    series: [{ //데이터
        type: 'column',
        data: [
            { name: '0~4', y: 1882 },
            { name: '5~9', y: 2277 },
            { name: '10~14', y: 2234 },
            { name: '15~19', y: 2637 },
            { name: '20~24', y: 3414 },
            { name: '25~29', y: 3613 },
            { name: '30~34', y: 3305 },
            { name: '35~39', y: 4000 },
            { name: '40~44', y: 3855 },
            { name: '45~49', y: 4449 },
            { name: '50~54', y: 4322 },
            { name: '55~59', y: 4286 },
            { name: '60~64', y: 3689 },
            { name: '65~69', y: 2492 },
            { name: '70~74', y: 1927 },
            { name: '75~79', y: 1595 },
            { name: '80~84', y: 1075 },
            { name: '85~', y: 728 }
        ],
        pointWidth: 30, // bar 너비

    }],
    zoneAxis: 'x',
    zones: [{
        value: '0~4',
        color: '#f7a35c'
    }],
});

// id = moveChart
// default type = bar
Highcharts.chart({
    chart: {
        renderTo: 'residenceChart',
        height: '160px',
        type: 'bar',
    },
    tooltip: { //그래프 오버시 툴팁
        enabled: false
    },
    series: [{ //데이터
        data: [
            { y: 24.2 },
            { y: 20.8 },
            { y: 14.9 },
            { y: 13.7 },
            { y: 13.1 },
            { y: 12.7 },
            { y: 12.4 },
            { y: 12.2 },
        ],
        borderRadius: 3, //테두리 굴곡
        pointWidth: 10 // bar 너비
    }],
});

// id = allCheckChart
// default type = bar
Highcharts.chart({
    chart: {
        renderTo: 'allCheckChart',
        height: '200px',
        type: 'column',
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        }
    },
    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        // name: 'Population',
        data: [
            { name: 'Shanghai', y: 24.2 },
            { name: 'Beijing,', y: 20.8 },
            { name: 'Karachi', y: 14.9 },
            { name: 'Shenzhen', y: 13.7 },
            { name: 'Guangzhou', y: 13.1 },
            { name: 'Istanbul', y: 12.7 },
            { name: 'Mumbai', y: 12.4 },
            { name: 'moscow', y: 12.2 },

        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});



// 함수 바로 실행
(function (w, d) {

    // 차트 Obj
    chartObj = {};
    // chartObj.type = [ // 차트 종류
    //     "line",
    //     "pie",
    //     "bar",
    //     "column",
    //     "treeMap",
    // ];
    chartObj.chartId = '';
    chartObj.chart = {
        type : ''
    }
    chartObj.categories = {};
    chartObj.series = {
        type: '',
        name: '',
        color: '',
        data: {}
    },
    // chartObj.tooltip;
    chartObj.xAxis = {
        labels: {
            enabled: true
        },
        min: 0,
        max: 100,
        tickWidth: 0,
        tickInterval: 10
    },
    // 차트 이벤트
    chartObj.event = {
        init: function () {

        },
        clear: function () {
            // destory 하여도 undefined로 남음
            Highcharts().destroy();
            chart();
        },
        // 차트 아이디 찾기
        findChart: function (id) {
            console.log("id = " + id);
            return Highcharts.charts[document.querySelector("#" + id).getAttribute('data-highcharts-chart')]
        },
        // 차트 타입 변경
        changeType: function (chart, newType) {
            console.log("changeType === START");
            var series = chart.series[0];
            try {
                // chart.update({
                //     chart: {
                //         type: newType,
                //     },
                //     series: {
                //         type: newType
                //     }
                // });
                // chart.redraw();
                var serie;
                for(var i=0;i<chart.series.length;i++)
                    {

                        serie = chart.series[i];
                        chart.update({
                            chart:{
                                type: newType
                            }
                        });
                        serie.chart.addSeries({
                            type: newType,
                            // name: serie.name,
                            // color: serie.color,
                            data: serie.options.data
                        }, false);
                        serie.remove(true);
                    }


            } catch (e) {
                console.log(e);
                alert(e);
            }
        },
        // 차트 시리즈 추가
        addChartSeries: function (chart) {
            console.log("addChartSeries === START");
            series = chart.series[0];
            // chartObj.series.type = chart.types;
            chartObj.series.name = series.name;
            chartObj.series.color = series.color;
            chartObj.series.data = series.options.data;
            try {
                chart.addSeries(chartObj.series, false);
                chart.redraw();
                // series.remove();
            } catch (e) {
                console.log(e);
                alert(e);
            }
        },
        // 차트 포인트 추가
        addPointData: function (series) {
            console.log("addPointData === START");
            try {
                chartObj.series.data = series.options.data;
                chartObj.series[0].addPoint();
                chart.redraw();
            } catch (e) {
                console.log(e);
            }
        },
        // 차트 포인트 삭제
        deletePointData: function (series) {
            console.log("deletePointData === START");
            try {
                chartObj.series.data = series.options.data;
                chartObj.series[0].data[0].remove();
            } catch (e) {
                console.log(e);
            }
        },
        // 차트 시리즈 새로 값 변경
        setSeriesData: function (chart) {
            console.log("setSeriesData === START");
            try {
                chart.series[0].setData([
                    ['Shanghai', 34.2],
                    ['Beijing', 40.8],
                    ['Karachi', 34.9],
                    ['Shenzhen', 13.7],
                    ['Guangzhou', 13.1],
                    ['Istanbul', 12.7],
                    ['Mumbai', 12.4],
                    ['Moscow', 12.2],
                    ['São Paulo', 12.0],
                    ['Delhi', 11.7],
                    ['Kinshasa', 11.5],
                    ['Tianjin', 11.2],
                    ['Lahore', 11.1],
                    ['Jakarta', 10.6],
                    ['Dongguan', 10.6],
                    ['Lagos', 10.6],
                    ['Bengaluru', 10.3],
                    ['Seoul', 9.8],
                    ['Foshan', 9.3],
                    ['Tokyo', 9.3]
                ]);
            } catch (e) {
                console.log(e);
            }
        },
        modalChart() {
            console.log("modalChart === START");
        },
        //////---
        /*차트 변경, 차트 생성, 차트 데이터 선택, 차트 프린트, 차트 클릭 이벤트*/
        //column chart
        columnChart: function (id, data) {
            return new Highcharts.chart({
                chart: {
                    renderTo: id,
                    type: 'column'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    stackLabels: {
                        enabled: true,
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                        }
                    }
                },
                tooltip: {
                    useHTML: true,

                },
                series: [{
                    data: data,
                }],

            });
        },

        //bar chart
        barChart: function (id, data) {
            return new Highcharts.chart({
                chart: {
                    renderTo: id,
                    type: 'bar'
                },
                xAxis: {
                    type: 'category'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                },
                series: [{
                    data: data,
                }]
            });
        },

        //line chart
        lineChart: function (id, data) {
            return new Highcharts.chart({
                chart: {
                    renderTo: id,
                    type: 'line'
                },
                xAix: {
                    type: 'category'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                },
                series: [{
                    data: data,
                }]
            });
        },

        //pie chart
        pieChart: function (id, data) {
            return new Highcharts.chart({
                chart: {
                    renderTo: id,
                    type: 'pie',
                },
                xAxis: {
                    type: 'category'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.2f} %', //.f 소수점자리
                            style: {
                                color: '#fff',
                                textOutline: "none" //텍스트 테두리
                            },
                            distance: '-50%' //label position
                        },
                        innerSize: '5%', //도넛차트 원크기
                    }
                },
                series: [{
                    data: data,
                }],

            });
        },

        //mouseover tooltip
        setTooltip : function (fn) {
            options = {
                tooltip: {
                    formatter: fn
                }
            }

            return options;
        },
        //chart click event
        setChartClick : function (fn) {
            options = {
                chart: {
                    events: {
                        click: fn
                    }
                }
            }

            return options;
        },
        //series click event
        setSeriesClick : function (fn) {
            options = {
                plotOptions: {
                    series: {
                        events: {
                            click: fn
                        }
                    }
                }
            }

            return options;
        },
        //series mouseover event
        setSeriesMouseOver : function (fn) {
            options = {
                plotOptions: {
                    series: {
                        events: {
                            mouseOver: fn
                        }
                    }
                }
            }

            return options;
        },
        //series mouseout event
        setSeriesMouseOut : function (fn) {
            options = {
                plotOptions: {
                    series: {
                        events: {
                            mouseOut: fn
                        }
                    }
                }
            }

            return options;
        },
        //차트 복사
        chartCopy : function (id, otherId) {
            var options = this.findChart(id).userOptions;
            options.chart.renderTo = otherId;
            return new Highcharts.Chart(options);
        },

        //수치표시 제거
        removeLabel : function () {
            var options = {
                yAxis: {
                    stackLabels: {
                        enabled: false,
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: false,
                        }
                    }
                }
            };

            return options;
        },

        //pie chart options
        setPieOption : function (dp, innerSize, style) {
            var style = style != null ? style : {};
            options = {
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.' + dp + 'f} %', //.f 소수점자리
                            style: style,
                            distance: '-50%' //label position
                        },
                        innerSize: innerSize, //도넛차트 원크기
                    },
                }
            };

            return options;
        },
        //그리드 선 제거
        removeGrid : function() {
            options = {
                yAxos: {
                    gridLineWidth: 0,
                }
            }

            return options;
        },
        //series 영역설정
        setZone: function (valueArr, colorArr, defultColor) {
            var optionArr = new Array();
            if (valueArr.length != colorArr.length) {
                throw "배열의 수가 일치 하지 않습니다.";
            }
            for (i = 0; i < valueArr.length; i++) {
                optionArr.push({ value: valueArr[i], color: colorArr[i] });
            }
            if (defultColor != null) {
                optionArr.push({ color: defultColor });
            }

            options = {
                plotOptions: {
                    series: {
                        zones: optionArr,
                    }
                }
            }
            return options
        },
        //series background 설정
        setBgColor: function (colorArr, fromArr, toArr) {
            var optionArr = new Array();
            if ((colorArr.length != fromArr.length) || (fromArr.length != toArr.length)) {
                throw "배열의 수가 일치 하지 않습니다.";
            }
            for (i = 0; i < colorArr.length; i++) {
                optionArr.push({ color: colorArr[i], from: fromArr[i], to: toArr[i] });
            }
            options = {
                xAxis: {
                    plotBands: optionArr,
                }
            }

            return options;
        },
        //color 포인트 제거
        setColorPoint: function () {
            options = {
                plotOptions: {
                    series: {
                        colorByPoint: false,
                    }
                }
            };
            return options;
        }
    }
}(window, document));

$(function () {
    $(".cht-opt-btn").on("click", function () {
        var chartType = $(this).data("chart-type");
        var chartId = $(this).parents(".dashboard-modal-box").data("chart")
        var chartObject = chartObj.event.findChart(chartId);
        chartObj.event.changeType(chartObject, chartType);
    });
});


$(function () {
    $(".button-modal").on("click", function (e) {
        dashboardModal(e);
        console.log(e);
    });
    $(".dashboard-modal-btn button").on("click", function (e) {
        dashboardModal();
    });
});




function chartContent(e) {
    var chartName = $(e.currentTarget).parents(".card-box").data("chart"),
        chartSelect = document.querySelector("#" + chartName),
        chartNumber = chartSelect.getAttribute('data-highcharts-chart'),
        chartObject = Highcharts.charts[chartNumber];
    var optionsss = chartObject.userOptions;
    optionsss.chart.renderTo = 'modal-chart';
    var modalChart = new Highcharts.Chart(optionsss);
}

// modal function
function dashboardModal(e) {
    const modal = $(".dashboard-modal");
    if (modal.css("display") == "none") {
        chartContent(e);
        modal.fadeIn(100);
        modal.children().slideDown(500);
    } else {
        modal.children().slideUp(100);
        modal.fadeOut(500);
    }
}



$(function () {
    $(".shot").on("click", function () {
        var screenDom = $(this).parents(".card-box")[0];
        // 캡쳐 라이브러리를 통해서 canvas 오브젝트를 받고 이미지 파일로 리턴한다.
        html2canvas(screenDom).then(canvas => {
            saveAs(canvas.toDataURL('image/png'), "capture-test.png");
        });
    });
    function saveAs(uri, filename) {
        // 캡쳐된 파일을 이미지 파일로 내보낸다.
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    }
});


// 사용 가능한 것들

// setCategories = 축에 대한 새 범주를 설정합니다.
// var extremes = chart.yAxis[0].getExtremes(); = 축에 min 값과 max값을 가져옵니다.



/*
    todo
    1. 서버단에서 가져올 데이터 결정
    2. 프론트단에서 차트 모형 구현
        - 차트모형
        - 차트에 따른 axix
        - 이름 구현

    차트내 다운로드 기능 구현

*/