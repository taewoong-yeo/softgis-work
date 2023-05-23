import Highchart from '../modules/adminHighcharts';
import { Map, MapDataVisualizer } from '../modules/map';
import Loading from '../modules/loading';

function CmmntyDashboardRoute() {	
	var prevPid = 9999;
	var prevColor = "";
		
	//구별 검색조건 변경시
	$('#cat_cd').on('change', () => {
		getChart();
	});
	
	//날짜별 검색조건 변경시
	$('#eDate').on('change', () => {
		getChart();
	});
	
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
	
	getChart();
	function getChart(){
		$.ajax({
			type: "GET",
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyDashboardData.do',
			async: false,
			data : {eDate: $("#eDate").val(), cat_cd: $("#cat_cd").val()},
			success: function(data){
				let vis = new Object();
				vis.vis_nm = "카테고리별 매핑 등록 건수";
				let resultData1 = dataTrans(data.cmmntyCatCount, 'default');
				setString(data.cmmntyCatCount, vis, "cmmntyCatCount");
				lineColumChart('cmmntyCatCount', '건수', resultData1);
				
				vis.vis_type = "LINE";
				vis.vis_nm = "기간별 매핑 등록 건수";
				vis.trgt_div = "cmmntyMonthCount";
				vis.vis_series = "Y";
				let resultData2 = dataTransSeries(data.cmmntyMonthCount,'series');
				setString(data.cmmntyMonthCount, vis, "cmmntyMonthCount");
				createChart(vis, resultData2);
				
				vis.vis_nm = "카테고리별 응답자수";
				let resultData3 = dataTrans(data.cmmntyAnswerCatCount, 'default');
				setString(data.cmmntyAnswerCatCount, vis, "cmmntyAnswerCatCount");
				lineColumChart('cmmntyAnswerCatCount', '건수', resultData3);
				
				vis.vis_type = "LINE";
				vis.vis_nm = "기간별 응답자수";
				vis.trgt_div = "cmmntyAnswerMonthCount";
				vis.vis_series = "Y";
				let resultData4 = dataTransSeries(data.cmmntyAnswerMonthCount, 'series');
				setString(data.cmmntyAnswerMonthCount, vis, "cmmntyAnswerMonthCount");
				createChart(vis, resultData4);
				
				vis.vis_nm = "응답 word cloud";
				setString(data.cmmntyAnswerWordCloud, vis, "cmmntyAnswerWordCloud");
				wordCloud(data.cmmntyAnswerWordCloud, 'cmmntyAnswerWordCloud');
				
				var resultData5 = dataTrans(data.cmmntyGeomTotAnswerCount);
				vis.vis_nm = "시도별 응답자";
				setString(data.cmmntyGeomTotAnswerCount, vis, "cmmntyGeomTotAnswerCount");
				resultData5.sort(function(a, b){
					return a.value - b.value;
				})
				resultData5.forEach(function(v, i){
					v.colorValue = i+1;
				})
				treeMap('cmmntyGeomTotAnswerCount', {data : resultData5});
				
				var pId;
				//트리맵 선택 이벤트
				selectData('cmmntyGeomTotAnswerCount', function(event) {
					//treemap data color change
					var pId = this.series.data.indexOf(this); //click data index
					var chart = this;
					console.log(prevPid);
					if(prevPid != 9999){
						chart.series.data[prevPid].update({
							color: prevColor
						});
					}
					prevColor = chart.color;
					chart.series.data[pId].update({
						color: "#E0167B" //click color
					});
					prevPid = pId;
					getGeomSgg(event.point.options.hiddenValue);
					
				});

				if(resultData5.length > 0){
					var treeChart = Highcharts.charts[document.querySelector("#cmmntyGeomTotAnswerCount").getAttribute('data-highcharts-chart')];
					if(pId == undefined){
						treeChart.series[0].data[treeChart.series[0].data.length-1].update({
							color: "#E0167B" //click color
						});
						prevPid = treeChart.series[0].data.length-1;
					}
					
					getGeomSgg(treeChart.series[0].data[treeChart.series[0].data.length-1].hiddenValue);
				}else {
					getGeomSgg();
				}
				
				//응답자수 상위 매핑 20건
				const $statsData2 = $(".stats2 .data-wrap");
				$statsData2.html("");
				for(let i=0; i<data.cmmntyMostAnswerRank.length; i++){
					$statsData2.append("<div class='line"+i+"'></div>");
					$statsData2.find(".line"+i).append("<div>"+eval(i+1)+"</div>");
					$statsData2.find(".line"+i).append("<div>"+data.cmmntyMostAnswerRank[i].cat_nm+"</div>");
					$statsData2.find(".line"+i).append("<div style='width:250px; max-width:250px;'>"+data.cmmntyMostAnswerRank[i].mapng_title+"</div>");
					$statsData2.find(".line"+i).append("<div>"+data.cmmntyMostAnswerRank[i].answer_cnt+"</div>");
				}
				//응답자수 상위 매핑 20건
				const $statsData3 = $(".stats3 .data-wrap");
				$statsData3.html("");
				for(let i=0; i<data.cmmntyMostViewRank.length; i++){
					$statsData3.append("<div class='line"+i+"'></div>");
					$statsData3.find(".line"+i).append("<div>"+eval(i+1)+"</div>");
					$statsData3.find(".line"+i).append("<div>"+data.cmmntyMostViewRank[i].cat_nm+"</div>");
					$statsData3.find(".line"+i).append("<div style='width:250px; max-width:250px;'>"+data.cmmntyMostViewRank[i].mapng_title+"</div>");
					$statsData3.find(".line"+i).append("<div>"+data.cmmntyMostViewRank[i].view_cnt+"</div>");
				}
								
			}, error : function(error){
				console.log(error);
				alert("에러");
			}
		});// ajax end
	}//getChart end
	
	$(".data-wrap div").on("click", onStats);

	//매핑 제목 선택
	function onStats(e) {
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyStats.do'
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


					let str = "";
					str += "<li class='answerGraph'>";
					str += "<h2></h2>";
					str += '<div class="card-content">';
					str += '<div id="" style="height:100%;"></div>';
					str += '</div></li>';
					$(".answerGraph").remove();
					if(d.cmmntyQuesStats1.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 1 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats1");
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats1, 'default');
						lineColumChart('cmmntyQuesStats1', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats2.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 2 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats2");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats2, 'default');
						lineColumChart('cmmntyQuesStats2', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats3.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 3 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats3");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats3, 'default');
						lineColumChart('cmmntyQuesStats3', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats4.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 4 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats4");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats4, 'default');
						lineColumChart('cmmntyQuesStats4', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats5.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 5 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats5");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats5, 'default');
						lineColumChart('cmmntyQuesStats5', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats6.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 6 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats6");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats6, 'default');
						lineColumChart('cmmntyQuesStats6', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats7.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 7 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats7");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats7, 'default');
						lineColumChart('cmmntyQuesStats7', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats8.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 8 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats8");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats8, 'default');
						lineColumChart('cmmntyQuesStats8', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats9.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 9 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats9");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats9, 'default');
						lineColumChart('cmmntyQuesStats9', "질문별 통계", cmmntyQuesStats);
					}
					if(d.cmmntyQuesStats10.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 10 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats10");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats10, 'default');
						lineColumChart('cmmntyQuesStats10', "질문별 통계", cmmntyQuesStats);
					}
					wordCloud(d.cmmntyAnswerWordCloud, 'cmmntyAnswerWordCloud');
				}
		});
	}
	
	function setString(data, v, id){
		var d = data[0];
		$("[data-chart='"+id+"']").find(".cht-title").text(v.vis_nm);
	}
	
	//지역 선택시 상세 시군구 차트 표출
	function getGeomSgg(cd){
		$.ajax({
			type: "GET",
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyGeomSggAnswerCount.do',
			async: true,
			data : {eDate: $("#eDate").val(), cat_cd: $("#cat_cd").val(), sd_cd: cd},
			success: function(data){
				let vis = new Object();
				
				var resultData = dataTrans(data.cmmntyGeomSggAnswerCount);
				vis.vis_nm = "시군구별 응답자";
				setString(resultData, vis, "cmmntyGeomSggAnswerCount");
				resultData.sort(function(a, b){
					return a.value - b.value;
				})
				resultData.forEach(function(v, i){
					v.colorValue = i+1;
				})
				treeMap('cmmntyGeomSggAnswerCount', {data : resultData});
								
			}, error : function(error){
				console.log(error);
				alert("에러");
			}
		});// ajax end
	}
}

export default CmmntyDashboardRoute;