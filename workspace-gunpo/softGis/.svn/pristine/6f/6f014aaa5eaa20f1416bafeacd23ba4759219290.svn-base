import Highchart from '../modules/adminHighcharts';
import { Map, MapDataVisualizer } from '../modules/map';
import Loading from '../modules/loading';

function CmmntyStatisticsRoute() {
	const $area = $(".area");
	const $date = $(".date");
	
	$(".button-wrap button").on("click", (e) =>{
		$(e.currentTarget).addClass("active");
		$(e.currentTarget).siblings("button").removeClass("active");
		$(e.currentTarget).siblings("button").find("img").attr("src", Constant.CONTEXT_PATH + "/assets/images/common/icon-check-on-grey.png");
		$(e.currentTarget).find("img").attr("src", Constant.CONTEXT_PATH + "/assets/images/common/icon-check-on-white.png");
		
		if($(e.currentTarget).attr("class").indexOf("areaStats") > -1 ){
			$area.addClass("active");
			$date.removeClass("active");
		}else{
			$date.addClass("active");
			$area.removeClass("active");
		};
	});
	
	$(".excelDownCat").on("click", excelDownCat);
	$(".excelDownGeom").on("click", excelDownGeom);
	
	//날짜별 검색조건 변경시
	$('#yyyy').on('change', () => {
		getStats();
	});
	
	getStats();
	function getStats(){
		$.ajax({
			type: "GET",
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyStatisticsData.do',
			async: false,
			data : {yyyy: $("#yyyy").val(), nmSgg: $("#nmSgg").val()},
			success: function(data){
				
				
				//카테고리별 응답자 수 통계
				const head = data.dataCateCodeList;
				const answerCatStats = data.answerCatStatistics;
				const $statsTitle1 = $(".stats1 .title-wrap");
				const $statsData1 = $(".stats1 .data-wrap");
				$statsTitle1.html("<div>카테고리/날짜</div>");
				$statsTitle1.append("<div>전체</div>");
				for(let i=0; i<head.length; i++){
					$statsTitle1.append("<div>"+head[i].cd_nm+"</div>");
				}

				$statsData1.html("");
				for(let i=0; i<answerCatStats.length; i++){
					$statsData1.append("<div class='line"+i+"'></div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].yyyymm+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].tot+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm01+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm02+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm03+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm04+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm05+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm06+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm07+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm08+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm09+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm10+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm11+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm12+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm13+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm14+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm15+"</div>");
					$statsData1.find(".line"+i).append("<div>"+answerCatStats[i].brm16+"</div>");
				}
				
				
				//지역별 응답자 수 통계
				const geomStats = data.cmmntyAnswerGeomStatistics;
				const $statsTitle4 = $(".stats4 .title-wrap");
				const $statsData4 = $(".stats4 .data-wrap");
				$statsTitle4.html("<div>카테고리/지역</div>");
				$statsTitle4.append("<div>전체</div>");
				for(let i=0; i<head.length; i++){
					$statsTitle4.append("<div>"+head[i].cd_nm+"</div>");
				}
				$statsTitle4.find("div").eq(0).css("width", "170px");
				$statsTitle4.find("div").eq(1).css("width", "90px");

				$statsData4.html("");
				for(let i=0; i<geomStats.length; i++){
					$statsData4.append("<div class='line"+i+"'></div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].name+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].tot+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm04+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm02+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm03+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm04+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm05+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm06+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm07+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm08+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm09+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm10+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm14+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm12+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm13+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm14+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm15+"</div>");
					$statsData4.find(".line"+i).append("<div>"+geomStats[i].brm16+"</div>");
				}

			}, error : function(error){
				console.log(error);
				alert("에러");
			}
		});// ajax end
	}
	

	function excelDownCat(){
		let columns = new Array();
		$(".stats1 .title-wrap div").each(function(){
			columns.push($(this).text());
		});
		$("#columns").val(columns);
		$("form[name=excelForm]").attr("action","/cmmntyMap/getAnswerCatStatsExcelDownload.do").submit();
	}
	
	function excelDownGeom(){
		let columns = new Array();
		$(".stats4 .title-wrap div").each(function(){
			columns.push($(this).text());
		});
		$("#columns").val(columns);
		$("form[name=excelForm]").attr("action","/cmmntyMap/getAnswerGeomStatsExcelDownload.do").submit();
	}
}

export default CmmntyStatisticsRoute;