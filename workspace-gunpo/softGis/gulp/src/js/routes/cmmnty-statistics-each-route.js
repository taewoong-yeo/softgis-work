import Highchart from '../modules/adminHighcharts';
import { Map, MapDataVisualizer } from '../modules/map';
import Loading from '../modules/loading';

function CmmntyStatisticsRoute() {
	
	$(".data-wrap div").on("click", onStats);

	//매핑 제목 선택
	function onStats(e) {
		$.post({
			url: '/cmmntyMap/getCmmntyStats.do'
				, data: { mapng_id: e.target.dataset.id }
				, dataType: 'json'
				, async: true
				, success: function(d) {  
					let pointStats = d.pointStats; 
					
					let resultData1 = dataTrans(pointStats, 'default');
					lineColumChart('pointStats', '마커별 통계', resultData1);
					
					let geomStats = d.geomStats;
					let resultData2 = dataTrans(geomStats, 'default');
					lineColumChart('geomStats', '지역별 통계', resultData2);
					
					wordCloud(d.cmmntyAnswerWordCloud, 'cmmntyAnswerWordCloud');
				}
		});
	}
	
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
		colors: ['#dd9595', '#4dc783', '#b495dd', '#f4bc44', '#92c7ef'],
		xAxis: {
			labels: {
				//autoRotation: undefined, //글자 겹칠시 회전 설정
			},
			tickWidth: 0 //수치범위표시 연결 선굵기
		},
		yAxis: {
			title: { enabled: false },
			gridLineWidth: 0,
			tickAmount: 5, // 그리드 눈금자 수
		},
		plotOptions: {
			series: {
				colorByPoint: true,
				layoutAlgorithm: 'squarified',
				states: {
					inactive: {
						opacity: 1 //차트 마우스오버시 배경 불투명도 정도
					},
					hover: {
						halo: false, //pie chart mouseover effect
					}
				},
				stickyTracking: false, //배경 마우스오버시 포인터 활성화 여부
				stacking: undefined, //series 겹침 여부
			},
			pie: {
				dataLabels:{
					enabled: true,
					style:{ // 데이터 수치 표시 스타일
						color : "#ffffff", //텍스트 컬러
						textOutline : "none", // 데이터 수치표시 테두리
					}
				},
				borderWidth: 0, //데투리
				borderColor: "", //테두리 색상
				innerSize: '45%', //도넛모양 원안에 원사이즈
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
		// navigation: {
		// 	buttonOptions: {
		// 		align: 'right',
		// 		y: -20
		// 	}
		// },
		exporting: {
			enabled: true, //햄버거 버튼 여부
			filename: '차트',
			buttons: {
				contextButton: {
				  menuItems: ['downloadPNG', 'downloadJPEG']
				}
			  }
		}
	});
}

export default CmmntyStatisticsRoute;