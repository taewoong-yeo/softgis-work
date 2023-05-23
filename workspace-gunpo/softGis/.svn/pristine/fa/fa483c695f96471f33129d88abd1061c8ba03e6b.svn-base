import Chart from './chart-common.js';



function ChartTest(){
	//옵션설정
	Highcharts.setOptions({
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
			},
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
    let chartId = ["totalChart", "itemChart", "ratioChart", "ratioChart2", "disChart", "residenceChart", "allCheckChart"];
    let chartType = ["treemap", "item", "pie", "pie", "column", "bar", "column"];
	let data = [
		[{
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
        }],
		[{
            name: 'Male',
            y: 20,
            marker: {
                symbol: 'url(data:image/svg+xml;base64,PHN2ZyBpZD0ibWFsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTkyIDUxMiI+PHBhdGggZD0iTTk2IDBjMzUuMzQ2IDAgNjQgMjguNjU0IDY0IDY0cy0yOC42NTQgNjQtNjQgNjQtNjQtMjguNjU0LTY0LTY0UzYwLjY1NCAwIDk2IDBtNDggMTQ0aC0xMS4zNmMtMjIuNzExIDEwLjQ0My00OS41OSAxMC44OTQtNzMuMjggMEg0OGMtMjYuNTEgMC00OCAyMS40OS00OCA0OHYxMzZjMCAxMy4yNTUgMTAuNzQ1IDI0IDI0IDI0aDE2djEzNmMwIDEzLjI1NSAxMC43NDUgMjQgMjQgMjRoNjRjMTMuMjU1IDAgMjQtMTAuNzQ1IDI0LTI0VjM1MmgxNmMxMy4yNTUgMCAyNC0xMC43NDUgMjQtMjRWMTkyYzAtMjYuNTEtMjEuNDktNDgtNDgtNDh6IiBmaWxsPSIjMkQ1RkYzIi8+PC9zdmc+)'
            },
            color: '#2D5FF3'
        }, {
            name: 'Female',
            y: 11,
            marker: {
                symbol: 'url(data:image/svg+xml;base64,PHN2ZyBpZD0iZmVtYWxlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgNTEyIj48cGF0aCBkPSJNMTI4IDBjMzUuMzQ2IDAgNjQgMjguNjU0IDY0IDY0cy0yOC42NTQgNjQtNjQgNjRjLTM1LjM0NiAwLTY0LTI4LjY1NC02NC02NFM5Mi42NTQgMCAxMjggMG0xMTkuMjgzIDM1NC4xNzlsLTQ4LTE5MkEyNCAyNCAwIDAgMCAxNzYgMTQ0aC0xMS4zNmMtMjIuNzExIDEwLjQ0My00OS41OSAxMC44OTQtNzMuMjggMEg4MGEyNCAyNCAwIDAgMC0yMy4yODMgMTguMTc5bC00OCAxOTJDNC45MzUgMzY5LjMwNSAxNi4zODMgMzg0IDMyIDM4NGg1NnYxMDRjMCAxMy4yNTUgMTAuNzQ1IDI0IDI0IDI0aDMyYzEzLjI1NSAwIDI0LTEwLjc0NSAyNC0yNFYzODRoNTZjMTUuNTkxIDAgMjcuMDcxLTE0LjY3MSAyMy4yODMtMjkuODIxeiIgZmlsbD0iI0YyM0EyRiIvPjwvc3ZnPg==)'
            },
            color: '#F23A2F'
        }],
        [25065623, 24934662],
        [50.13, 49.87],
        [
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
        [
            { y: 24.2 },
            { y: 20.8 },
            { y: 14.9 },
            { y: 13.7 },
            { y: 13.1 },
            { y: 12.7 },
            { y: 12.4 },
            { y: 12.2 },
        ],
        [
            { name: 'Shanghai', y: 24.2 },
            { name: 'Beijing,', y: 20.8 },
            { name: 'Karachi', y: 14.9 },
            { name: 'Shenzhen', y: 13.7 },
            { name: 'Guangzhou', y: 13.1 },
            { name: 'Istanbul', y: 12.7 },
            { name: 'Mumbai', y: 12.4 },
            { name: 'moscow', y: 12.2 },

        ]
	]
    // 차트 객체 생성
	const chart = new Chart({
		renderTo : chartId,
		type: chartType,
		data: data
	});
    // 차트 생성
    chart.init();


	let height = ["300px", "140px", "120px", "120px", "160px", "160px", "200px"];
	for(let i =0; i<chartId.length; i++){
		let height_option = {
			chart :{
				height : height[i]
			}
		}
		chart.addOption(chartId[i], height_option);
	}

	chart.seriesClick('totalChart', function(e){
		let p = e.point
//		console.log(p);
		console.log(e);
		console.log(p.options.value);
		console.log(p.hiddenValue);
		console.log(this);
	});



    // 제이쿼리 실행 이벤트

    // 차트 타입 변경
    $(".cht-opt-btn").on("click", function () {
        var chartType = $(this).data("chart-type");
        var chartId = $(this).parents(".dashboard-modal-box").data("chart")
        chart.changeType(chartId, chartType);
    });

    // 차트 데이터 변경
    $(".setData").on("click", function(){
        var chartId = "allCheckChart";
        data = [
            { name: '1', y: 15.2 },
            { name: '2,', y: 10.8 },
            { name: '3', y: 5.9 },
            { name: '4', y: 13.7 },
            { name: '5', y: 17.1 },
            { name: '6', y: 20.7 },
            { name: '7', y: 25.4 },
            { name: '8', y: 30.2 },
        ]
        chart.setSeriesData(chartId, data);

    });

}

// 차트 실행
ChartTest();



export default ChartTest;